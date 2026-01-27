import { Request, Response } from "express"
/**
 * Auth Controller
 */


/**
 * Register a User
 */
export const registerUser = async (req: Request, res: Response) => {

	const validatedData = matchedData<CreateUserData>(req);
