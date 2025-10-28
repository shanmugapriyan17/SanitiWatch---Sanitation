import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api.js';

export default function ReportStatus(){
  const { id } = useParams();
  const [r, setR] = useState(null);
  useEffect(()=>{ (async()=>{
    try { const { data } = await api.get('/reports/'+id); setR(data); } catch {}
  })() },[id]);
  if (!r) return <div className="mx-auto max-w-3xl px-4 py-10">Loading...</div>;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Report Status</h1>
      <div className="card mt-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div><div className="label">Category</div><div>{r.category}</div></div>
          <div><div className="label">Status</div><div><span className="badge">{r.status}</span></div></div>
          <div><div className="label">Urgency</div><div>{(r.urgencyScore*100).toFixed(0)}%</div></div>
          <div><div className="label">Created</div><div>{new Date(r.createdAt).toLocaleString()}</div></div>
        </div>
        <div className="mt-4">
          <div className="label">History</div>
          <ul className="mt-2 text-sm">
            {r.history?.map((h,i)=>(<li key={i} className="py-1">{h.timestamp?.slice(0,19).replace('T',' ')} — {h.status} by {h.actor}</li>))}
          </ul>
        </div>
        {r.mediaUrls?.length>0 && <div className="mt-4 grid grid-cols-2 gap-3">
          {r.mediaUrls.map((u,i)=>(<img key={i} src={u} className="rounded-xl"/>))}
        </div>}
      </div>
    </div>
  )
}
