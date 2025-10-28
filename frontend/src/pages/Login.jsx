import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, setToken } from '../services/api.js';

export default function Login(){
  const nav = useNavigate();
  const [email, setEmail] = useState('admin@city.gov');
  const [password, setPassword] = useState('admin123');
  const [err, setErr] = useState('');

  async function submit(e){
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setToken(data.token);
      nav('/admin');
    } catch (e) {
      setErr(e.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="card">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <form className="grid gap-3 mt-4" onSubmit={submit}>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button className="btn btn-primary">Login</button>
        </form>
        <p className="text-sm mt-3">New here? <Link to="/register" className="underline">Create account</Link></p>
      </div>
    </div>
  )
}
