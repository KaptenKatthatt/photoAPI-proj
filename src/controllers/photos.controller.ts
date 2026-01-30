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
 * Get all photos of logged in user
 */
export const getAllPhotosOfUser = async (req: Request, res: Response) => {
	if (!req.token) {
		throw new Error("Could not get user from token");
	}
	const userId = Number(req.token.sub);

	try {
		const photos = await getPhotos(userId);

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
	const userId = Number(req.token?.sub);

	if (!photoId) {
		res.status(400).send({ status: "error", message: "Invalid photo ID" });
		return;
	}
	try {
		const photo = await getPhoto(photoId, userId);
		res.send({ status: "success", data: photo });
	} catch (error) {
		handlePrismaError(res, error);
	}
};

/**
 * Add a photo to profile
 */
export const store = async (req: Request, res: Response) => {
	const validatedData = matchedData<CreatePhotoData>(req);
	const userId = Number(req.token?.sub);

	if (!userId) {
		throw new Error("Could not find userId in token");
	}

	try {
		const photo = await createPhoto(validatedData, userId);
		res.status(201).send({ status: "success", data: photo });
	} catch (error) {
		handlePrismaError(res, error);
	}
};

/**
 * Update a single photo
 */
export const update = async (req: Request, res: Response) => {
	const photoId = Number(req.params.photoId);
	const userId = Number(req.token?.sub);

	if (!photoId) {
		res.status(400).send({ status: "error", message: "Invalid photo ID" });
		return;
	}

	try {
		const validatedData = matchedData<Partial<UpdatePhotoData>>(req);

		const photo = await updatePhoto(photoId, validatedData, userId);

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
	const userId = Number(req.token?.sub);

	if (!photoId) {
		res.status(400).send({ status: "error", message: "Invalid photo ID" });
		return;
	}

	try {
		await deletePhoto(photoId, userId);
		res.status(204).send();
	} catch (error) {
		handlePrismaError(res, error);
	}
};
