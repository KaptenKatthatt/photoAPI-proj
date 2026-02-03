import type { Response, Request, NextFunction } from "express";
import { getUser } from "../../services/user.service.ts";

export const checkIfUserExists = async (req: Request, res: Response, next: NextFunction) => {
	const userId = req.userId;
	const user = await getUser(userId);
	req.user = user;

	if (!user) {
		res.status(401).send({ status: "fail", data: { message: "User not found" } });
		return;
	}

	next();
};
