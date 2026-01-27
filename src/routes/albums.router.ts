import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { destroy, index, show, store, update } from "../controllers/albums.controller.ts";
import { createAlbumRules, updateAlbumRules } from "../rules/album.rules.ts";

// Create a Albums router
export const albumsRouter = express.Router();

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
 * Create a album
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

// /**
//  * POST /books/:bookId/authors
//  *
//  * Add author(s) to book
//  */
// booksRouter.post("/:bookId/authors", addAuthor);
