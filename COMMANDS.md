# 📋 PodcastHub — Command Reference

A running log of all commands used in this project for reference and onboarding.

---

## 🐳 Docker

```bash
# Start all containers (PostgreSQL + Redis)
docker compose up -d

# Stop all containers
docker compose down

# View running containers
docker ps

# View container logs
docker logs podcasthub_db
docker logs podcasthub_redis

# Remove containers and volumes (fresh start)
docker compose down -v
```

---

## 🗄️ Prisma

```bash
# Initialize Prisma
npx prisma init

# Run migrations (development)
npx prisma migrate dev --name migration_name

# Run migrations (production)
npx prisma migrate deploy

# Reset database (wipes all data)
npx prisma migrate reset

# Pull schema from existing database
npx prisma db pull

# Push schema without migration (prototyping)
npx prisma db push

# Open Prisma Studio (visual DB browser)
npx prisma studio

# Generate Prisma client after schema changes
npx prisma generate

# Format schema file
npx prisma format
```

---

## 🚀 Backend (NestJS)

```bash
# Start in development mode (watch)
npm run start:dev

# Start in production mode
npm run start:prod

# Build the project
npm run build

# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov

# Lint the code
npm run lint

# Format the code
npm run format
```

### NestJS CLI — Code Generation

```bash
# Generate a full resource (CRUD)
nest g resource <name>

# Generate a module
nest g module <name>

# Generate a controller
nest g controller <name>

# Generate a service
nest g service <name>

# Generate a guard
nest g guard <name>

# Generate a middleware
nest g middleware <name>

# Generate an interceptor
nest g interceptor <name>

# Generate a pipe
nest g pipe <name>

# Generate a decorator
nest g decorator <name>

# Generate a filter
nest g filter <name>
```

---

## 🎨 Frontend (Next.js)

```bash
# Start in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint the code
npm run lint
```

---

## 📦 Packages Installed

### Backend

```bash
# Core
npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local
npm install -D @types/passport-jwt @types/passport-local
npm install bcrypt
npm install -D @types/bcrypt
npm install @nestjs/config

# Prisma
npm install prisma@6 --save-dev
npm install @prisma/client@6

# Validation
npm install class-validator class-transformer

# (Coming soon)
# npm install @nestjs/bull bull
# npm install @nestjs/websockets @nestjs/platform-socket.io
# npm install @aws-sdk/client-s3
# npm install nodemailer @nestjs-modules/mailer
```

### Frontend

```bash
# (Coming soon)
# npm install @tanstack/react-query axios
# npm install next-auth
# npm install react-hook-form zod @hookform/resolvers
```

---

## 🔧 Git

```bash
# Initial setup
git init
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Daily workflow
git status
git add .
git commit -m "type: description"
git push

# Branching
git checkout -b feature/auth
git checkout master
git merge feature/auth

# Remote
git remote add origin https://github.com/username/podcasthub.git
git remote set-url origin https://username@github.com/username/podcasthub.git
git push -u origin master
```

### Commit Message Convention
```
feat: add user authentication
fix: resolve JWT token expiry issue
chore: update dependencies
docs: update README
refactor: restructure auth module
test: add unit tests for auth service
style: format code with prettier
```

---

## 🌱 Environment Setup (Fresh Clone)

```bash
# 1. Clone the repo
git clone https://github.com/ideepak-007/podcasthub.git
cd podcasthub

# 2. Start database
docker compose up -d

# 3. Setup backend
cd backend
cp ../.env .env
npm install
npx prisma migrate dev
npm run start:dev

# 4. Setup frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

## 🔍 Useful One-liners

```bash
# Check what's running on a port
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Kill a process on a port
kill -9 $(lsof -t -i:3000)

# View backend logs in real time
tail -f ~/imapsync.log

# Check Node version
node -v

# Check npm version
npm -v

# Check NestJS CLI version
nest -v
```