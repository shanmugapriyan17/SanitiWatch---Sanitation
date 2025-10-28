import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, setToken } from '../services/api.js';

export default function Register(){
  const nav = useNavigate();
  const [name,setName] = useState('Citizen');
  const [email,setEmail] = useState('citizen@example.com');
  const [password,setPassword] = useState('password123');
  const [role,setRole] = useState('citizen');
  const [err,setErr] = useState('');

  async function submit(e){
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', { name, email, password, role });
      setToken(data.token);
      nav('/');
    } catch (e) { setErr(e.response?.data?.error || 'Failed'); }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="card">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <form className="grid gap-3 mt-4" onSubmit={submit}>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name"/>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
          <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="citizen">Citizen</option>
            <option value="worker">Field Worker</option>
            <option value="manager">Manager</option>
          </select>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button className="btn btn-primary">Sign up</button>
        </form>
      </div>
    </div>
  )
}
