# SanitiWatch — Citizen Sanitation Monitoring (MVP)

Professional, full‑stack project scaffold with:
- **Frontend**: React + Vite + Tailwind CSS + PWA + Map + Charts
- **Backend**: Node.js + Express + MongoDB (Mongoose) + JWT Auth + RBAC + Multer/Cloudinary uploads
- **Analytics**: Basic heatmap-ready API + KPIs
- **ML (demo)**: Tiny urgency scoring model (configurable; intentionally simple/low-accuracy)
- **DX**: `.env.example`, Postman collection, seed data, step‑by‑step install

> Font: **Poppins** everywhere.  
> Tomorrow review? You're covered: run it locally with **4 commands** total (backend + frontend).

## 0) Quick Start (Local, no Cloudinary)

**Prereqs:** Node 18+, npm, Git, and MongoDB (Atlas or local).

```bash
git clone <this-zip-extracted-folder> sanitiwatch
cd sanitiwatch/backend
cp .env.example .env
# Edit MONGO_URI (use local or Atlas). Leave CLOUDINARY_* blank for disk uploads.

npm i
npm run dev
```

In **another terminal**:
```bash
cd sanitiwatch/frontend
cp .env.example .env
npm i
npm run dev
```

- Frontend (Vite): http://localhost:5173
- Backend API: http://localhost:4000

Login with the seeded admin: `admin@city.gov` / password: `admin123`

## 1) Features walkthrough for the demo

- **Citizen flow**: Home → **Report Now** → take/upload photo, geotag (browser prompt), short description → Submit.
- **Admin**: Login → Dashboard → list & map → assign to a worker → track SLA/status → view analytics.
- **Worker**: Login → "My Assignments" → update status, add resolution photo.
- **Lifecycle**: Submission → Assignment → In-Progress → Resolved (with before/after media).
- **Offline**: PWA caches shell; queued reports sync when online.
- **Analytics**: Time-series and basic counters; heatmap-ready `/api/dashboard/metrics`.

## 2) Cloud uploads (optional but recommended)

Create a **Cloudinary** account → get `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` and set in `backend/.env`. Uploads auto-switch from disk to Cloudinary.

## 3) Security checklist (MVP)

- JWT auth + role-based routes (citizen/worker/manager/admin).  
- Input validation + file type/size limits.  
- Rate limiting on public endpoints.  
- Optional anonymous reporting with throttling.  
- Signed URLs (Cloudinary) or non-guessable disk paths.

## 4) ML demo (simple & intentionally low accuracy)

`/ml/train_urgency.py` trains a tiny logistic model on a toy dataset and exports `model.json` used by the backend heuristic scorer. You can re-run to change behavior.

## 5) Deployment hints

- Frontend: Vercel/Netlify (Vite).  
- Backend: Render/Fly.io/AWS.  
- DB: MongoDB Atlas.  
- Set correct env vars; enable CORS for your FE domain; configure `BASE_API_URL` in `frontend/.env`.

For **detailed, step‑by‑step** including screenshots of commands, see `SANITIWATCH_STEP_BY_STEP.md`.
