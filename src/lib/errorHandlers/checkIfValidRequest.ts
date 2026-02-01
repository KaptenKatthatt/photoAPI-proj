import { prisma } from "../prisma.ts";

/**
 *
 * Validates if the user trying to access photo is the owner of the photo.
 *
 * @param photoId
 * @param userId
 * @returns
 */
export const checkIfValidRequest = async (photoId: number, userId: number) => {
	const photo = await prisma.photo.findUnique({
		where: {
			id: photoId,
		},
	});

	if (!photo) {
		throw new Error("PHOTO_NOT_FOUND");
	}
	if (photo.user_id !== userId) {
		throw new Error("FORBIDDEN");
	}

	return photo;
};
