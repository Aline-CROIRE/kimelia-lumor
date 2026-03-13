<div align="center">

<br/>

```
 ██╗  ██╗██╗███╗   ███╗███████╗██╗     ██╗ █████╗
 ██║ ██╔╝██║████╗ ████║██╔════╝██║     ██║██╔══██╗
 █████╔╝ ██║██╔████╔██║█████╗  ██║     ██║███████║
 ██╔═██╗ ██║██║╚██╔╝██║██╔══╝  ██║     ██║██╔══██║
 ██║  ██╗██║██║ ╚═╝ ██║███████╗███████╗██║██║  ██║
 ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═╝
                                            LUMORA
```

**AI-Powered Learning Platform**

<br/>

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=flat-square&logo=flutter&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-1.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-6366f1?style=flat-square)

<br/>

</div>

---

Kimelia Lumora is a full-stack learning management system that integrates Google Gemini AI directly into the learning loop — providing real-time tutoring, automated grading, and adaptive study paths across multiple languages.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)

---

## Overview

Traditional LMS platforms treat AI as a layer on top. Kimelia Lumora treats it as infrastructure. Every student interaction — asking a question, submitting an assignment, requesting a hint — routes through an AI reasoning layer before a response is returned.

The system supports three roles: **Admin**, **Instructor**, and **Student**, each with distinct access controls enforced at the route level via role-based middleware.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│           Flutter (Mobile + Web)  ·  Riverpod State         │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS / REST
┌───────────────────────────▼─────────────────────────────────┐
│                        API LAYER                            │
│     Node.js · Express · JWT Auth · Helmet · Rate Limiter    │
│                                                             │
│   /auth    /courses    /assignments    /ai    /leaderboard  │
└──────┬────────────────────────────────────────┬────────────┘
       │                                        │
┌──────▼──────────┐                  ┌──────────▼──────────┐
│   DATA LAYER    │                  │  INTELLIGENCE LAYER  │
│  MongoDB Atlas  │                  │  Google Gemini 1.5   │
│  Mongoose ODM   │                  │  Flash               │
└─────────────────┘                  └──────────────────────┘
```

---

## Features

**AI Mentor**
A context-aware study assistant available 24/7. Supports English, French, and Kinyarwanda. Responds to open-ended questions, explains concepts, and generates targeted hints without giving away answers.

**Smart Grading**
Assignment submissions are evaluated by Gemini against instructor-defined rubrics. Students receive structured feedback immediately — no waiting for manual review.

**Progress & Certificates**
Completion percentages, module streaks, XP accumulation, and a global leaderboard are computed in real time. Certificates are generated server-side and verifiable via unique hash.

**Gamification**
Daily streak tracking, XP rewards, and a live leaderboard encourage consistent study habits without being patronising.

**Security**
JWT-based authentication, Helmet for HTTP header hardening, express-rate-limit on all AI endpoints, and input sanitisation against XSS and NoSQL injection.

---

## Project Structure

```
kimelia-lumora/
│
├── backend/
│   ├── src/
│   │   ├── config/           # DB connection, environment
│   │   ├── controllers/      # Request/response handlers
│   │   ├── middleware/       # Auth, RBAC, rate limit, XSS
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # Express route definitions
│   │   └── services/
│   │       ├── ai.service.js       # Gemini integration
│   │       ├── grading.service.js  # Assignment evaluation
│   │       └── cert.service.js     # Certificate generation
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── lib/
│   │   ├── core/             # Constants, theme, routing
│   │   ├── features/         # Feature-first module structure
│   │   │   ├── auth/
│   │   │   ├── courses/
│   │   │   ├── ai_mentor/
│   │   │   └── leaderboard/
│   │   ├── providers/        # Riverpod state providers
│   │   └── services/         # HTTP client, token storage
│   ├── pubspec.yaml
│   └── analysis_options.yaml
│
├── docs/
│   ├── architecture.md
│   └── api-spec.yaml         # OpenAPI 3.0 specification
│
└── .github/
    └── workflows/
        ├── test.yml
        └── deploy.yml
