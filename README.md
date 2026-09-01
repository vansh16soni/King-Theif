# Raja Mantri Chor Sipahi — Multiplayer Online Game

Full-stack scaffold: React + Vite + Tailwind (client) / Node + Express + Socket.io + MongoDB + OpenAI (server).

## Structure
```
rmcs/
├── server/   # Express API + Socket.io real-time game engine + OpenAI bots
└── client/   # React (Vite) frontend
```

## Setup

### 1. Server
```
cd server
cp .env.example .env   # fill in MONGODB_URI, JWT_SECRET, OPENAI_API_KEY
npm install
npm run dev             # nodemon, http://localhost:5000
```
Requires a running MongoDB instance (local `mongod` or Atlas URI).

### 2. Client
```
cd client
cp .env.example .env    # defaults already point at localhost:5000
npm install
npm run dev              # http://localhost:5173
```

## How it works
- **Auth**: username + password only (bcrypt + JWT), no email/OTP.
- **Rooms**: host creates a room → gets a 4-digit code; others join with the code.
  Rooms auto-expire after 60 min of inactivity (MongoDB TTL index on `lastActivity`).
- **Starting a game**: host hits Start; any empty seat (of 4) is auto-filled with an
  AI bot (random personality: friendly / competitive / mischievous / strategic / nervous).
- **Round flow** (`server/src/socket/handlers/gameHandlers.js`):
  1. Roles shuffled and dealt privately (`game:round_start` per socket).
  2. Raja revealed to the room.
  3. Mantri (human or bot) picks who's Sipahi vs Chor among the other two.
     - Bot Mantri calls OpenAI (`botService.generateBotGuess`) with a 1–3s "thinking" delay,
       falls back to a random guess if the API call fails.
  4. Points computed (`scoringService.calculatePoints`), round persisted to Mongo,
     next round auto-starts after a short pause.
- **Bot chat**: each bot in the round independently calls OpenAI
  (`botService.generateBotChatMessage`) to bluff, hint, or react in character; falls
  back to a canned line per personality if the API is unavailable.
- **Chat**: room-wide messages, 5 preset emotes, and an optional Sipahi → Mantri
  private-hint emoji (one-way, `chat:private_hint`).
- **State**: live game state lives in memory on the server (`socket/gameState.js`)
  for speed; each finished round and the final game result are written to MongoDB.

## Not included (left for you to wire up)
- Reconnection grace-period UI (server already tolerates a dropped socket for a
  running room; add a "reconnecting..." client state if desired).
- Card-flip sound assets (a Web Audio API tone generator stub is in `hooks/useAudio.js`
  — swap in real files from Freesound.org if you want richer audio).
- Kick-player / end-game-early admin actions (documented in the original spec's
  REST table but not wired to socket events yet — natural next addition alongside
  `room:start`).
- Docker files, CI, and rate-limiting middleware (`express-rate-limit` is already
  a dependency — attach it to `server.js` as needed).
