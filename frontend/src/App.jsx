import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Admin from './pages/Admin.jsx';
import Worker from './pages/Worker.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ReportStatus from './pages/ReportStatus.jsx';
import { getToken, setToken, api } from './services/api.js';

function Header() {
  const nav = useNavigate();
  const [auth, setAuth] = useState(() => !!getToken());
  useEffect(() => {
    const i = setInterval(() => setAuth(!!getToken()), 500);
    return () => clearInterval(i);
  }, []);
  function logout() { setToken(null); nav('/'); }
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">🧹 SanitiWatch</Link>
        <nav className="flex gap-4">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/admin" className="hover:underline">Dashboard</Link>
          <Link to="/worker" className="hover:underline">Worker</Link>
          {auth ? <button onClick={logout} className="btn">Logout</button> : <Link className="btn btn-primary" to="/login">Login</Link>}
        </nav>
      </div>
    </header>
  );
}

function Footer(){
  return <footer className="mt-16 border-t border-slate-200">
    <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600 flex justify-between">
      <span>© {new Date().getFullYear()} SanitiWatch</span>
      <a href="https://example.com" target="_blank">Privacy</a>
    </div>
  </footer>
}

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/worker" element={<Worker/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/status/:id" element={<ReportStatus/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}
