import { body } from "express-validator";
import { validateEmailDoesNotExist } from "../services/user.service.ts";

export const createUserRules = [
	body("email")
		.trim()
		.isEmail()
		.withMessage("Email must be a valid email address")
		.bail()
		.custom(validateEmailDoesNotExist),

	body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

	body("first_name")
		.trim()
		.isLength({ min: 3 })
		.withMessage("First name must be at least 3 characters"),

	body("last_name")
		.trim()
		.isLength({ min: 3 })
		.withMessage("Last name must be at least 3 characters"),
];

export const updateUserRules = [
	body("first_name")
		.optional()
		.trim()
		.isLength({ min: 3, max: 191 })
		.withMessage("First name must be between 3 and 191 characters"),

	body("last_name")
		.optional()
		.trim()
		.isLength({ min: 3, max: 191 })
		.withMessage("Last name must be between 3 and 191 characters"),

	body("email")
		.optional()
		.trim()
		.isEmail()
		.withMessage("Email must be a valid email address")
		.custom(validateEmailDoesNotExist),

	body("password")
		.optional()
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];
