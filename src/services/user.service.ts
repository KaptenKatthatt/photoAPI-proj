import { prisma } from "../lib/prisma.ts";
import type { CreateUserData, UpdateUserData } from "../types/User.types.ts";

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

// Delete a user
export const deleteUser = async (userId: number) => {
	return prisma.user.delete({
		where: { id: userId },
	});
};

// Check if email already exists
export const validateEmailDoesNotExist = async (value: string) => {
	const user = await getUserByEmail(value);
	// If a user with that email was found, throw an error
	if (user) {
		throw new Error("Email already exists");
	}
};

// Check if email exists (used for login)
export const validateEmailExists = async (value: string) => {
	const user = await getUserByEmail(value);
	// If no user with that email was found, throw an error
	if (!user) {
		throw new Error("Email does not exist");
	}
};

// Update user profile
export const updateUserProfile = async (userId: number, data: UpdateUserData) => {
	return prisma.user.update({
		where: { id: userId },
		data,
	});
};
