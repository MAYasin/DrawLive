# 🎨 DrawLive

**DrawLive** is a high-performance, real-time collaborative drawing application. Built with a modern full-stack TypeScript architecture, it allows multiple users to ideate and create on a shared digital canvas simultaneously.

---

## 🚀 Key Features

* **Real-time Collaboration**: Instant stroke synchronization across all connected clients.
* **Precision Controls**: Adjustable brush thickness, opacity, and smoothing.
* **Intuitive UI**: A sleek, responsive interface built with Tailwind CSS.
* **Robust Type Safety**: End-to-end TypeScript for a reliable development experience.
* **Production Ready**: Fully containerized using Docker for seamless scaling.

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | Next.js 14, React, Lucide Icons |
| **Backend** | Node.js, Socket.io (for real-time events) |
| **Styling** | Tailwind CSS, Shadcn/UI |
| **DevOps** | Docker, Docker Compose |
| **Language** | TypeScript |

---

## 📂 Project Structure

```text
DrawLive/
├── client/                # Next.js Frontend
│   ├── app/               # App Router logic
│   │   ├── components/    # Toolbar, Canvas, and Color Pickers
│   │   └── hooks/         # useDraw (Canvas API logic)
│   └── utils/             # Canvas drawing & math helpers
└── server/                # Node.js + Socket.io Backend
    ├── src/               # WebSocket event handlers
    └── Dockerfile         # Deployment configuration

```

---

## 🚦 Getting Started

### 1. Prerequisites

* Node.js (v18 or higher)
* Docker (Optional, for containerized setup)

### 2. Installation & Local Development

#### Step 1: Start the Server

The backend handles the WebSocket relay for drawing events.

```bash
cd server
npm install
npm run dev  # Starts on http://localhost:3001
```

#### Step 2: Start the Client

```bash
cd client
npm install
npm run dev  # Starts on http://localhost:3000
```

### 3. Running with Docker

If you want to spin up the entire environment (Client + Server) with one command:

```bash
docker-compose up --build
```

---

## 💡 How it Works

1. **Canvas Hook**: The `useDraw` hook attaches event listeners to the HTML5 Canvas, capturing mouse/touch coordinates.
2. **WebSocket Relay**: As a user draws, the client emits a `draw-line` event via Socket.io.
3. **Broadcast**: The server receives the coordinates and styles, then broadcasts them to all other connected clients in the same room.
4. **Sync**: Other clients receive the data and use the Canvas API to render the incoming strokes in real-time.
