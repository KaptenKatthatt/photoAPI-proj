/**
 * Auth Controller
 */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import type { CreateUserData } from "../types/User.types.ts";
import Debug from "debug";
import jwt from "jsonwebtoken";
import { matchedData } from "express-validator";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { createUser, getUserByEmail } from "../services/user.service.ts";
import type { JWTAccessTokenPayload } from "../types/JWT.types.ts";
import { StringValue } from "ms";

// Create a debug instance
const debug = Debug("prisma-books:auth_controller");

// Environment variables
const ACCESS_TOKEN_LIFETIME = (process.env.ACCESS_TOKEN_LIFETIME as StringValue) || "15m";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const REFRESH_TOKEN_LIFETIME = (process.env.REFRESH_TOKEN_LIFETIME as StringValue) || "1d";
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
 * Register a new user for JWT authentication
 */
const registerUser = async (req: Request, res: Response) => {
	const validatedData = matchedData<CreateUserData>(req);

	// Create hash and salt for password
	const hashed_password = await bcrypt.hash(validatedData.password, SALT_ROUNDS);

	try {
		// Create the user in the database
		const user = await createUser({
			...validatedData,
			password: hashed_password,
		});
		res.status(201).send({
			status: "success",
			data: { user },
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};

/**
 * Login a user and provide JWT tokens
 */
export const loginUser = async (req: Request, res: Response) => {
	// Get validated login info from request
	const { email, password } = matchedData<LoginData>(req);

	// Look for user in database
	const user = await getUserByEmail(email);
	if (!user) {
		res.status(401).send({ status: "fail", message: "Invalid email or password" });
		return;
	}

	// Check password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		debug("Invalid password for user %s", email);
		res.status(401).send({ status: "fail", message: "Invalid email or password" });
		return;
	}
	console.log("Login successful");

	// Create JWT access token payload
	const payload: JWTAccessTokenPayload = {
		sub: String(user.id),
		firstName: user.first_name,
		lastName: user.last_name,
		email: user.email,
	};

	// Sign payload with access-token secret
	const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
		expiresIn: ACCESS_TOKEN_LIFETIME as StringValue,
	});

	// Create JWT refresh token payload
	const refreshTokenPayload = {
		sub: String(user.id),
	};

	// Sign payload with refresh-token secret
	const refreshToken = jwt.sign(refreshTokenPayload, REFRESH_TOKEN_SECRET, {
		expiresIn: REFRESH_TOKEN_LIFETIME,
	});
};
