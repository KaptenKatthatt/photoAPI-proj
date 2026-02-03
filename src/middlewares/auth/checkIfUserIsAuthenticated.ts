import { Request, Response, type NextFunction } from "express";

export const checkIfUserIsAuthenticated = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!req.token) {
		res.status(401).send({
			status: "fail",
			data: {
				message: "Unauthorized",
			},
		});
		return;
	}
	req.userId = Number(req.token.sub);
	next();
};
