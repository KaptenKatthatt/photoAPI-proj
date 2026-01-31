import express from "express";
import {
	destroy,
	getProfile,
	index,
	store,
	updateProfile,
} from "../controllers/profile.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { createUserRules, updateUserRules } from "../rules/user.rules.ts";
import { verifyAccessToken } from "../middlewares/auth/jwt.ts";

// Create a Profile router
export const profileRouter = express.Router();

/**
 * GET /profile
 *
 * Get all profiles (remove this route later)
 */

profileRouter.get("/getAll", index);

// Apply authentication middleware for the remaining profile routes
profileRouter.use(verifyAccessToken);

/**
 * GET /profile
 *
 * Get the logged in user's profile
 */
// profileRouter.get("/", show);
profileRouter.get("/", getProfile);

/**
 * POST /profile
 *
 * Create a user
 */

profileRouter.post("/", createUserRules, validateRequest, store);

/**
 * PATCH /profile
 *
 * Update the authenticated user's profile
 */
profileRouter.patch("/", updateUserRules, validateRequest, updateProfile);

/**
 * DELETE /profile/:userId
 *
 * Remove user
 */
profileRouter.delete("/:userId", destroy);
