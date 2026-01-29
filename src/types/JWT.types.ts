export interface JWTAccessTokenPayload {
	sub: string; // User ID
	firstName: string;
	lastName: string;
	email: string;
}

export interface JWTRefreshTokenPayload {
	sub: string; // User ID
}
