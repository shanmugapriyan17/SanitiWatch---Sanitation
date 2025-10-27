import React from 'react';

export default function About(){
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">About SanitiWatch</h1>
      <p className="mt-3 text-slate-700">
        SanitiWatch is a citizen‑centric sanitation monitoring platform.
        Citizens submit reports with photos + geotag; authorities triage, assign, and resolve with full transparency.
        Dashboards provide analytics, heatmaps, and SLA tracking for better planning.
      </p>
      <ul className="mt-6 grid gap-3">
        <li className="badge">PWA Offline Ready</li>
        <li className="badge">Role-based Access</li>
        <li className="badge">Cloud / Disk Uploads</li>
        <li className="badge">Basic ML Urgency Scoring</li>
      </ul>
    </div>
  )
}
