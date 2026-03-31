import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sql } from "../db/index.js";

/**
 * @desc    Submit user feedback
 * @route   POST /api/feedback
 * @access  Public
 */
const submitFeedback = asyncHandler(async (req, res) => {
    const { fullName, email, rating, message } = req.body;

    // Validation: All fields required
    if (!fullName?.trim() || !email?.trim() || !rating || !message?.trim()) {
        throw new ApiError(400, "All fields are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ApiError(400, "Invalid email format");
    }

    // Validate rating (must be integer between 1 and 5)
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        throw new ApiError(400, "Rating must be a number between 1 and 5");
    }

    // Sanitize inputs (trim whitespace)
    const sanitizedFullName = fullName.trim();
    const sanitizedEmail = email.trim();
    const sanitizedMessage = message.trim();

    // Optional: Limit message length (prevent extremely long submissions)
    if (sanitizedMessage.length > 2000) {
        throw new ApiError(400, "Message is too long (max 2000 characters)");
    }

    // Sanitize full name length
    if (sanitizedFullName.length > 255) {
        throw new ApiError(400, "Full name is too long (max 255 characters)");
    }

    // Sanitize email length
    if (sanitizedEmail.length > 255) {
        throw new ApiError(400, "Email is too long (max 255 characters)");
    }

    try {
        // Insert feedback into database
        const result = await sql`
            INSERT INTO feedback (full_name, email, rating, message)
            VALUES (${sanitizedFullName}, ${sanitizedEmail}, ${rating}, ${sanitizedMessage})
            RETURNING id, full_name, email, rating, message, created_at
        `;

        const feedback = result[0];

        // Return success response
        return res.status(201).json(
            new ApiResponse(201, feedback, "Feedback submitted successfully")
        );
    } catch (error) {
        // Handle database errors
        console.error("Error submitting feedback:", error);

        // Check for specific database errors
        if (error.code === '23505') { // Unique constraint violation (if we add constraints later)
            throw new ApiError(409, "Feedback already exists");
        }

        throw new ApiError(500, "Failed to submit feedback");
    }
});

/**
 * @desc    Get all feedback (admin use case - can be extended later)
 * @route   GET /api/feedback
 * @access  Public (for now, can be restricted to admin later)
 */
const getAllFeedback = asyncHandler(async (req, res) => {
    try {
        const { status, sortBy = 'newest', search = '' } = req.query;

        // Build query with filters
        let query = sql`
            SELECT id, full_name, email, rating, message, status, created_at, updated_at
            FROM feedback
            WHERE 1=1
        `;

        // Filter by status if provided
        if (status && ['new', 'reviewed'].includes(status)) {
            query = sql`${query} AND status = ${status}`;
        }

        // Search by name or email if provided
        if (search && search.trim()) {
            const searchPattern = `%${search}%`;
            query = sql`${query} AND (LOWER(full_name) LIKE LOWER(${searchPattern}) OR LOWER(email) LIKE LOWER(${searchPattern}))`;
        }

        // Sorting
        if (sortBy === 'newest') {
            query = sql`${query} ORDER BY created_at DESC`;
        } else if (sortBy === 'oldest') {
            query = sql`${query} ORDER BY created_at ASC`;
        }

        const result = await query;

        return res.status(200).json(
            new ApiResponse(200, result, "Feedback fetched successfully")
        );
    } catch (error) {
        console.error("Error fetching feedback:", error);
        throw new ApiError(500, "Failed to fetch feedback");
    }
});

/**
 * @desc    Update feedback status (mark as reviewed)
 * @route   PATCH /api/feedback/:id
 * @access  Public (for now, can be restricted to admin later)
 */
const updateFeedbackStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status || !['new', 'reviewed'].includes(status)) {
        throw new ApiError(400, "Invalid status. Must be 'new' or 'reviewed'");
    }

    try {
        const result = await sql`
            UPDATE feedback
            SET status = ${status}, updated_at = NOW()
            WHERE id = ${id}
            RETURNING id, full_name, email, rating, message, status, created_at, updated_at
        `;

        if (result.length === 0) {
            throw new ApiError(404, "Feedback not found");
        }

        return res.status(200).json(
            new ApiResponse(200, result[0], "Feedback status updated successfully")
        );
    } catch (error) {
        console.error("Error updating feedback status:", error);
        throw new ApiError(500, "Failed to update feedback status");
    }
});

/**
 * @desc    Delete feedback
 * @route   DELETE /api/feedback/:id
 * @access  Public (for now, can be restricted to admin later)
 */
const deleteFeedback = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const result = await sql`
            DELETE FROM feedback
            WHERE id = ${id}
            RETURNING id
        `;

        if (result.length === 0) {
            throw new ApiError(404, "Feedback not found");
        }

        return res.status(200).json(
            new ApiResponse(200, { id }, "Feedback deleted successfully")
        );
    } catch (error) {
        console.error("Error deleting feedback:", error);
        throw new ApiError(500, "Failed to delete feedback");
    }
});

export {
    submitFeedback,
    getAllFeedback,
    updateFeedbackStatus,
    deleteFeedback
};
