import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import {
	createPhoto,
	deletePhoto,
	getPhoto,
	getPhotos,
	updatePhoto,
} from "../services/photos.service.ts";
import { matchedData } from "express-validator";
import { CreatePhotoData, type UpdatePhotoData } from "../types/Photo.types.ts";

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
 * Create a photo
 */
export const store = async (req: Request, res: Response) => {
	const validatedData = matchedData<CreatePhotoData>(req);
	try {
		const photo = await createPhoto(validatedData);
		res.status(201).send({ status: "success", data: photo });
	} catch (error) {
		handlePrismaError(res, error);
	}
};

export const update = async (req: Request, res: Response) => {
	const photoId = Number(req.params.photoId);

	if (!photoId) {
		res.status(400).send({ status: "error", message: "Invalid photo ID" });
		return;
	}

	try {
		const validatedData = matchedData<Partial<UpdatePhotoData>>(req);

		const photo = await updatePhoto(photoId, validatedData);

		res.send({ status: "success", data: photo });
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// /**
//  * Delete a single photo
//  */
export const destroy = async (req: Request, res: Response) => {
	const photoId = Number(req.params.photoId);

	if (!photoId) {
		res.status(400).send({ status: "error", message: "Invalid photo ID" });
		return;
	}

	try {
		await deletePhoto(photoId);
		res.status(204).send();
	} catch (error) {
		handlePrismaError(res, error);
	}
};
