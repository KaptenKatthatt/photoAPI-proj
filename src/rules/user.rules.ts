import { body } from "express-validator";
import { getUserByEmail } from "../services/user.service.ts";

/**
 * Validate that a Email does not already exist
 *
 * @param value Email
 * @returns
 */
const validateEmailDoesNotExist = async (value: string) => {
	const user = await getUserByEmail(value);
	// If a user with that email was found, throw an error
	if (user) {
		throw new Error("Email already exists");
	}
};

export const createUserRules = [
	body("first_name")
		.isString()
		.withMessage("First name must be a string")
		.bail()
		.trim()
		.isLength({ min: 3, max: 191 })
		.withMessage("First name must be between 3 and 191 characters"),
	body("last_name")
		.isString()
		.withMessage("Last name must be a string")
		.bail()
		.trim()
		.isLength({ min: 3, max: 191 })
		.withMessage("Last name must be between 3 and 191 characters"),

	body("email")
		.trim()
		.isEmail()
		.withMessage("Email must be a valid email address")
		.custom(validateEmailDoesNotExist),

	body("password")
		.isString()
		.withMessage("Password must be a string")
		.bail()
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

export const updateUserRules = [
	body("first_name")
		.optional()
		.isString()
		.withMessage("First name must be a string")
		.bail()
		.trim()
		.isLength({ min: 3, max: 191 })
		.withMessage("First name must be between 3 and 191 characters"),

	body("last_name")
		.optional()
		.isString()
		.withMessage("Last name must be a string")
		.bail()
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
		.isString()
		.withMessage("Password must be a string")
		.bail()
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];
