/**
 * Album services
 */

import { prisma } from "../lib/prisma.ts";
import { CreateAlbumData, type UpdateAlbumData } from "../types/Album.types.ts";

/**
 * Get all albums
 */
export const getAlbums = async () => {
	return await prisma.album.findMany();
};

/**
 * Get a single album
 */
export const getAlbum = async (albumId: number) => {
	return await prisma.album.findUniqueOrThrow({
		where: {
			id: albumId,
		},
		include: {
			user: true,
		},
	});
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

// Add photo to album
export const addPhotoToAlbum = async (albumId: number, photoId: number) => {
	return await prisma.album.update({
		where: {
			id: albumId,
		},
		data: {
			photos: {
				connect: {
					id: photoId,
				},
			},
		},
		include: {
			photos: true,
		},
	});
};
