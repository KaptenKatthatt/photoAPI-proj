/* eslint-disable @typescript-eslint/no-namespace */
import { JWTAccessTokenPayload } from "../JWT.types.ts";

// JWT
declare global {
	namespace Express {
		export interface Request {
			token?: JWTAccessTokenPayload;
		}
	}
}
