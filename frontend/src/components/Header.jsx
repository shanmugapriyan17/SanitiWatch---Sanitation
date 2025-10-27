import { useState } from 'react';
export default function Header(){
  const [open, setOpen] = useState(false);
  return (
    <header className="header page">
      <div className="brand">SanitiWatch</div>

      <nav className="nav" aria-hidden={open ? "false":"true"}>
        <a href="/about">About</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/worker">Worker</a>
        <a className="btn btn-primary" href="/login">Login</a>
      </nav>

      <button className="nav-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle menu">
        ☰
      </button>

      {/* mobile dropdown */}
      {open && (
        <div className="mobile-menu card" style={{position:'absolute', top:'64px', right:'16px', zIndex: 200}}>
          <a href="/about">About</a><br/>
          <a href="/dashboard">Dashboard</a><br/>
          <a href="/worker">Worker</a><br/>
          <a href="/login" className="btn btn-primary">Login</a>
        </div>
      )}
    </header>
  );
}
