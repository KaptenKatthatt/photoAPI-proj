import { checkIfValidRequest } from "../lib/errorHandlers/checkIfValidRequest.ts";
import { prisma } from "../lib/prisma.ts";
import type { CreatePhotoData, UpdatePhotoData } from "../types/Photo.types.ts";

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
