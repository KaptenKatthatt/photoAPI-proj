import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { getProfile } from "../controllers/profile.controller.ts";
import { updateUserRules } from "../rules/user.rules.ts";

// Create a Profile router
export const profileRouter = express.Router();

/**
 * GET /profile
 *
 * Get the authenticated user's profile
 */
profileRouter.get("/", getProfile);

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
