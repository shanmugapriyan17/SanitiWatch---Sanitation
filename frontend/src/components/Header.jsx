// src/components/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, setToken } from "../services/api.js";
import "./Header.css";

export default function Header() {
  const nav = useNavigate();
  const [auth, setAuth] = useState(() => !!getToken());
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    // keep auth state in sync (simple polling as used previously)
    const i = setInterval(() => setAuth(!!getToken()), 500);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    // outside click + ESC handling
    function onDocClick(e) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function logout() {
    setToken(null);
    nav("/");
  }

  return (
    <header className="sw-header">
      <div className="sw-header-inner">
        <div className="brand">
          <span className="logo">🧹</span>
          <Link to="/" className="brand-text">SanitiWatch</Link>
        </div>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/about">About</Link>
          <Link to="/admin">Dashboard</Link>
          <Link to="/worker">Worker</Link>
          {auth ? (
            <button onClick={logout} className="btn login-btn">Logout</button>
          ) : (
            <Link to="/login" className="btn login-btn">Login</Link>
          )}
        </nav>

        <button
          ref={btnRef}
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
        >
          <span className="dash" />
          <span className="dash" />
          <span className="dash" />
        </button>
      </div>

      <div
        ref={panelRef}
        className={`mobile-panel ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <Link to="/about" onClick={() => setOpen(false)}>About</Link>
        <Link to="/admin" onClick={() => setOpen(false)}>Dashboard</Link>
        <Link to="/worker" onClick={() => setOpen(false)}>Worker</Link>
        {auth ? (
          <button
            onClick={() => { setOpen(false); logout(); }}
            className="btn login-btn"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn login-btn" onClick={() => setOpen(false)}>Login</Link>
        )}
      </div>
    </header>
  );
}
