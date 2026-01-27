import express from "express";
import { createUserRules } from "../rules/user.rules.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { registerUser } from "../controllers/auth.controller.ts";

export const authRouter = express.Router();

/**
 * POST /register
 *
 * Register a new user
 */
authRouter.post("/", createUserRules, validateRequest, registerUser);

// TODO Create login stuff
/**
 * POST /login
 *
 * Login and authorize user
 */
