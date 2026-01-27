import { prisma } from "../lib/prisma.ts";

export const getPhotos = async () => {
	return await prisma.photo.findMany();
};

export const getPhoto = async (photoId: number) => {
	return await prisma.photo.findUniqueOrThrow({
		where: { id: photoId },
		include: { albums: true },
	});
};
