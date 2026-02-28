/**
 * Album services
 */

import { prisma } from "../lib/prisma.ts";
import { CreateAlbumData, type UpdateAlbumData } from "../types/Album.types.ts";
import type { PhotoId } from "../types/Photo.types.ts";

/**
 * Connect one or many photos to an album
 */
export const addPhotoToAlbum = async (
	albumId: number,
	userId: number,
	photoIdOrIds: PhotoId | PhotoId[],
) => {
	// Check if incoming photos is many(array) or a single photo
	const photoIds = Array.isArray(photoIdOrIds)
		? photoIdOrIds.map((photo) => photo.id)
		: [photoIdOrIds.id];

	const photos = await prisma.photo.findMany({
		where: {
			id: { in: photoIds },
			user_id: userId,
		},
	});
	// If not the same amount of photos is found as we are trying to add, throw an error but don't specify what photo is missing because of security reasons.
	if (photos.length !== photoIds.length) {
		throw new Error("PHOTO_NOT_FOUND");
	}

	return await prisma.album.update({
		where: {
			id: albumId,
			user_id: userId,
		},
		data: {
			photos: {
				connect: photoIdOrIds,
			},
		},
		include: {
			photos: true,
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
			photos: true,
		},
	});
};

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

// Disconnect one photo from an album
export const removePhotoFromAlbum = async (albumId: number, userId: number, photoId: number) => {
	return await prisma.album.update({
		where: {
			id: albumId,
			user_id: userId,
		},
		data: {
			photos: {
				disconnect: { id: photoId },
			},
		},
		include: {
			photos: true,
		},
	});
};

/**
 * Update an album
 *
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
