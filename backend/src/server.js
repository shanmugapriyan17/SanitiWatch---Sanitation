import http from 'http';
import app from './app.js';
import { connectDB, ensureSeedAdmin } from './setup.js';

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  await ensureSeedAdmin();
  const server = http.createServer(app);
  server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}
start();
