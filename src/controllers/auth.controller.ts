import { Request, Response } from "express";
import type { CreateUserData } from "../types/User.types.ts";
import { matchedData } from "express-validator";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { createUserRules } from "../rules/user.rules.ts";
import { createUser } from "../services/user.service.ts";
/**
 * Auth Controller
 */

/**
 * Register a User
 */
export const registerUser = async (req: Request, res: Response) => {
	const validatedData = matchedData<CreateUserData>(req);

	try {
		const user = await createUser(validatedData);

		res.status(201).send({
			status: "success",
			data: { user },
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};
