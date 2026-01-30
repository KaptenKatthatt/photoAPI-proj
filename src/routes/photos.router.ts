import express from "express";
import {
	destroy,
	getAllPhotosOfUser,
	// index,
	show,
	store,
	update,
} from "../controllers/photos.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { createPhotoRules, updatePhotoRules } from "../rules/photo.rules.ts";
import { verifyAccessToken } from "../middlewares/auth/jwt.ts";

// Create Photos router
export const photosRouter = express.Router();
photosRouter.use(verifyAccessToken);

/**
 * GET /photos
 *
 * Get all photos of logged in user
 */
// photosRouter.get("/", index);
photosRouter.get("/", getAllPhotosOfUser);
/**
 * GET /photos/:photoId
 *
 * Get a single photo by ID
 */
photosRouter.get("/:photoId", show);

/**
 * POST /photos
 *
 * Create a photo and attach it to the user
 */
photosRouter.post("/", createPhotoRules, store);

/**
 * PATCH /photos
 *
 * Update a photo
 */
photosRouter.patch("/:photoId", updatePhotoRules, validateRequest, update);

/**
 * DELETE /photos/:photoId
 *
 * Delete a single photo
 */
photosRouter.delete("/:photoId", destroy);
