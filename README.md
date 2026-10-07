# 👑 Raja Mantri Chor Sipahi (RMCS) — 3D Multiplayer Game

An immersive, real-time 4-player social deduction game powered by **React**, **Three.js 3D Visuals**, **Node.js**, **Socket.io**, **MongoDB**, and **OpenAI**.

Experience the traditional royal Indian bluffing game brought to life with interactive 3D WebGL scenes, glassmorphism aesthetics, dynamic dark/light themes, and intelligent AI bot players.

---

## ✨ Features & Highlights

### 🎮 Immersive 3D UI & Visual Design
- **Interactive 3D Three.js Background**: Real-time WebGL rendering with floating royal emblems, responsive lighting, particle field effects, and smooth camera parallax following mouse movements.
- **Dynamic Atmosphere**: Automatic Three.js lighting and fog color transitions coordinated with Dark and Light mode toggles.
- **Royal Glassmorphism**: Polished UI with frosted glass cards, gold gradient accents, and responsive layout for mobile, tablet, and desktop screens.
- **Audio & Sound Controls**: Ambient royal feedback with instant mute/sound toggles.

### 👥 Real-Time Multiplayer Room System
- **4-Digit Private Room Codes**: Host creates a private chamber; friends join instantly via 4-digit codes.
- **Instant Room Synchronization**: Automatic in-memory state reconciliation and real-time Socket.io broadcasts ensuring players see each other immediately upon joining.
- **Auto-Reconnection Resilience**: Client tracks the active chamber and automatically re-joins room channels across network hiccups.
- **AI Bot Courtiers**: Match auto-fills any empty seats with OpenAI-powered AI bots featuring unique personalities (Strategic, Mischievous, Friendly, Competitive, Nervous).

### 📜 Game Mechanics & Roles
| Role | Points | Responsibility |
| :--- | :---: | :--- |
| **👑 Raja (King)** | 1,000 Pts | Monarch revealed at the beginning; safe from deduction. |
| **⚖️ Mantri (Minister)** | 500 Pts | Detective who must deduce who among the remaining two is the Chor. |
| **🛡️ Sipahi (Soldier)** | 300 Pts | Royal guard; earns 300 points if the Mantri guesses correctly. |
| **🗝️ Chor (Thief)** | 0 / 500 Pts | Bluffs undetected. If Mantri guesses wrong, steals Mantri's 500 points! |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Three.js, Tailwind CSS, Lucide-style SVG Icons
- **Backend**: Node.js, Express, Socket.io (WebSocket + Polling)
- **Database**: MongoDB Atlas (with Mongoose schemas & TTL auto-cleanup)
- **AI Engine**: OpenAI API (`gpt-4o-mini`) for intelligent bot bluffing and deduction

---

## 📁 Repository Structure

```
rmcs/
├── client/                     # React + Vite + Three.js Frontend
│   ├── public/                 # Static assets, favicon, robots.txt, sitemap
│   ├── src/
│   │   ├── components/         # 3D Background, Game, Lobby, Auth, Legal
│   │   ├── contexts/           # GameContext, SocketContext, AuthContext, ThemeContext
│   │   ├── hooks/              # Custom audio, meta, and navigation hooks
│   │   └── utils/              # Resilient API & Socket URL handlers
│   └── vite.config.js          # Vite config with multi-vendor chunking
└── server/                     # Express + Socket.io Backend
    ├── src/
    │   ├── config/             # MongoDB connection
    │   ├── controllers/        # Room, Game, Auth, and Admin controllers
    │   ├── models/             # User, Room, and Game Mongoose schemas
    │   ├── services/           # Room service, Bot AI service, Scoring
    │   └── socket/             # Socket.io handlers (Rooms, Game rounds, Chat)
    └── server.js               # Entry point with HTTP & WebSocket setup
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI or local MongoDB
- (Optional) OpenAI API Key for AI bots

### 1. Server Setup
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
*Server runs on `http://localhost:5000`.*

### 2. Client Setup
```bash
cd client
cp .env.example .env
npm install
npm run dev
```
*Client runs on `http://localhost:5173`.*

---

## 🌐 Deployment Configuration

### Deploying the Backend (Render / Railway / Fly.io)
Deploy the `server` directory as a persistent Web Service (not serverless, so WebSockets remain connected). Set the following environment variables:
- `PORT` = `5000`
- `MONGODB_URI` = `mongodb+srv://...`
- `JWT_SECRET` = `your_jwt_secret`
- `OPENAI_API_KEY` = `your_openai_key`

### Deploying the Frontend (Vercel / Netlify / Render)
Deploy the `client` directory as a Single Page Application. In your hosting project settings, configure:
- `VITE_API_URL` = `https://<your-backend-domain>/api`
- `VITE_SOCKET_URL` = `https://<your-backend-domain>`

---

## 📄 License
This project is licensed under the MIT License.
