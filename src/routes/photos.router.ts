import express from "express";
import { destroy, index, show, store, update } from "../controllers/photos.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { createPhotoRules, updatePhotoRules } from "../rules/photo.rules.ts";
import { verifyAccessToken } from "../middlewares/auth/jwt.ts";
import { checkIfUserIsAuthenticated } from "../middlewares/auth/checkIfUserIsAuthenticated.ts";

// Create Photos router
export const photosRouter = express.Router();
photosRouter.use(verifyAccessToken);
photosRouter.use(checkIfUserIsAuthenticated);

/**
 * GET /photos
 *
 * Get all photos of logged in user
 */
photosRouter.get("/", index);
/**
 * GET /photos/:photoId
 *
 * Get a single photo by ID
 */
photosRouter.get("/:photoId", show);

/**
 * POST /photos
 *
 * Add one photo to the user profile
 */
photosRouter.post("/", createPhotoRules, validateRequest, store);

/**
 * PATCH /photos/:photoId
 *
 * Update a photo
 */
photosRouter.patch("/:photoId", updatePhotoRules, validateRequest, update);

/**
 * DELETE /photos/:photoId
 *
 * Delete a single photo
 */
photosRouter.delete("/:photoId", validateRequest, destroy);
