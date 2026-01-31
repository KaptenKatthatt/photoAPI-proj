/**
 * Authentication Middleware for JWT
 */

import Debug from "debug";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import type { JWTAccessTokenPayload } from "../../types/JWT.types.ts";

const debug = Debug("prisma-photo:auth-jwt");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

if (!ACCESS_TOKEN_SECRET) {
	throw new Error("Access token not defined.");
}

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	// Check for authorization header
	if (!req.headers.authorization) {
		debug("No authorization header found.");
		res.status(401).send({
			status: "fail",
			message: "No authorization header found. Trespassers will be shot on sight.",
		});
		return;
	}

	// Split the authorization header to get the token
	const [authScheme, token] = req.headers.authorization.split(" ");

	// Check if user is using Bearer authentication
	if (authScheme.toLowerCase() !== "bearer") {
		debug("Authorization scheme is not Bearer.");
		res.status(401).send({
			status: "fail",
			message: "Wrong authorization header found. Trespassers will be shot on sight.",
		});
		return;
	}

	// Explicitly treat 'null' or missing tokens as invalid
	if (!token || token === "null" || token === "undefined") {
		debug("Missing or invalid access token provided");
		res.status(401).send({
			status: "fail",
			message: "Missing or invalid access token",
		});
		return;
	}

	// Verify access token and take all the stuff
	try {
		const accessTokenPayload = jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTAccessTokenPayload;

		// Attach the decoded token payload to the request object
		req.token = accessTokenPayload;
		next();
	} catch (error) {
		debug("Invalid access token, JWT verification failed.", error);

		if (error instanceof jwt.TokenExpiredError) {
			res.status(401).send({
				status: "fail",
				message: "Auth token expired. You need to leave. Now.",
			});
			return;
		}
		res.status(401).send({
			status: "fail",
			message: "Denied. You need to leave. Now.",
		});
		return;
	}
};
