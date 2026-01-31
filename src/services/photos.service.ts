import { checkIfValidRequest } from "../lib/errorHandlers/checkIfValidRequest.ts";
import { prisma } from "../lib/prisma.ts";
import type { CreatePhotoData, PhotoId, UpdatePhotoData } from "../types/Photo.types.ts";

// Get all photos of logged in user
export const getPhotos = async (userId: number) => {
	return await prisma.photo.findMany({
		where: { user_id: userId },
		select: {
			id: true,
			title: true,
			url: true,
			comment: true,
		},
	});
};

// Get a single photo by ID
export const getPhoto = async (photoId: number, userId: number) => {
	const photo = await checkIfValidRequest(photoId, userId);
	return {
		id: photo.id,
		title: photo.title,
		url: photo.url,
		comment: photo.comment,
	};
};

// Publish a new photo
export const createPhoto = async (validatedData: CreatePhotoData, userId: number) => {
	return await prisma.photo.create({
		data: { ...validatedData, user_id: userId },
	});
};

/**
 * Update a photo
 *
 * @param photoId The ID of the Photo to update
 * @param data Photo data
 * @returns
 */
export const updatePhoto = async (
	photoId: number,
	validatedData: UpdatePhotoData,
	userId: number,
) => {
	await checkIfValidRequest(photoId, userId);

	return await prisma.photo.update({
		where: { id: photoId, user_id: userId },
		data: validatedData,
	});
};

/**
 * Delete a photo and all its connections to albums
 */

export const deletePhoto = async (photoId: number, userId: number) => {
	return await prisma.photo.deleteMany({
		where: { id: photoId, user_id: userId },
	});
};

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
	// If not the same amount of photos is found as we are trying to add, throw an error
	if (photos.length !== photoIds.length) {
		throw new Error("One or more photos not found or do not belong to you");
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

// Disconnect one or many photos from an album
export const removePhotoFromAlbum = async (
	albumId: number,
	userId: number,
	photoIdOrIds: PhotoId | PhotoId[],
) => {
	return await prisma.album.update({
		where: {
			id: albumId,
			user_id: userId,
		},
		data: {
			photos: {
				disconnect: photoIdOrIds,
			},
		},
		include: {
			photos: true,
		},
	});
};
