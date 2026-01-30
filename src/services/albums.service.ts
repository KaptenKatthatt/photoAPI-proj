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
			userId: userId,
		},
	});
};

/**
 * Get a single album
 */
export const getAlbum = async (albumId: number, userId: number) => {
	const result = await prisma.album.findUniqueOrThrow({
		where: {
			id: albumId,
			userId: userId,
		},
		include: {
			user: true,
			photos: true,
		},
	});
	return result;
};

/**
 * Create an album
 *
 * @param data Album data
 */
export const createAlbum = async (validatedData: CreateAlbumData) => {
	return await prisma.album.create({
		data: validatedData,
	});
};

/**
 * Update a book
 *
 * @param bookId The ID of the Book to update
 * @param data Book data
 * @returns
 */
export const updateAlbum = async (albumId: number, validatedData: UpdateAlbumData) => {
	return await prisma.album.update({
		where: {
			id: albumId,
		},
		data: validatedData,
	});
};

/**
 * Delete an album
 *
 * @param albumId The ID of the Album to delete
 */
export const deleteAlbum = async (albumId: number) => {
	prisma.album.delete({
		where: {
			id: albumId,
		},
	});
};
