import express from "express";
import { photosRouter } from "./photos.router.ts";
import { albumsRouter } from "./albums.router.ts";
import { profileRouter } from "./profile.router.ts";
import { authRouter } from "./auth.router.ts";

// Create a Root router
export const rootRouter = express.Router();

/**
 * GET /
 */
rootRouter.get("/", (_req, res) => {
	res.status(200).send({
		status: "success",
		message: "Welcome to the Prisma Photos API! BEEP BOPBOPBOP",
	});
});

// Photos router
rootRouter.use("/photos", photosRouter);

// //Albums router
rootRouter.use("/albums", albumsRouter);

// Profile router
rootRouter.use("/profile", profileRouter);

// Auth router
rootRouter.use(authRouter);
