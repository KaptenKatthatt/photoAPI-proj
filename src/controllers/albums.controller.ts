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
import { CreateAlbumData, type UpdateAlbumData } from "../types/Album.types.ts";

// Get all albums
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

// Get a single album
export const show = async (req: Request, res: Response) => {
	const albumId = Number(req.params.albumId);
	if (!albumId) {
		res.status(400).send({
			status: "error",
			message: "Invalid album ID",
		});
		return;
	}
	try {
		const album = await getAlbum(albumId);
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

	try {
		const album = await createAlbum(validatedData);
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

// Connect album to user

// Disconnect album from user
