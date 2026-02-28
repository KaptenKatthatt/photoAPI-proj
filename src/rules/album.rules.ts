import { body } from "express-validator";

export const createAlbumRules = [
	body("title")
		.notEmpty()
		.withMessage("Title is required")
		.bail()
		.isString()
		.withMessage("Title must be a string")
		.bail()
		.trim()
		.isLength({ min: 3 })
		.withMessage("Title must be at least 3 characters"),
];

export const updateAlbumRules = [
	body("title")
		.notEmpty()
		.withMessage("Title cannot be empty")
		.bail()
		.optional()
		.isString()
		.withMessage("Title must be a string")
		.bail()
		.trim()
		.isLength({ min: 3 })
		.withMessage("Title must be at least 3 characters"),
];

export const postPhotosRules = [
	body().notEmpty().withMessage("No content in upload").bail().isArray(),
	body("*.id").notEmpty().withMessage("Empty id").bail().isInt(),
];
