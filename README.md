# 🎙️ PodcastHub

A full-stack podcast platform built with NestJS and Next.js where creators can upload and manage podcasts, and listeners can discover, subscribe and enjoy content.

---

## 🏗️ Tech Stack

### Backend
- **NestJS** — Node.js framework
- **PostgreSQL** — Primary database
- **Prisma** — ORM
- **Redis** — Caching and queues
- **JWT** — Authentication
- **Bull** — Background job processing
- **Socket.io** — Real-time notifications

### Frontend
- **Next.js 15** — React framework with SSR/SSG
- **Tailwind CSS** — Styling
- **React Query** — Data fetching and caching
- **NextAuth** — Authentication

### DevOps
- **Docker** — Containerization
- **Docker Compose** — Local development
- **GitHub Actions** — CI/CD (coming soon)

---

## 📁 Project Structure

    podcasthub/
    ├── backend/                  # NestJS API
    │   ├── prisma/
    │   │   ├── schema.prisma     # Database schema
    │   │   └── migrations/       # Database migrations
    │   └── src/
    │       ├── auth/             # Authentication (register, login, JWT)
    │       ├── users/            # User management
    │       ├── podcasts/         # Podcast CRUD
    │       ├── episodes/         # Episode management and audio upload
    │       ├── comments/         # Comments and ratings
    │       ├── notifications/    # Email and real-time notifications
    │       ├── prisma/           # Prisma service and module
    │       └── common/           # Shared utilities
    │           ├── decorators/   # Custom decorators
    │           ├── filters/      # Exception filters
    │           ├── guards/       # Auth and role guards
    │           ├── interceptors/ # Response interceptors
    │           ├── pipes/        # Validation pipes
    │           └── dto/          # Shared DTOs
    ├── frontend/                 # Next.js App
    │   └── src/
    │       └── app/
    │           ├── (auth)/       # Login, register pages
    │           ├── podcasts/     # Browse and podcast detail
    │           ├── dashboard/    # Creator dashboard
    │           └── profile/      # User profile
    ├── docker-compose.yml        # PostgreSQL and Redis
    ├── .env                      # Root environment variables
    └── README.md

---

## 🗄️ Database Schema

    User
     ├── id (UUID)
     ├── email (unique)
     ├── password (hashed)
     ├── name
     ├── role (ADMIN | CREATOR | LISTENER)
     ├── avatar
     └── bio

    Podcast
     ├── id (UUID)
     ├── title
     ├── description
     ├── thumbnail
     └── creatorId → User

    Episode
     ├── id (UUID)
     ├── title
     ├── description
     ├── audioUrl
     ├── duration
     └── podcastId → Podcast

    Comment
     ├── id (UUID)
     ├── content
     ├── userId → User
     └── episodeId → Episode

    Like
     ├── id (UUID)
     ├── userId → User
     └── episodeId → Episode

---

## 🚀 Getting Started

### Prerequisites
- Node.js v22+
- Docker Desktop
- NestJS CLI (`npm install -g @nestjs/cli`)

### 1. Clone the repository

```bash
git clone https://github.com/ideepak-007/podcasthub.git
cd podcasthub
```

### 2. Start the database

```bash
docker compose up -d
```

### 3. Set up the backend

```bash
cd backend
cp ../.env .env
npm install
npx prisma migrate dev
npm run start:dev
```

### 4. Set up the frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 5. Access the apps

| Service | URL |
|---|---|
| Backend API | http://localhost:3001 |
| Frontend | http://localhost:3000 |
| Prisma Studio | http://localhost:5555 |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/refresh` | Refresh JWT token |
| POST | `/auth/logout` | Logout user |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/me` | Get current user |
| PATCH | `/users/me` | Update profile |
| GET | `/users/:id` | Get user by ID |

### Podcasts
| Method | Endpoint | Description |
|---|---|---|
| GET | `/podcasts` | Get all podcasts |
| POST | `/podcasts` | Create podcast |
| GET | `/podcasts/:id` | Get podcast by ID |
| PATCH | `/podcasts/:id` | Update podcast |
| DELETE | `/podcasts/:id` | Delete podcast |

### Episodes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/podcasts/:id/episodes` | Get all episodes |
| POST | `/podcasts/:id/episodes` | Upload episode |
| GET | `/episodes/:id` | Get episode by ID |
| PATCH | `/episodes/:id` | Update episode |
| DELETE | `/episodes/:id` | Delete episode |

### Comments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/episodes/:id/comments` | Get comments |
| POST | `/episodes/:id/comments` | Add comment |
| DELETE | `/comments/:id` | Delete comment |

---

## 🔐 Environment Variables

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/podcasthub"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your-refresh-secret-key"
JWT_REFRESH_EXPIRES_IN="30d"

# App
PORT=3001
NODE_ENV=development

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_REGION=
```

---

## 🛠️ Development

### Run backend in dev mode
```bash
cd backend
npm run start:dev
```

### Run frontend in dev mode
```bash
cd frontend
npm run dev
```

### Open Prisma Studio
```bash
cd backend
npx prisma studio
```

### Create a new migration
```bash
cd backend
npx prisma migrate dev --name your_migration_name
```

---

## 📦 Features

- [x] Project setup and Docker
- [x] Database schema and migrations
- [x] Authentication (JWT)
- [ ] Users module
- [ ] Podcasts module
- [ ] Episodes module and audio upload
- [ ] Comments and likes
- [ ] Search and pagination
- [ ] Real-time notifications
- [ ] Frontend (Next.js)
- [ ] Testing
- [ ] Deployment

---

## 👨‍💻 Author

**Deepak** — [github.com/ideepak-007](https://github.com/ideepak-007)

---

## 📄 License

MIT