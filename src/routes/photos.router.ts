import express from "express";
import {
	destroy,
	getAllPhotosOfUser,
	linkPhotoToAlbum,
	// index,
	show,
	store,
	unlinkPhotoFromAlbum,
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
 * Add one or many photos to the user profile
 */
photosRouter.post("/", createPhotoRules, validateRequest, store);

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

/**
 * POST /photos/:albumId/photos
 *
 * Add one or many photos to an album
 */
photosRouter.post("/:albumId/photos/", linkPhotoToAlbum);

/**
 * POST /photos/:albumId/photos
 *
 * Disconnect photo from album
 */
photosRouter.delete("/:albumId/photos/", unlinkPhotoFromAlbum);
