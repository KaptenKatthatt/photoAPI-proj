/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { createUser, getUser, getUserByEmail } from "../services/user.service.ts";
import type { JWTAccessTokenPayload, JWTRefreshTokenPayload } from "../types/JWT.types.ts";
import { StringValue } from "ms";

// Create a debug instance
const debug = Debug("prisma-photos:auth_controller");

// Environment variables
const ACCESS_TOKEN_LIFETIME = (process.env.ACCESS_TOKEN_LIFETIME as StringValue) || "5m";
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
export const registerUser = async (req: Request, res: Response) => {
	const validatedData = matchedData<CreateUserData>(req);

	// Create hash and salt for password
	const hashed_password = await bcrypt.hash(validatedData.password, SALT_ROUNDS);

	try {
		// Create the user in the database
		const user = await createUser({
			...validatedData,
			password: hashed_password,
		});
		// const { password: _password, ...userWithoutPassword } = user;

		/*
				RESPONSE EXAMPLE
		{
		"status": "success",
		"data": {
			"email": "jn@badcameraphotography.com",
			"first_name": "Johan",
			"last_name": "Nordström"
		}
		}
		*/

		res.status(201).send({
			status: "success",
			data: { email: user.email, first_name: user.first_name, last_name: user.last_name },
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
		res.status(401).send({ status: "fail", data: { message: "Invalid email or password" } });
		return;
	}

	// Check password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		debug("Invalid password for user %s", email);
		res.status(401).send({ status: "fail", data: { message: "Invalid email or password" } });
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

	// Set refresh token as HTTP only cookie
	res.cookie("refresh_token", refreshToken, {
		httpOnly: true,
		sameSite: "strict",
		path: "/refresh",
	});

	// Respond with access token
	res.send({
		status: "success",
		data: {
			access_token: accessToken,
		},
	});
};

// Issue new access token using refresh token
export const refreshAccessToken = async (req: Request, res: Response) => {
	const refreshToken = (req.cookies as { refresh_token?: string }).refresh_token;

	if (!refreshToken) {
		debug("No refresh token found in cookies");
		res.status(401).send({ status: "fail", data: { message: "No refresh token provided" } });
		return;
	}

	// Verify refresh token
	let refreshTokenPayload: JWTRefreshTokenPayload;

	try {
		refreshTokenPayload = jwt.verify(
			refreshToken,
			REFRESH_TOKEN_SECRET,
		) as JWTRefreshTokenPayload;
	} catch (error) {
		debug("Failed to verify refresh token: %O", error);

		// Check if token is expired
		if (error instanceof jwt.TokenExpiredError) {
			res.status(401).send({ status: "fail", data: { message: "Refresh token expired" } });
			return;
		}
		res.status(401).send({ status: "fail", data: { message: "Invalid refresh token" } });
		return;
	}

	// Find user associated with refresh token
	debug("Refresh token valid for user ID %s", refreshTokenPayload.sub);
	const userId = Number(refreshTokenPayload.sub);
	const user = await getUser(userId);

	if (!user) {
		res.status(401).send({ status: "fail", data: { message: "User not found" } });
		return;
	}

	// Create new access token payload
	const newAccessTokenPayload: JWTAccessTokenPayload = {
		sub: String(user.id),
		firstName: user.first_name,
		lastName: user.last_name,
		email: user.email,
	};

	// Sign new access token
	const accessToken = jwt.sign(newAccessTokenPayload, ACCESS_TOKEN_SECRET, {
		expiresIn: ACCESS_TOKEN_LIFETIME,
	});

	// Respond with new access token
	res.send({
		status: "success",
		data: {
			access_token: accessToken,
		},
	});
};

// Refresh access token using refresh token
// export const refreshAccessToken = async (req: Request, res: Response) => {

/*
	RESPONSE EXAMPLE
	{
  "status": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IkpvaGFuIE5vcmRzdHLDtm0iLCJlbWFpbCI6ImpuQHRoZWhpdmVyZXNpc3RhbmNlLmNvbSIsImlhdCI6MTczODgzNTk0OCwiZXhwIjoxNzM4ODM2ODQ4fQ.QTgUMXFWrT5OlmTN3k337mSEw8MJPXSiYUIaWbG5kJI"
  }
}
*/
