
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Admin from "./pages/Admin.jsx";
import Worker from "./pages/Worker.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ReportStatus from "./pages/ReportStatus.jsx";

import Header from "./components/Header.jsx";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600 flex justify-between">
        <span>© {new Date().getFullYear()} SanitiWatch</span>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">Privacy</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/worker" element={<Worker />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/status/:id" element={<ReportStatus />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
