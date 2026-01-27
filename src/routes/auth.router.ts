import express from "express";
import { create } from "lodash";
import { createUserRules } from "../rules/user.rules.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { register } from "node:module";

export const authRouter = express.Router();

/**
 * POST /register
 *
 * Register a new user
 */
authRouter.post("/register", createUserRules, validateRequest, registerUser);
