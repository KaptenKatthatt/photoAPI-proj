import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import {
	destroy,
	index,
	show,
	store,
	unlinkPhotoFromAlbum,
	update,
} from "../controllers/albums.controller.ts";
import { createAlbumRules, postPhotosRules, updateAlbumRules } from "../rules/album.rules.ts";
import { verifyAccessToken } from "../middlewares/auth/jwt.ts";
import { linkPhotoToAlbum } from "../controllers/albums.controller.ts";
import { checkIfUserIsAuthenticated } from "../middlewares/auth/checkIfUserIsAuthenticated.ts";
import { checkIfUserExists } from "../middlewares/auth/checkIfUserExists.ts";

// Create a Albums router
export const albumsRouter = express.Router();

albumsRouter.use(verifyAccessToken);
albumsRouter.use(checkIfUserIsAuthenticated);
albumsRouter.use(checkIfUserExists);

/**
 * GET /albums
 *
 * Get all albums
 */
albumsRouter.get("/", index);

/**
 * GET /albums/:albumId
 *
 * Get a single album
 */
albumsRouter.get("/:albumId", show);

/**
 * POST /albums
 *
 * Create an album
 */
albumsRouter.post("/", createAlbumRules, validateRequest, store);

/**
 * PATCH /albums/:albumId
 *
 * Update an album
 */
albumsRouter.patch("/:albumId", updateAlbumRules, validateRequest, update);

/**
 * DELETE /albums/:albumId
 *
 * Delete an album
 */
albumsRouter.delete("/:albumId", destroy);

/**
 * POST /albums/:albumId/photos
 *
 * Add photos to an album
 */
albumsRouter.post("/:albumId/photos", postPhotosRules, validateRequest, linkPhotoToAlbum);

/**
 * DELETE /albums/:albumId/photos/:photoId
 *
 * Disconnect photo from album
 */
albumsRouter.delete("/:albumId/photos/:photoId", validateRequest, unlinkPhotoFromAlbum);
