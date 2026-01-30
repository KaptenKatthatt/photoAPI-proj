/**
 * Albums Controller
 *  */

import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import {
	createAlbum,
	deleteAlbum,
	getAlbum,
	getAlbums,
	updateAlbum,
} from "../services/albums.service.ts";
import { matchedData } from "express-validator";
import { CreateAlbumData, type AlbumId, type UpdateAlbumData } from "../types/Album.types.ts";
import { prisma } from "../lib/prisma.ts";

// Get all albums of logged in user
export const index = async (req: Request, res: Response) => {
	{
		const userId = Number(req.token?.sub);

		console.log("userId", userId);
		try {
			const albums = await getAlbums(userId);
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

// Get a single album
export const show = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);
	const userId = Number(req.token?.sub);

	if (!albumId) {
		res.status(400).send({
			status: "error",
			message: "Invalid album ID",
		});
		return;
	}
	try {
		const album = await getAlbum(albumId, userId);
		res.send({
			status: "success",
			data: {
				album,
			},
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Create an album
export const store = async (req: Request, res: Response) => {
	const validatedData = matchedData<CreateAlbumData>(req);
	const userId = Number(req.token?.sub);

	if (!userId) {
		throw new Error("Could not find userId in token");
	}

	try {
		const album = await createAlbum(validatedData, userId);
		res.status(201).send({
			status: "success",
			data: {
				album,
			},
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Update an album

export const update = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);
	if (!albumId) {
		res.status(400).send({
			message: "Invalid album ID",
		});
		return;
	}
	try {
		const validatedData = matchedData<UpdateAlbumData>(req);
		const album = await updateAlbum(albumId, validatedData);
		res.send({
			status: "success",
			data: {
				album,
			},
		});
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Delete an album

export const destroy = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);
	if (!albumId) {
		res.status(400).send({
			message: "Invalid album ID",
		});
		return;
	}
	try {
		await deleteAlbum(albumId);
		res.status(204).send();
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Add photo or photos to album
export const linkPhotoToAlbum = async (
	req: Request<{ photoId: string }, unknown, AlbumId | AlbumId[]>,
	res: Response,
) => {
	const albumId = Number(req.params.albumId);

	try {
		const result = await prisma.album.update({
			where: {
				id: albumId,
			},
			data: {
				photos: {
					connect: req.body,
				},
			},
			include: {
				photos: true,
			},
		});

		res.send(result);
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Connect an album to a user
export const connectAlbumToUser = async (req: Request, res: Response) => {
	const userId = Number(req.params.userId);

	try {
		const result = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				albums: {
					connect: req.body,
				},
			},
			include: {
				albums: true,
			},
		});

		res.send(result);
	} catch (error) {
		handlePrismaError(res, error);
	}
};

// Disconnect album from user
export const disconnectAlbumFromUser = async (req: Request, res: Response) => {
	const userId = Number(req.params.userId);

	try {
		const result = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				albums: {
					disconnect: req.body,
				},
			},
			include: {
				albums: true,
			},
		});

		res.send(result);
	} catch (error) {
		handlePrismaError(res, error);
	}
};
