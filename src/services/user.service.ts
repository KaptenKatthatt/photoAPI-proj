import { prisma } from "../lib/prisma.ts";

/**
 * Get a User
 *
 * @param id ID of user to get
 */
export const getUser = async (userId: number) => {
	return await prisma.user.findUnique({
		where: { id: userId },
	});
};

/**
 * Get a User by email
 *
 * @param email Email of user to get
 */

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: { email },
	});
};
