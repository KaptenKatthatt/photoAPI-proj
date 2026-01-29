import { prisma } from "../lib/prisma.ts";
import type { CreateUserData } from "../types/User.types.ts";

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

// Get all users
export const getUsers = () => {
	return prisma.user.findMany();
};

// Create a User
export const createUser = async (data: CreateUserData) => {
	return prisma.user.create({
		data,
	});
};

/**
 * Find a user by email
 */
export const getUserByEmail = async (email: string) => {
	return prisma.user.findUnique({
		where: { email },
	});
};
