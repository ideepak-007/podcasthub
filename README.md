---

## 🚀 Getting Started

### Prerequisites
- Node.js v22+
- Docker Desktop
- NestJS CLI (`npm install -g @nestjs/cli`)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/podcasthub.git
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

- [x] Project setup & Docker
- [x] Database schema & migrations
- [ ] Authentication (JWT)
- [ ] Users module
- [ ] Podcasts module
- [ ] Episodes module + audio upload
- [ ] Comments & likes
- [ ] Search & pagination
- [ ] Real-time notifications
- [ ] Frontend (Next.js)
- [ ] Testing
- [ ] Deployment

---

## 👨‍💻 Author

**Deepak** — [github.com/yourusername](https://github.com/yourusername)

---

## 📄 License

MIT