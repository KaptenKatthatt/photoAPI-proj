import { prisma } from "../lib/prisma.ts";
import type { CreatePhotoData, UpdatePhotoData } from "../types/Photo.types.ts";

// Get all photos of logged in user
export const getPhotos = async (userId: number) => {
	const userPhotos = await prisma.user.findUniqueOrThrow({
		select: {
			photos: true,
		},
		where: {
			id: userId,
		},
	});
	return userPhotos.photos;

	// return await prisma.photo.findMany({
	// 	where: {
	// 		userId: userId,
	// 	},
	// });
	// };
};

// Get a single photo by ID
export const getPhoto = async (photoId: number, userId: number) => {
	return await prisma.photo.findUniqueOrThrow({
		where: { id: photoId, userId: userId },
		include: { albums: true },
	});
};

// Publish a new photo
export const createPhoto = async (validatedData: CreatePhotoData, userId: number) => {
	if (userId === null) throw new Error("Missing userId");

	return await prisma.photo.create({
		data: { ...validatedData, user: { connect: { id: userId } } },
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
		where: { id: photoId, userId: userId },
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
		where: { id: photoId, userId: userId },
	});
};
