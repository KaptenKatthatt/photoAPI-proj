import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { destroy, index, show, store, update } from "../controllers/albums.controller.ts";
import { createAlbumRules, updateAlbumRules } from "../rules/album.rules.ts";
import { linkPhotoToAlbum } from "../controllers/albums.controller.ts";
import { verifyAccessToken } from "../middlewares/auth/jwt.ts";
// Create a Albums router
export const albumsRouter = express.Router();
albumsRouter.use(verifyAccessToken);

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
 * Update a single album
 */
albumsRouter.patch("/:albumId", updateAlbumRules, validateRequest, update);

/**
 * DELETE /albums/:albumId
 *
 * Delete a single album
 */
albumsRouter.delete("/:albumId", destroy);

/**
 * POST /albums/:albumId/photos/:photoId
 *
 * Add one or many photos to an album
 */
albumsRouter.post("/:albumId/photos/", linkPhotoToAlbum);
