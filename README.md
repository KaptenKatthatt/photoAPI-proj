# Photo API

A REST API for managing user profiles, photos, and albums.

Built with **Express**, **TypeScript**, **Prisma ORM**, and **MySQL/MariaDB**. Authentication is handled with **JWT access tokens** and **refresh tokens in HTTP-only cookies**.

## Features

- User registration and login
- JWT-based authentication (access + refresh flow)
- Profile endpoints for reading/updating the authenticated user
- CRUD for photos
- CRUD for albums
- Link/unlink photos to albums
- Input validation with `express-validator`

## Tech Stack

- Node.js + Express 5
- TypeScript
- Prisma 7
- MySQL/MariaDB
- JWT (`jsonwebtoken`)

## Project Structure

```text
src/
	controllers/   # Route handlers
	routes/        # API routes
	services/      # Business/data logic
	middlewares/   # Auth, validation, request checks
	rules/         # Validation rules (express-validator)
	lib/           # Prisma client + error handlers
prisma/
	schema.prisma
	migrations/
	seed.ts
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Set up environment variables

```bash
cp .env.example .env
```

Update `.env` with your local database and token secrets.

### 3) Run database migrations

```bash
npx prisma migrate dev
```

### 4) Generate Prisma client (usually done automatically in build)

```bash
npx prisma generate
```

### 5) Start development server

```bash
npm run dev
```

Server starts on `http://localhost:3000` unless `PORT` is set.

## Environment Variables

The project uses layered env loading (`.env`, `.env.local`, `.env.development`, etc.).

Required/important variables:

- `DATABASE_URL`
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_NAME`
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`

Optional (with defaults):

- `PORT` (default: `3000`)
- `SALT_ROUNDS` (default: `10`)
- `ACCESS_TOKEN_LIFETIME` (default in code fallback: `5m`)
- `REFRESH_TOKEN_LIFETIME` (default in code fallback: `1d`)

## NPM Scripts

- `npm run dev` – Start dev server with watch mode
- `npm run debug` – Start dev server with debug namespace enabled
- `npm run build` – Generate Prisma client + build TypeScript to `dist/`
- `npm start` – Run compiled server from `dist/server.js`
- `npm run lint` – Run ESLint
- `npm run typecheck` – TypeScript type check
- `npm run type-coverage` – Enforce type coverage threshold
- `npm run check` – Run lint + typecheck + type coverage
- `npm run pre-deploy` – Run migrations and seed before deployment

## Authentication

1. `POST /register` to create a user
2. `POST /login` with email/password
3. API returns an `access_token` in response body
4. API sets `refresh_token` as HTTP-only cookie (path: `/refresh`)
5. Send access token as:

```http
Authorization: Bearer <access_token>
```

6. When access token expires, call `POST /refresh` to get a new one

## API Endpoints

### Public

- `GET /` – Health/welcome endpoint
- `POST /register` – Register user
- `POST /login` – Login user
- `POST /refresh` – Issue a new access token via refresh cookie

### Profile (authenticated)

- `GET /profile` – Get current user profile
- `PATCH /profile` – Update profile (`first_name`, `last_name`, `email`, `password`)

### Photos (authenticated)

- `GET /photos` – List logged-in user's photos
- `GET /photos/:photoId` – Get one photo
- `POST /photos` – Create photo
- `PATCH /photos/:photoId` – Update photo
- `DELETE /photos/:photoId` – Delete photo

Photo payload example:

```json
{
  "title": "Sunset",
  "url": "https://example.com/image.jpg",
  "comment": "Optional comment"
}
```

### Albums (authenticated)

- `GET /albums` – List logged-in user's albums
- `GET /albums/:albumId` – Get one album
- `POST /albums` – Create album
- `PATCH /albums/:albumId` – Update album
- `DELETE /albums/:albumId` – Delete album
- `POST /albums/:albumId/photos` – Link photos to album
- `DELETE /albums/:albumId/photos/:photoId` – Unlink photo from album

Link photos request body example:

```json
[{ "id": 1 }, { "id": 2 }]
```

## Data Model (Prisma)

- `User` has many `Photo`
- `User` has many `Album`
- `Album` has many `Photo`
- `Photo` can belong to multiple albums

## Production Notes

- Set strong random values for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`
- Use secure database credentials
- Run:

```bash
npm run build
npm start
```
