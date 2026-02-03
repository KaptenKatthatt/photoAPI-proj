/**
 * Profile Controller
 */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { updateUserProfile } from "../services/user.service.ts";
import { matchedData } from "express-validator";
import type { UpdateUserData } from "../types/User.types.ts";
import { handlePrismaError } from "../lib/errorHandlers/handlePrismaError.ts";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// Get logged in user's profile
export const getProfile = async (req: Request, res: Response) => {
	// Get user info from db
	const user = req.user!;

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

// // Get a single user
// export const show = async (req: Request, res: Response) => {
// 	const user = req.user!;

// 	res.send({
// 		status: "success",
// 		data: {
// 			id: user.id,
// 			email: user.email,
// 			first_name: user.first_name,
// 			last_name: user.last_name,
// 		},
// 	});
// };

/**
 * Update a user profile
 */
export const updateProfile = async (req: Request, res: Response) => {
	const validatedData = matchedData<UpdateUserData>(req);
	const userId = req.userId;

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
