import express from "express";
import { index, show, store } from "../controllers/profile.controller.ts";
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
 * Get a single user by ID
 */
profileRouter.get("/:userId", show);

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
 * GET /profile/books
 *
 * Get the authenticated user's books
 */
// profileRouter.get("/books", getBooks);

/**
 * POST /profile/books
 *
 * Add books to the authenticated user
 */
// profileRouter.post("/books", addBooks);

/**
 * DELETE /profile/books/:bookId
 *
 * Remove book from the authenticated user
 */
// profileRouter.delete("/books/:bookId", removeBook);
