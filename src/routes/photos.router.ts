import express from "express";
import { destroy, index, show, store, update } from "../controllers/photos.controller.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { createPhotoRules, updatePhotoRules } from "../rules/photo.rules.ts";

// Create Photos router
export const photosRouter = express.Router();

/**
 * GET /photos
 *
 * Get all photos
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
 * Create a photo and attach it to the user
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
