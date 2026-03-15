import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sql } from "../db/index.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const accessCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 15 * 60 * 60 * 1000 // 15 hours
};

const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const generateAccessToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
    );
};

const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
    );
};

const generateAndSaveTokens = async (userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    await sql`UPDATE users SET refresh_token = ${refreshToken} WHERE id = ${userId}`;

    return { accessToken, refreshToken };
};


// ============================================
// AUTH CONTROLLERS
// ============================================

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body || {};

    if ([username, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUsers = await sql`
        SELECT id FROM users 
        WHERE LOWER(username) = ${username.toLowerCase()} 
        OR email = ${email}
    `;

    if (existingUsers.length > 0) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    let avatarUrl = null;
    let avatarPublicId = null;

    if (avatarLocalPath) {
        const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath);
        avatarUrl = uploadedAvatar?.secure_url || null;
        avatarPublicId = uploadedAvatar?.public_id || null;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await sql`
        INSERT INTO users (username, email, password, avatar, avatar_public_id)
        VALUES (${username.toLowerCase()}, ${email}, ${passwordHash}, ${avatarUrl}, ${avatarPublicId})
        RETURNING id, username, email, avatar, created_at
    `;

    if (!newUser || newUser.length === 0) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    const { accessToken, refreshToken } = await generateAndSaveTokens(newUser[0].id);

    return res
        .status(201)
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", refreshToken, refreshCookieOptions)
        .json(new ApiResponse(201, { user: newUser[0], accessToken }, "User registered successfully"));
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
        throw new ApiError(400, "Email and password are required");
    }

    const users = await sql`
        SELECT id, username, email, password, avatar, role, created_at
        FROM users WHERE email = ${email}
    `;

    if (users.length === 0) {
        throw new ApiError(401, "Invalid email or password");
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAndSaveTokens(user.id);
    const { password_hash, ...userWithoutPassword } = user;

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", refreshToken, refreshCookieOptions)
        .json(new ApiResponse(200, { user: userWithoutPassword, accessToken }, "Login successful"));
});

const logoutUser = asyncHandler(async (req, res) => {
    await sql`UPDATE users SET refresh_token = NULL WHERE id = ${req.user.id}`;

    return res
        .status(200)
        .clearCookie("accessToken", accessCookieOptions)
        .clearCookie("refreshToken", refreshCookieOptions)
        .json(new ApiResponse(200, {}, "Logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    let decoded;
    try {
        decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const users = await sql`
        SELECT id, refresh_token FROM users WHERE id = ${decoded.id}
    `;

    if (users.length === 0 || users[0].refresh_token !== incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAndSaveTokens(users[0].id);

    return res
        .status(200)
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", refreshToken, refreshCookieOptions)
        .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
});

// ============================================
// PROFILE CONTROLLERS
// ============================================

const getCurrentUser = asyncHandler(async (req, res) => {
    const users = await sql`
        SELECT id, username, email, avatar, role, created_at, updated_at
        FROM users WHERE id = ${req.user.id}
    `;

    if (users.length === 0) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, users[0], "User fetched successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
    const { username, email } = req.body || {};
    const userId = req.user.id;

    if (!username?.trim() && !email?.trim()) {
        throw new ApiError(400, "At least one field (username or email) is required to update");
    }
    const updatedInfo = {};
    if (username?.trim()) {
        updatedInfo.username = username.toLowerCase();
    }
    if (email?.trim()) {
        updatedInfo.email = email;
    }

    await sql`
        UPDATE users SET ${sql(updatedInfo)}, updated_at = NOW() WHERE id = ${userId}
    `;

    return res.status(200).json(new ApiResponse(200, updatedInfo, "Profile updated successfully"));

});

const changeAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Get current avatar public_id for deletion
    const currentUser = await sql`
        SELECT avatar_public_id FROM users WHERE id = ${req.user.id}
    `;

    // Upload new avatar
    const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath);

    if (!uploadedAvatar?.secure_url) {
        throw new ApiError(500, "Error uploading avatar");
    }

    // Delete old avatar from cloudinary
    if (currentUser[0]?.avatar_public_id) {
        await deleteFromCloudinary(currentUser[0].avatar_public_id);
    }

    const updated = await sql`
        UPDATE users SET avatar = ${uploadedAvatar.secure_url}, avatar_public_id = ${uploadedAvatar.public_id}
        WHERE id = ${req.user.id}
        RETURNING id, username, email, avatar, created_at, updated_at
    `;

    return res.status(200).json(new ApiResponse(200, updated[0], "Avatar updated successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body || {};

    if (!currentPassword?.trim() || !newPassword?.trim()) {
        throw new ApiError(400, "Current password and new password are required");
    }

    if (newPassword.length < 6) {
        throw new ApiError(400, "New password must be at least 6 characters");
    }

    const users = await sql`
        SELECT id, password FROM users WHERE id = ${req.user.id}
    `;

    const isValid = await bcrypt.compare(currentPassword, users[0].password);

    if (!isValid) {
        throw new ApiError(401, "Current password is incorrect");
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await sql`UPDATE users SET password = ${newHash} WHERE id = ${req.user.id}`;

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

const deleteAccount = asyncHandler(async (req, res) => {

    const userId = req.user.id;

    const users = await sql`
        SELECT id, avatar_public_id FROM users WHERE id = ${userId}
    `;

    // Delete avatar from cloudinary if it exists
    if (users[0]?.avatar_public_id) {
        await deleteFromCloudinary(users[0].avatar_public_id);

    }
    // get all product public_ids of the user to delete from cloudinary
    const products = await sql`
        SELECT id, image_public_id FROM products WHERE seller_id = ${userId}
    `;
    for (const product of products) {
        if (product.image_public_id) {
            await deleteFromCloudinary(product.image_public_id);
        }
    }
    // Delete all favorites of the user   
    await sql`
        DELETE FROM favorites WHERE user_id = ${userId}
    `;

    // delate all products of the user
    await sql`DELETE FROM products WHERE seller_id = ${userId}`;

    // Delete user from database
    await sql`DELETE FROM users WHERE id = ${userId}`;


    return res.status(200).json(new ApiResponse(200, {}, "Account deleted successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    deleteAccount,
    refreshAccessToken,
    getCurrentUser,
    updateProfile,
    changeAvatar,
    changePassword
};