```

---

## Getting Started

**Prerequisites**

- Node.js 18+
- Flutter 3.x
- MongoDB Atlas cluster (free tier works)
- Google AI Studio API key (Gemini 1.5 Flash)

**Backend**

```bash
git clone https://github.com/your-org/kimelia-lumora.git
cd kimelia-lumora/backend

npm install

cp .env.example .env
# Fill in: MONGO_URI, JWT_SECRET, GEMINI_API_KEY, PORT

npm run dev
```

**Frontend**

```bash
cd ../frontend

flutter pub get

# Update lib/core/constants.dart with your API base URL

flutter run
```

**API Documentation**

Interactive Swagger docs are served at:

```
http://localhost:3000/api/docs
```

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | Public | Create account |
| `POST` | `/api/auth/login` | Public | Obtain JWT |
| `GET` | `/api/courses` | Student | List available courses |
| `POST` | `/api/courses/:id/enroll` | Student | Enroll in course |
| `POST` | `/api/ai/ask` | Student | Query AI mentor |
| `POST` | `/api/ai/hint` | Student | Request assignment hint |
| `POST` | `/api/assignments/:id/submit` | Student | Submit for AI grading |
| `GET` | `/api/leaderboard` | Student | Global XP rankings |
| `GET` | `/api/certificates/:hash` | Public | Verify certificate |
| `POST` | `/api/courses` | Admin | Create course |
| `GET` | `/api/admin/users` | Admin | List all users |

Full OpenAPI specification: [`docs/api-spec.yaml`](./docs/api-spec.yaml)

---

## Deployment

The application is designed for containerised deployment with no manual server configuration.

**Database** — MongoDB Atlas. Set `MONGO_URI` in your environment. Atlas handles backups, scaling, and failover.

**Server** — Render (recommended). Connect the GitHub repository, set environment variables in the Render dashboard, and deployments trigger automatically on push to `main`.

**CI/CD** — GitHub Actions runs the test suite on every pull request. On merge to `main`, the deploy workflow triggers a Render redeploy via webhook.

```
Push to feature branch
  → GitHub Actions: lint + test
  → PR review
  → Merge to main
  → GitHub Actions: deploy webhook
  → Render: pull, build, restart
```

**Environment Variables**

```bash
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=...
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Node.js 18 | Server execution |
| Framework | Express 4 | HTTP routing and middleware |
| Database | MongoDB Atlas | Document storage |
| ODM | Mongoose | Schema validation and querying |
| AI | Google Gemini 1.5 Flash | Tutoring, grading, hints |
| Frontend | Flutter 3 | Cross-platform mobile and web |
| State | Riverpod | Reactive state management |
| Auth | JSON Web Tokens | Stateless authentication |
| Docs | Swagger / OpenAPI 3 | API documentation |
| CI/CD | GitHub Actions | Automated testing and deployment |
| Hosting | Render | Server deployment |

---

## Security

- All routes are protected by JWT middleware unless explicitly marked public
- Role-based access control enforced at middleware level — controllers never check roles directly
- AI endpoints are rate-limited to prevent abuse and control API costs
- MongoDB queries use parameterised Mongoose methods — no raw string interpolation
- HTTP headers hardened via Helmet (CSP, HSTS, X-Frame-Options)
- Input sanitised against XSS using `express-mongo-sanitize` and `xss-clean`

---

## Contributing

```bash
git checkout -b feature/your-feature-name
git commit -m "feat: description of change"
git push origin feature/your-feature-name
```

Open a pull request against `main`. CI must pass before merge.

Commit convention follows [Conventional Commits](https://www.conventionalcommits.org/).

---

## License

MIT — see [LICENSE](./LICENSE) for details.

---

<div align="center">

Kimelia Lumora &nbsp;·&nbsp; Built to advance education through AI &nbsp;·&nbsp; © 2025

</div>
