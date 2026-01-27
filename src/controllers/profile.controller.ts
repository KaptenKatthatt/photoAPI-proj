/**
 * Profile Controller
 */

import { Request, Response } from "express";
import { getUser } from "../services/user.service.ts";

export const getProfile = async (req: Request, res: Response) => {
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
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
		},
	});
};

// export const updateProfile = async (req: Request, res: Response) => {
// }
