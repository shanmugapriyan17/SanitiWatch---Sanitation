import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE;
const KEY = 'sw_token';

export function getToken(){ return localStorage.getItem(KEY); }
export function setToken(t){ t? localStorage.setItem(KEY,t): localStorage.removeItem(KEY); }

export const api = axios.create({ baseURL: `${BASE}/api` });
api.interceptors.request.use(cfg => {
  const t = getToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
