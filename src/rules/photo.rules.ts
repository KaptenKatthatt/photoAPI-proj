import { body } from "express-validator";

export const createPhotoRules = [
	body("title")
		.isString()
		.withMessage("Title must be a string")
		.bail()
		.trim()
		.isLength({ min: 3, max: 191 })
		.withMessage("Title must be between 3 and 191 characters"),

	body("url").isURL().withMessage("URL must be a valid URL").bail().trim(),

	body("comment")
		.optional()
		.isString()
		.withMessage("Comment must be a string")
		.bail()
		.trim()
		.isLength({ max: 500 })
		.withMessage("Comment must be at most 500 characters"),

	body("userId")
		.exists()
		.withMessage("User ID is required")
		.bail()
		.isInt()
		.withMessage("User ID must be an integer"),
];

export const updatePhotoRules = [
	body("title")
		.optional()
		.isString()
		.withMessage("Title must be a string")
		.bail()
		.trim()
		.isLength({ min: 3, max: 191 })
		.withMessage("Title must be between 1 and 191 characters"),

	body("url").optional().isURL().withMessage("URL must be a valid URL").bail().trim(),

	body("comment")
		.optional()
		.isString()
		.withMessage("Comment must be a string")
		.bail()
		.trim()
		.isLength({ max: 500 })
		.withMessage("Comment must be at most 500 characters"),
];
