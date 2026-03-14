import bcrypt from "bcrypt";

import { prisma } from "../lib/prisma.ts";
import type { CreateUserData, UpdateUserData } from "../types/User.types.ts";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

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

// Create a User
export const createUser = async (data: CreateUserData) => {
	return prisma.user.create({
		data,
	});
};

/**
 * Find a user by email
 */
export const getUserByEmail = async (email: string, user_id?: number) => {
	return prisma.user.findUnique({
		where: {
			email,
			...(user_id ? { NOT: { id: user_id } } : {}),
		},
	});
};

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, SALT_ROUNDS);
};

// Check if email already exists
export const validateEmailDoesNotExist = async (value: string, user_id?: number) => {
	// If a user with that email was found, throw an error
	const user = await getUserByEmail(value, user_id);
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
