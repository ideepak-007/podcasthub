# 🔐 Authentication Module — How It Works

This document explains the complete authentication flow implemented in PodcastHub using NestJS, JWT, Passport and bcrypt.

---

## 📦 Packages Used

| Package | Purpose |
|---|---|
| `@nestjs/jwt` | Generate and verify JWT tokens |
| `@nestjs/passport` | Passport integration for NestJS |
| `passport` | Authentication middleware |
| `passport-jwt` | JWT strategy for Passport |
| `passport-local` | Local (email/password) strategy for Passport |
| `bcrypt` | Password hashing |
| `class-validator` | DTO validation decorators |
| `class-transformer` | Transform request body to DTO class |
| `@nestjs/config` | Access environment variables |

---

## 🏗️ File Structure

    src/auth/
    ├── dto/
    │   ├── register.dto.ts       # Rules for register request body
    │   └── login.dto.ts          # Rules for login request body
    ├── strategies/
    │   ├── jwt.strategy.ts       # Validates JWT token on protected routes
    │   └── local.strategy.ts     # Validates email/password on login
    ├── auth.controller.ts        # Route definitions
    ├── auth.service.ts           # Business logic
    └── auth.module.ts            # Wires everything together

---

## 🔄 The Complete Request Journey

### Register Request

    POST /auth/register
    { name, email, password }
            ↓
    ValidationPipe checks RegisterDto rules
            ↓
    AuthController.register() called
            ↓
    AuthService.register() called
            ↓
    Check email not duplicate (Prisma)
            ↓
    bcrypt.hash(password, 10)
            ↓
    prisma.user.create()
            ↓
    jwtService.sign(payload)
            ↓
    Return { user, accessToken }

### Login Request

    POST /auth/login
    { email, password }
            ↓
    ValidationPipe checks LoginDto rules
            ↓
    AuthController.login() called
            ↓
    AuthService.login() called
            ↓
    AuthService.validateUser()
            ↓
    Find user by email (Prisma)
            ↓
    bcrypt.compare(password, hashedPassword)
            ↓
    jwtService.sign(payload)
            ↓
    Return { user, accessToken }

### Protected Route Request (future)

    GET /users/me
    Authorization: Bearer <token>
            ↓
    JwtStrategy extracts token from header
            ↓
    Verifies token with JWT_SECRET
            ↓
    Decodes payload → { id, email, role }
            ↓
    Attaches to request.user
            ↓
    Controller receives request.user

---

## 📋 DTOs — Data Transfer Objects

DTOs define the **shape and validation rules** of incoming request data.

```typescript
export class RegisterDto {
  @IsString()
  name!: string;        // must be a string

  @IsEmail()
  email!: string;       // must be valid email format

  @IsString()
  @MinLength(6)
  password!: string;    // must be string, min 6 characters

  @IsOptional()
  @IsEnum(Role)
  role?: Role;          // optional, must be ADMIN | CREATOR | LISTENER
}
```

If validation fails, NestJS automatically returns a 400 error:

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

The controller code **never runs** if validation fails. This is handled globally in `main.ts`:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,            // strips unknown fields from body
    forbidNonWhitelisted: true, // throws error if unknown fields sent
    transform: true,            // auto converts types (string → number etc)
  }),
);
```

---

## 🔑 JWT — JSON Web Token

### What is a JWT?

A JWT is a self-contained token that carries user information. It has 3 parts separated by dots:

    eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
    ──────────────────── ─────────────────── ───────────────────────────────────────────────
           Header               Payload                       Signature

- **Header** — algorithm used (HS256)
- **Payload** — user data (id, email, role)
- **Signature** — verifies the token wasn't tampered with

### What goes inside our JWT payload?

```typescript
const payload = {
  sub: user.id,      // sub = subject (standard JWT claim = user id)
  email: user.email,
  role: user.role,
};
```

### How the token is verified on protected routes

```typescript
// Client sends:
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...

// JwtStrategy extracts and verifies:
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
secretOrKey: JWT_SECRET  // same secret used to sign = used to verify
```

---

## 🔒 Password Hashing with bcrypt

**Never store plain text passwords.** bcrypt hashes passwords with a salt:

```typescript
// Hashing (register)
bcrypt.hash("123456", 10)
// → "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHHO"

// Comparing (login)
bcrypt.compare("123456", hashedPassword)
// → true or false
```

### Why salt rounds = 10?

| Salt Rounds | Time to hash | Security |
|---|---|---|
| 8 | ~40ms | Good |
| 10 | ~100ms | Recommended |
| 12 | ~400ms | High |
| 14 | ~1.5s | Very High |

- 10 is the industry standard — good balance of security vs speed
- Even if the database is leaked, attacker cannot reverse the hash
- `bcrypt.compare()` rehashes and compares — it never decrypts

---

## 🛡️ Passport Strategies

### LocalStrategy — Email/Password Validation

Used when user logs in with email and password:

```typescript
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // use email instead of username
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    return user; // attached to request.user
  }
}
```

### JwtStrategy — Token Validation on Protected Routes

Used on every protected route to verify the JWT token:

```typescript
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET')!,
    });
  }

  async validate(payload: any) {
    // payload = decoded JWT data
    return { id: payload.sub, email: payload.email, role: payload.role };
    // this gets attached to request.user on every protected route
  }
}
```

---

## 🔌 AuthModule — Wiring Everything Together

```typescript
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')!,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],  // registers /auth routes
  providers: [
    AuthService,     // business logic
    JwtStrategy,     // JWT validation
    LocalStrategy,   // email/password validation
  ],
  exports: [AuthService], // share AuthService with other modules
})
export class AuthModule {}
```

---

## 🔮 What's Next — Guards

In the next step we will create a `JwtAuthGuard` that uses `JwtStrategy` to protect routes:

```typescript
// How it will be used on protected routes:
@Get('me')
@UseGuards(JwtAuthGuard)  // ← protects this route
getMe(@Request() req) {
  return req.user; // { id, email, role } from JwtStrategy.validate()
}
```

Any request without a valid JWT token will automatically get a 401 Unauthorized response.

---

## 📝 Key Concepts Summary

| Concept | What it does |
|---|---|
| DTO | Defines and validates shape of request data |
| ValidationPipe | Enforces DTO rules globally before hitting controller |
| bcrypt | Hashes passwords so they can never be reversed |
| JWT | Self-contained token carrying user identity |
| LocalStrategy | Validates email + password combination |
| JwtStrategy | Validates JWT token on protected routes |
| AuthModule | Wires all auth pieces together |