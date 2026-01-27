import express from "express";
import { photosRouter } from "./photos.router.ts";
import { albumsRouter } from "./albums.router.ts";

// Create a Root router
export const rootRouter = express.Router();

/**
 * GET /
 */
rootRouter.get("/", (_req, res) => {
	res.send({
		status: "success",
		data: {
			message:
				"But first, let me take a selfie 🤳 https://www.youtube.com/watch?v=kdemFfbS5H0",
		},
	});
});

// Photos router
rootRouter.use("/photos", photosRouter);

// //Albums router
rootRouter.use("/albums", albumsRouter);

// User router

// rootRouter.use("/user", userRouter);

// // Auth router
// rootRouter.use(authRouter);

// // Profile router
// rootRouter.use("/profile", profileRouter);
