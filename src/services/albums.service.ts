/**
 * Album services
 */

import { prisma } from "../lib/prisma.ts";
import { CreateAlbumData, type UpdateAlbumData } from "../types/Album.types.ts";

/**
 * Get all albums of logged in user
 */
export const getAlbums = async (userId: number) => {
	return await prisma.album.findMany({
		where: {
			user_id: userId,
		},
		select: {
			id: true,
			title: true,
			user_id: true,
		},
	});
};

/**
 * Get a single album
 */
export const getAlbum = async (albumId: number, userId: number) => {
	return await prisma.album.findUniqueOrThrow({
		where: {
			id: albumId,
			user_id: userId,
		},
		select: {
			id: true,
			title: true,
			user_id: true,
		},
	});
};

/**
 * Create an album
 *
 * @param data Album data
 */
export const createAlbum = async (validatedData: CreateAlbumData, userId: number) => {
	return await prisma.album.create({
		data: {
			...validatedData,
			user_id: userId,
		},
	});
};

/**
 * Update an album
 *
 * @param albumId The ID of the Album to update
 * @param data Album data
 * @returns
 */
export const updateAlbum = async (
	albumId: number,
	validatedData: UpdateAlbumData,
	userId: number,
) => {
	return await prisma.album.update({
		where: {
			id: albumId,
			user_id: userId,
		},
		data: validatedData,
	});
};

/**
 * Delete an album
 *
 * @param albumId The ID of the Album to delete
 */
export const deleteAlbum = async (albumId: number, userId: number) => {
	return await prisma.album.delete({
		where: {
			id: albumId,
			user_id: userId,
		},
	});
};
