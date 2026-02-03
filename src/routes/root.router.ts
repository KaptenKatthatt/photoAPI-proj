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
		data: {
			message:
				"Cat: We're all mad here. I'm mad. You're mad. \nHow do you know I'm mad? said Alice. \nYou must be, said the Cat, or you wouldn't have come here..., https://www.youtube.com/watch?v=fhmgbLI9CyE",
		},
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
