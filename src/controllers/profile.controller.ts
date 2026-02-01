/**
 * Profile Controller
 */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createUser, getUser, getUsers, updateUserProfile } from "../services/user.service.ts";
import { matchedData } from "express-validator";
import type { CreateUserData, UpdateUserData } from "../types/User.types.ts";
import { handlePrismaError } from "../lib/errorHandlers/handlePrismaError.ts";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// Get all users
export const index = async (_req: Request, res: Response) => {
	try {
		const users = await getUsers();
		res.send({
			status: "success",
			data: users,
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};
// Get profile of user this side of the fence
export const getProfile = async (req: Request, res: Response) => {
	// Check if the user exists
	if (!req.token) {
		throw new Error("No user found. Go away.");
	}
	const userId = Number(req.token.sub);

	// Get user info from db
	const user = await getUser(userId);

	if (!user) {
		res.status(404).send({ status: "fail", data: { message: "User not found" } });
		return;
	}

	// Send user profile
	res.send({
		status: "success",
		data: {
			id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
		},
	});
};

// Get a single user
export const show = async (req: Request, res: Response) => {
	const userId = Number(req.params.userId);

	// Get user info from database
	const user = await getUser(userId);

	if (!user) {
		res.status(404).send({ status: "fail", data: { message: "User not found" } });
		return;
	}

	res.send({
		status: "success",
		data: {
			id: user.id,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
		},
	});
};

// Create a user
export const store = async (req: Request, res: Response) => {
	const validatedData = matchedData<CreateUserData>(req);
	try {
		const user = await createUser(validatedData);
		res.status(201).send({
			status: "success",
			data: {
				id: user.id,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
			},
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};

/**
 * Update a user profile
 */
export const updateProfile = async (req: Request, res: Response) => {
	if (!req.token) {
		throw new Error("No user found. Go away.");
	}

	const userId = Number(req.token.sub);
	const validatedData = matchedData<UpdateUserData>(req);

	// If request to update password, clone data to avoid overwriting other incoming data
	const data = { ...validatedData };
	if (data.password) {
		data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
	}

	try {
		const user = await updateUserProfile(userId, data);

		res.send({
			status: "success",
			data: {
				id: user.id,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
			},
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};
