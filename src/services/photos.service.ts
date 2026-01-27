import { prisma } from "../lib/prisma.ts";

export const getPhotos = async () => {
	return await prisma.photo.findMany();
};
