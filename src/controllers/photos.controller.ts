import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { getPhoto, getPhotos } from "../services/photos.service.ts";

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
 * Get a single photo by ID
 */
export const show = async (req: Request, res: Response) => {
	const photoId = Number(req.params.photoId);
	try {
		const photo = await getPhoto(photoId);
		res.send({ status: "success", data: photo });
	} catch (error) {
		handlePrismaError(res, error);
	}
};

/**
 * Create an photo
 */
export const store = async (req: Request, res: Response) => {
	export const
};

/**
 * Update a single resource
 */
export const update = async (req: Request, res: Response) => {};

/**
 * Delete a single resource
 */
export const destroy = async (req: Request, res: Response) => {};
