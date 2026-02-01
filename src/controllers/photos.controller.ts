import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import {
	addPhotoToAlbum,
	createPhoto,
	deletePhoto,
	getPhoto,
	getPhotos,
	removePhotoFromAlbum,
	updatePhoto,
} from "../services/photos.service.ts";
import { matchedData } from "express-validator";
import { CreatePhotoData, type PhotoId, type UpdatePhotoData } from "../types/Photo.types.ts";

/**
 * Get all photos of logged in user
 */
export const getAllPhotosOfUser = async (req: Request, res: Response) => {
	if (!req.token) {
		throw new Error("Unauthorized. Could not get user from token.");
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

	if (!req.token) {
		throw new Error("Unauthorized. Could not get user from token.");
	}

	const userId = Number(req.token.sub);

	if (!photoId) {
		res.status(400).send({ status: "fail", data: { message: "Invalid photo ID" } });
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
	if (!req.token) {
		throw new Error("Unauthorized. Could not get user from token.");
	}
	const userId = Number(req.token.sub);

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

	if (!req.token) {
		throw new Error("Unauthorized. Could not get user from token.");
	}
	const userId = Number(req.token.sub);

	if (!photoId) {
		res.status(400).send({ status: "fail", data: { message: "Invalid photo ID" } });
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
//  * Delete a single photo from db and disconnect it from albums
//  */
export const destroy = async (req: Request, res: Response) => {
	if (!req.token) {
		throw new Error("Unauthorized. Could not get user from token.");
	}
	const photoId = Number(req.params.photoId);
	const userId = Number(req.token.sub);

	if (!photoId) {
		res.status(400).send({ status: "fail", data: { message: "Invalid photo ID" } });
		return;
	}

	try {
		const result = await deletePhoto(photoId, userId);
		if (result.count === 0) {
			res.status(404).send({ status: "fail", data: { message: "Photo not found" } });
			return;
		}
		res.status(200).send({ status: "success", data: null });
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Add photo or photos to album
export const linkPhotoToAlbum = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);

	if (!req.token) {
		throw new Error("Unauthorized. Could not get user from token.");
	}
	const userId = Number(req.token.sub);

	if (!albumId) {
		res.status(400).send({ status: "fail", data: { message: "Invalid album ID" } });
		return;
	}

	try {
		await addPhotoToAlbum(albumId, userId, req.body);

		res.status(200).send({ status: "success", data: null });
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Remove photo or photos from album
export const unlinkPhotoFromAlbum = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);

	if (!req.token) {
		throw new Error("User not found.");
	}
	const userId = Number(req.token.sub);

	if (!albumId) {
		res.status(400).send({ status: "fail", data: { message: "Album ID not found" } });
		return;
	}

	try {
		await removePhotoFromAlbum(albumId, userId, req.body as PhotoId | PhotoId[]);
		res.status(200).send({ status: "success", data: null });
	} catch (error) {
		handlePrismaError(res, error);
	}
};
