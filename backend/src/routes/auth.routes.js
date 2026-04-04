import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    verifyEmail,
    resendVerification
} from "../controllers/auth.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router();

// Public routes

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/logout").post(verifyJwt, logoutUser);

// Email verification routes
router.route("/verify-email/:token").get(verifyEmail);
router.route("/resend-verification").post(resendVerification);

export default router;