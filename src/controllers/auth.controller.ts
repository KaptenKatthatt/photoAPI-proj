/**
 * Auth Controller
 */
import { Request, Response } from "express";
import type { CreateUserData } from "../types/User.types.ts";
import Debug from "debug";
import { matchedData } from "express-validator";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { createUser } from "../services/user.service.ts";

// Create a debug instance
const debug = Debug("prisma-books:auth_controller");

// Environment variables
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME || "15m";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME || "1d";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// Check for tokens
if (!ACCESS_TOKEN_SECRET) {
	throw new Error("ACCESS_TOKEN_SECRET is not defined");
}

if (!REFRESH_TOKEN_SECRET) {
	throw new Error("REFRESH_TOKEN_SECRET is not defined");
}

interface LoginData {
	email: string;
	password: string;
}

/**
 * Register a User
 */
// export const registerUser = async (req: Request, res: Response) => {
// 	const validatedData = matchedData<CreateUserData>(req);

// 	try {
// 		const user = await createUser(validatedData);

// 		res.status(201).send({
// 			status: "success",
// 			data: { user },
// 		});
// 	} catch (error) {
// 		handlePrismaError(res, error);
// 	}
// };
