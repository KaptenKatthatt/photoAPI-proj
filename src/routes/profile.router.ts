import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { updateUserRules } from "../rules/user.rules.ts";
import { verifyAccessToken } from "../middlewares/auth/jwt.ts";
import { checkIfUserIsAuthenticated } from "../middlewares/auth/checkIfUserIsAuthenticated.ts";
import { checkIfUserExists } from "../middlewares/auth/checkIfUserExists.ts";

// Create a Profile router
export const profileRouter = express.Router();

// Apply authentication middleware for the remaining profile routes
profileRouter.use(verifyAccessToken);
profileRouter.use(checkIfUserIsAuthenticated);
profileRouter.use(checkIfUserExists);

/**
 * GET /profile
 *
 * Get the logged in user's profile
 */
profileRouter.get("/", getProfile);

/**
 * PATCH /profile
 *
 * Update the authenticated user's profile
 */
profileRouter.patch("/", updateUserRules, validateRequest, updateProfile);
