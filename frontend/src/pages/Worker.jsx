import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function Worker(){
  const [items, setItems] = useState([]);

  async function load(){
    const { data } = await api.get('/assignments/mine');
    setItems(data.items);
  }
  useEffect(()=>{ load(); },[]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">My Assignments</h1>
      <div className="mt-4 grid gap-3">
        {items.map(x => <div key={x._id} className="card">
          <div className="text-sm text-slate-600">Report: {x.reportId}</div>
          <div className="text-sm">Assigned: {new Date(x.assignedAt).toLocaleString()}</div>
        </div>)}
        {items.length===0 && <p className="text-slate-600">No assignments yet.</p>}
      </div>
    </div>
  )
}
