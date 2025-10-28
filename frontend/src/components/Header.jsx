import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sw-header">
      <div className="sw-header-inner">
        <div className="brand">🧹 SanitiWatch</div>
        <nav className="desktop-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <button className={`hamburger ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)}>
          <span className="dash"></span><span className="dash"></span><span className="dash"></span>
        </button>
      </div>
      <div className={`mobile-panel ${open ? "open" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setOpen(false)}>About</Link>
      </div>
    </header>
  );
}
