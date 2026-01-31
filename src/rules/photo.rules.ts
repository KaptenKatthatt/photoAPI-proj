import { body } from "express-validator";

export const createPhotoRules = [
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

	body("url")
		.trim()
		.notEmpty()
		.withMessage("URL is required")
		.bail()
		.isURL()
		.withMessage("URL must be a valid URL")
		.bail(),

	body("comment")
		.optional()
		.isString()
		.withMessage("Comment must be a string")
		.bail()
		.trim()
		.isLength({ max: 500 })
		.withMessage("Comment must be at most 500 characters"),
];

export const updatePhotoRules = [
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

	body("url")
		.notEmpty()
		.withMessage("URL cannot be empty")
		.bail()
		.optional()
		.isURL()
		.withMessage("URL must be a valid URL")
		.bail()
		.trim(),

	body("comment")
		.optional()
		.isString()
		.withMessage("Comment must be a string")
		.bail()
		.trim()
		.isLength({ max: 500 })
		.withMessage("Comment must be at most 500 characters"),
];
