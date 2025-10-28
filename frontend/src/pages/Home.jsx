import React, { useState } from 'react';
import { api } from '../services/api.js';

export default function Home(){
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState('overflow');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [coords, setCoords] = useState(null);

  function getGeo(){
    navigator.geolocation.getCurrentPosition((pos)=>{
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude, address: '' });
    }, ()=> setStatus('Location permission denied'));
  }

  async function upload() {
    if (!file) return null;
    const fd = new FormData();
    fd.append('file', file);
    const { data } = await api.post('/uploads', fd, { headers: { 'Content-Type':'multipart/form-data' }});
    return data.url;
  }

  async function submit(e){
    e.preventDefault();
    setStatus('Uploading...');
    const url = await upload();
    setStatus('Submitting...');
    const { data } = await api.post('/reports', { description: desc, category: cat, location: coords, mediaUrls: url?[url]:[] });
    setStatus(`Submitted! Report ID: ${data.reportId}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-semibold leading-tight">Report sanitation issues in <span className="text-green-600">seconds</span>.</h1>
          <p className="mt-3 text-slate-600">One-tap photo, auto‑geotag, transparent status, faster resolution.</p>
          <div className="mt-6 flex gap-3">
            <a href="#report" className="btn btn-primary">Report Now</a>
            <button onClick={getGeo} className="btn">Enable Geotag</button>
          </div>
          {coords && <p className="mt-2 text-xs text-slate-500">Location ready: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</p>}
        </div>
        <div className="card">
          <img alt="hero" src="/hero.svg" className="rounded-xl"/>
        </div>
      </section>

      <section id="report" className="mt-12 card">
        <h2 className="text-xl font-semibold mb-4">Quick Report</h2>
        <form onSubmit={submit} className="grid gap-4">
          <label className="label">Description</label>
          <textarea className="input min-h-24" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Overflowing bin near park..." />
          <label className="label">Category</label>
          <select className="input" value={cat} onChange={e=>setCat(e.target.value)}>
            <option value="overflow">Overflowing Bin</option>
            <option value="illegal_dump">Illegal Dumping</option>
            <option value="stagnant_water">Stagnant Water</option>
            <option value="e_waste">E-waste</option>
            <option value="other">Other</option>
          </select>
          <label className="label">Photo</label>
          <input className="input" type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])}/>
          <div className="flex gap-3">
            <button className="btn btn-primary" type="submit">Submit</button>
            <button type="button" className="btn" onClick={getGeo}>Use my location</button>
          </div>
          {status && <p className="text-sm text-slate-600">{status}</p>}
        </form>
      </section>
    </div>
  )
}
