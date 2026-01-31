import { body } from "express-validator";
import { validateEmailExists } from "../services/user.service.ts";

export const loginRules = [
	body("email")
		.trim()
		.isEmail()
		.withMessage("Email must be a valid email address")
		.custom(validateEmailExists),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.bail()
		.isString()
		.withMessage("Password must be a string"),
];
