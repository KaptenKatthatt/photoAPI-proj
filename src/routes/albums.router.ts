import express from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";

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
 * PATCH /books/:bookId
 *
 * Update a single book
 */
booksRouter.patch("/:bookId", updateBookRules, validateRequest, update);

/**
 * DELETE /books/:bookId
 *
 * Delete a single book
 */
booksRouter.delete("/:bookId", destroy);

// /**
//  * POST /books/:bookId/authors
//  *
//  * Add author(s) to book
//  */
// booksRouter.post("/:bookId/authors", addAuthor);
