import { body } from "express-validator";

export const loginRules = [
	body("email").trim().isEmail().withMessage("Email must be a valid email address"),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.bail()
		.isString()
		.withMessage("Password must be a string"),
];
