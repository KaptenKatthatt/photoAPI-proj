import express from "express";
import { destroy, index, show, store } from "../controllers/profile.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { createUserRules } from "../rules/user.rules.ts";

// Create a Profile router
export const profileRouter = express.Router();

/**
 * GET /profile
 *
 * Get all profiles
 */

profileRouter.get("/", index);

/**
 * GET /profile
 *
 * Get the logged in user's profile
 */
profileRouter.get("/", show);

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
// profileRouter.patch("/", updateUserRules, validateRequest, updateProfile);

/**
 * DELETE /profile/:userId
 *
 * Remove user
 */
profileRouter.delete("/:userId", destroy);
