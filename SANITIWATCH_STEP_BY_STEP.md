# SanitiWatch — Step‑by‑Step (Frontend + Backend + MongoDB + Cloudinary)

> Short on time? Follow the **TL;DR** at the top of `README.md`.  
> Below is the detailed hand‑holding guide, command-by-command.

## A) Install prerequisites

1. **Node.js 18+**: https://nodejs.org → download LTS.  
2. **Git**: https://git-scm.com/downloads  
3. **MongoDB**:
   - Easiest: **MongoDB Atlas** (free tier). Create a Cluster → get a connection string like:
     `mongodb+srv://<user>:<pass>@cluster0.abcde.mongodb.net/sanitiwatch`
   - Or install local MongoDB Community Server and use: `mongodb://127.0.0.1:27017/sanitiwatch`
4. (Optional) **Cloudinary** for media: https://cloudinary.com → Create account.

## B) Backend setup

```bash
cd backend
cp .env.example .env
# Open .env and set:
#   PORT=4000
#   JWT_SECRET=some-long-random-string
#   MONGO_URI=mongodb://127.0.0.1:27017/sanitiwatch   # or your Atlas URI
#   UPLOAD_PROVIDER=disk                            # or 'cloudinary'
#   CLOUDINARY_CLOUD_NAME=
#   CLOUDINARY_API_KEY=
#   CLOUDINARY_API_SECRET=
npm i
npm run dev
```

You should see: `Server listening on http://localhost:4000` and `MongoDB connected`.

**Seed data**: on first boot, a default admin (`admin@city.gov / admin123`) is injected if missing.

## C) Frontend setup

```bash
cd ../frontend
cp .env.example .env
# Open .env and set:
#   VITE_API_BASE=http://localhost:4000
npm i
npm run dev
```

Open http://localhost:5173

## D) What to click for review/demo

1. **Home** → “Report Now” → Add photo + allow location → Submit.  
2. **Login (Admin)** → `admin@city.gov / admin123`.  
3. **Dashboard**: See new report → click to **Assign** to a worker.  
4. **Login (Worker)** → view “My Assignments” → set to “In‑Progress”, then “Resolved” (attach after photo).  
5. **Analytics** tab: View KPIs and time‑series.  
6. **About** tab: Project pitch you can speak through.

## E) Common errors

- *CORS blocked*: Ensure `VITE_API_BASE` matches backend URL; backend CORS allows your FE origin.  
- *Mongo connect error*: Check `MONGO_URI`, allow IPs in Atlas Network Access.  
- *Uploads failing*: If using Cloudinary, all three keys must be set. With `disk`, ensure `backend/uploads/` exists (auto-created).

## F) Production deploy (fast path)

- **Backend (Render)**: Create Web Service from your repo → set envs → Start Command: `node src/server.js`  
- **Frontend (Vercel)**: Import project → Build command: `npm run build`, Output: `dist` → set `VITE_API_BASE` env to the backend URL.  
- Update CORS allowed origins to your production FE domain.

Good luck on your review! 🚀
