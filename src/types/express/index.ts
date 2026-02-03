/* eslint-disable @typescript-eslint/no-namespace */

import type { User } from "../../../generated/prisma/client.ts";
import { JWTAccessTokenPayload } from "../JWT.types.ts";

// JWT
declare global {
	namespace Express {
		export interface Request {
			token?: JWTAccessTokenPayload;
			userId: number;
			user?: User;
		}
	}
}
