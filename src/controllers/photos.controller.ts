import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { getPhotos } from "../services/photos.service.ts";

/**
 * Get all photos
 */
export const index = async (_req: Request, res: Response) => {
	try {
		const photos = await getPhotos();

		res.send({ status: "success", data: photos });
	} catch (error) {
		handlePrismaError(res, error);
	}
};

/**
 * Get a single resource
 */
export const show = async (req: Request, res: Response) => {
	const photo = Number(req.params.photoId);
	try {
		const photo = await getPhotos(photoId);
		res.send({ status: "success", data: photo });
	} catch (error) {
		handlePrismaError(res, error);
	}
};

/**
 * Create an resource
 */
export const store = async (req: Request, res: Response) => {};

/**
 * Update a single resource
 */
export const update = async (req: Request, res: Response) => {};

/**
 * Delete a single resource
 */
export const destroy = async (req: Request, res: Response) => {};
