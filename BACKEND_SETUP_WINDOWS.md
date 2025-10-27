# Backend not starting? (Windows) — Fix for `MONGO_URI missing`

This error means Node can't see your `.env` file or the `MONGO_URI` inside it.

## ✅ Correct steps (PowerShell)

```powershell
cd .\SanitiWatch\backend

# 1) Create .env from the example
Copy-Item .env.example .env

# 2) Open .env and set:
# MONGO_URI=mongodb://127.0.0.1:27017/sanitiwatch
# JWT_SECRET=any-long-random-string
# UPLOAD_PROVIDER=disk
# ALLOWED_ORIGINS=http://localhost:5173

# 3) Install + run
npm install
npm run dev
```

If you use **MongoDB Atlas**, paste your full connection string as `MONGO_URI`, e.g.

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/sanitiwatch
```

### Common pitfalls
- You ran `npm run dev` from the wrong folder. **Must be** `SanitiWatch/backend`.
- File was saved as `env.txt`. The file name must be exactly `.env` with no extension.
- Atlas "Network Access" isn't set. Add your IP (0.0.0.0/0 for quick testing).
- You edited `.env.example` instead of `.env`. The app only reads `.env`.
