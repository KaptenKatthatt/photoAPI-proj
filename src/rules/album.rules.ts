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
		.isLength({ min: 3, max: 191 })
		.withMessage("Title must be between 1 and 191 characters"),
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
		.isLength({ min: 3, max: 191 })
		.withMessage("Title must be between 1 and 191 characters"),
];
