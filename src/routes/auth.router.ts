import express from "express";
import { createUserRules } from "../rules/user.rules.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { loginUser, refreshAccessToken, registerUser } from "../controllers/auth.controller.ts";
import { loginRules } from "../rules/auth.rules.ts";

export const authRouter = express.Router();

/**
 * POST /register
 *
 * Register a new user
 */
authRouter.post("/register", createUserRules, validateRequest, registerUser);

/**
 * POST /login
 *
 * Login and authorize user
 */
authRouter.post("/login", loginRules, validateRequest, loginUser);

/**
 * POST /refresh
 *
 * Issue a new access token using refresh token
 */
authRouter.post("/refresh", refreshAccessToken);
