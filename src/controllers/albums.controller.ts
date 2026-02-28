/**
 * Albums Controller
 *  */

import { Request, Response } from "express";
import { handlePrismaError } from "../lib/errorHandlers/handlePrismaError.ts";
import {
	addPhotoToAlbum,
	createAlbum,
	deleteAlbum,
	getAlbum,
	getAlbums,
	removePhotoFromAlbum,
	updateAlbum,
} from "../services/albums.service.ts";
import { matchedData } from "express-validator";
import { CreateAlbumData, type AlbumId, type UpdateAlbumData } from "../types/Album.types.ts";

// Get all albums of logged in user
export const index = async (req: Request, res: Response) => {
	{
		const userId = req.userId;

		try {
			const albums = await getAlbums(userId);
			res.send({
				status: "success",
				data: albums,
			});
		} catch (error) {
			handlePrismaError(res, error);
		}
	}
};

// Get a single album
export const show = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);

	const userId = req.userId;

	if (!albumId) {
		res.status(400).send({
			status: "fail",
			data: { message: "Invalid album ID" },
		});
		return;
	}
	try {
		const album = await getAlbum(albumId, userId);
		res.send({
			status: "success",
			data: album,
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Create an album
export const store = async (req: Request, res: Response) => {
	const validatedData = matchedData<CreateAlbumData>(req);
	const userId = req.userId;

	try {
		const album = await createAlbum(validatedData, userId);
		res.status(201).send({
			status: "success",
			data: album,
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Update an album
export const update = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);
	const userId = req.userId;

	if (!albumId) {
		res.status(400).send({
			status: "fail",
			data: { message: "Invalid album ID" },
		});
		return;
	}
	try {
		const validatedData = matchedData<UpdateAlbumData>(req);
		const album = await updateAlbum(albumId, validatedData, userId);
		res.send({
			status: "success",
			data: album,
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Delete an album

export const destroy = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);
	const userId = req.userId;

	if (!albumId) {
		res.status(400).send({
			status: "fail",
			data: { message: "Invalid album ID" },
		});
		return;
	}
	try {
		await deleteAlbum(albumId, userId);
		res.status(200).send({ status: "success", data: null });
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Add photo or photos to album
export const linkPhotoToAlbum = async (
	req: Request<{ albumId: string }, unknown, AlbumId[]>,
	res: Response,
) => {
	const albumId = Number(req.params.albumId);

	const userId = req.userId;

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
export const unlinkPhotoFromAlbum = async (
	req: Request<{ albumId: string; photoId: string }, unknown, AlbumId | AlbumId[]>,
	res: Response,
) => {
	const albumId: number = Number(req.params.albumId);
	const photoId: number = Number(req.params.photoId);

	const userId = req.userId;

	if (!albumId) {
		res.status(400).send({ status: "fail", data: { message: "Album ID not found" } });
		return;
	}

	try {
		await removePhotoFromAlbum(albumId, userId, photoId);
		res.status(200).send({ status: "success", data: null });
	} catch (error) {
		handlePrismaError(res, error);
	}
};
