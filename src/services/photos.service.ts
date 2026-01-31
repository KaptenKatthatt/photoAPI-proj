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
	return await prisma.photo.findUniqueOrThrow({
		where: { id: photoId, user_id: userId },
		select: {
			id: true,
			title: true,
			url: true,
			comment: true,
		},
	});
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
	return await prisma.photo.update({
		where: { id: photoId, user_id: userId },
		data: validatedData,
	});
};

/**
 * Delete a photo
 *
 * @param photoId The ID of the Photo to delete
 */

export const deletePhoto = async (photoId: number, userId: number) => {
	return await prisma.photo.delete({
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
