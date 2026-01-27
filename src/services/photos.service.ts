import { prisma } from "../lib/prisma.ts";
import type { CreatePhotoData, UpdatePhotoData } from "../types/Photo.types.ts";

// Get all photos
export const getPhotos = async () => {
	return await prisma.photo.findMany();
};

// Get a single photo by ID
export const getPhoto = async (photoId: number) => {
	return await prisma.photo.findUniqueOrThrow({
		where: { id: photoId },
		include: { albums: true },
	});
};

// Publish a new photo
export const createPhoto = async (validatedData: CreatePhotoData) => {
	const { userId, ...data } = validatedData;

	if (!userId) throw new Error("Missing userId");

	return await prisma.photo.create({
		data: { ...data, user: { connect: { id: userId } } },
	});
};

/**
 * Update a photo
 *
 * @param photoId The ID of the Photo to update
 * @param data Photo data
 * @returns
 */
export const updatePhoto = async (photoId: number, validatedData: UpdatePhotoData) => {
	return await prisma.photo.update({
		where: { id: photoId },
		data: validatedData,
	});
};

/**
 * Delete a photo
 *
 * @param photoId The ID of the Photo to delete
 */

export const deletePhoto = async (photoId: number) => {
	prisma.photo.delete({
		where: { id: photoId },
	});
};
