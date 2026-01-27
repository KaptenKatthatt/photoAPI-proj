/**
 * Albums Controller
 *  */

import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";

export const index = async (_req: Request, res: Response) => {
	{
		try {
			const albums = await getAlbums();
			res.send({
				status: "success",
				data: {
					albums,
				},
			});
		} catch (error) {
			handlePrismaError(res, error);
		}
	}
};
