import cors from "cors";
import express from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { rootRouter } from "./routes/root.router.ts";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Serve static files from public/
app.use(express.static(path.join(process.cwd(), "public")));

// Use dem routes
app.use(rootRouter);

/**
 * Catch-all route 🛟
 */
app.use((req, res) => {
	res.status(404).send({ status: "error", message: `Cannot ${req.method} ${req.path}` });
});

export default app;
