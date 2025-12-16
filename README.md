# Podverse Backend

Node.js + Express + MongoDB backend for the Podverse podcast library.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install MongoDB locally or use MongoDB Atlas

3. Update `.env` file with your MongoDB connection string

4. Seed the database:
```bash
node seedData.js
```

5. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Podcasts
- `GET /api/podcasts` - Get all podcasts (with search/filter)
- `GET /api/podcasts/:id` - Get single podcast
- `POST /api/podcasts` - Create podcast (auth required)

### Users
- `GET /api/users/favorites` - Get user favorites (auth required)
- `POST /api/users/favorites/:podcastId` - Add to favorites (auth required)
- `DELETE /api/users/favorites/:podcastId` - Remove from favorites (auth required)

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/podverse
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```