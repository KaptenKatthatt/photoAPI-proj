/**
 * Profile Controller
 */

import { Request, Response } from "express";
import { createUser, getUser, getUsers } from "../services/user.service.ts";
import { matchedData } from "express-validator";
import type { CreateUserData } from "../types/User.types.ts";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

// Get all users
export const index = async (_req: Request, res: Response) => {
	try {
		const users = await getUsers();
		res.send({
			status: "success",
			data: { users },
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Get a single user
export const show = async (req: Request, res: Response) => {
	const userId = Number(req.params.userId);

	// Get user info from database
	const user = await getUser(userId);

	if (!user) {
		res.status(404).send({ status: "fail", message: "User not found" });
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
			data: { user },
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};

/**
 * Update a user profile
 */
// export const updateProfile = async (req: Request, res: Response) => {
// }

// Connect an album to a user
export const connectAlbumToUser = async (req: Request, res: Response) => {
	const userId = Number(req.params.userId);

	try {
		const result = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				albums: {
					connect: req.body,
				},
			},
			include: {
				albums: true,
			},
		});

		res.send(result);
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Disconnect album from user
export const disconnectAlbumFromUser = async (req: Request, res: Response) => {
	const userId = Number(req.params.userId);

	try {
		const result = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				albums: {
					disconnect: req.body,
				},
			},
			include: {
				albums: true,
			},
		});

		res.send(result);
	} catch (error) {
		handlePrismaError(res, error);
	}
};
