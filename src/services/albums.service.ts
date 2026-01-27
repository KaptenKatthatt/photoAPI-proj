/**
 * Album services
 */

import { prisma } from "../lib/prisma.ts";

/**
 * Get all albums
 */
export const getAlbums = async () => {
	return await prisma.album.findMany();
};

/**
 * Get a single album
 */
export const getAlbum = async (albumId: number) => {
	return await prisma.album.findUniqueOrThrow({
		where: {
			id: albumId,
		},
		include: {
			user: true,
		},
	});
};

/**
 * Create an album
 *
 * @param data Album data
 */
export const createAlbum = async (validatedData: CreateAlbumData) => {
	return await prisma.album.create({
		data: validatedData,
	});
};

/**
 * Update a book
 *
 * @param bookId The ID of the Book to update
 * @param data Book data
 * @returns
 */
export const updateBook = async (bookId: number, validatedData: UpdateBookData) => {
	return await prisma.book.update({
		where: {
			id: bookId,
		},
		data: validatedData,
	});
};

/**
 * Delete a book
 *
 * @param bookId The ID of the Book to delete
 */
export const deleteBook = async (bookId: number) => {
	prisma.book.delete({
		where: {
			id: bookId,
		},
	});
};

/**
 * Link author(s) to book
 *
 * @param bookId The ID of the Book
 * @param authorIdOrIds The ID(s) of the Author(s)
 */
export const addAuthorToBook = (bookId: number, authorIdOrIds: AuthorId | AuthorId[]) => {
	return prisma.book.update({
		where: {
			id: bookId,
		},
		data: {
			authors: {
				connect: authorIdOrIds, // { "id": 9 } OR [{"id": 10}, {"id":11}]
			},
		},
		include: {
			authors: true,
		},
	});
};

/**
 * Unlink author from book
 *
 * @param bookId
 * @param authorId
 * @returns
 */
export const removeAuthorFromBook = (authorId: number, bookId: number) => {
	return prisma.book.update({
		where: {
			id: bookId,
		},
		data: {
			authors: {
				disconnect: {
					id: authorId,
				},
			},
		},
		include: {
			authors: true,
		},
	});
};

/**
 * COMPLICATED VERSION
 * Get all books that are connected to the specified user
 *
 * @param userId User ID
 */
export const getBooksByUserId = (userId: number) => {
	return prisma.book.findMany({
		where: {
			users: {
				some: {
					id: userId,
				},
			},
		},
	});
};
