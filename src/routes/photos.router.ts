import express from "express";
import { index, show } from "../controllers/photos.controller.ts";

// Create Photos router
export const photosRouter = express.Router();

/**
 * GET /books
 *
 * Get all books
 */
photosRouter.get("/", index);

/**
 * GET /photos/:photoId
 *
 * Get a single photo by ID
 */
photosRouter.get("/:photoId", show);
