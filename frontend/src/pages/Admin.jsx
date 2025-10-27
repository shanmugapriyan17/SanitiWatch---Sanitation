import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Admin(){
  const [reports, setReports] = useState([]);
  const [metrics, setMetrics] = useState(null);

  async function load(){
    const { data } = await api.get('/reports');
    setReports(data.items);
    const m = await api.get('/dashboard/metrics');
    setMetrics({ ...m.data, chart: m.data.timeseries.map(d=>({ date: d._id, count: d.count })) });
  }
  useEffect(()=>{ load(); },[]);

  async function setStatus(id, status){
    await api.put(`/reports/${id}/status`, { status });
    load();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Authority Dashboard</h1>
      {metrics && <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {Object.entries(metrics.totals).map(([k,v])=>(
          <div key={k} className="card">
            <div className="text-sm text-slate-500">{k}</div>
            <div className="text-2xl font-semibold">{v}</div>
          </div>
        ))}
      </div>}

      {metrics && <div className="card mt-6 h-64">
        <div className="text-sm text-slate-600 mb-2">Reports — last 7 days</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metrics.chart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" />
          </LineChart>
        </ResponsiveContainer>
      </div>}

      <div className="mt-6 card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Incoming Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Category</th>
                <th className="p-2">Urgency</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(r=>(
                <tr key={r._id} className="border-b">
                  <td className="p-2"><Link to={`/status/${r._id}`} className="underline">{r._id.slice(-6)}</Link></td>
                  <td className="p-2">{r.category}</td>
                  <td className="p-2">{(r.urgencyScore*100).toFixed(0)}%</td>
                  <td className="p-2"><span className="badge">{r.status}</span></td>
                  <td className="p-2 flex gap-2">
                    <button className="btn" onClick={()=>setStatus(r._id,'assigned')}>Assign</button>
                    <button className="btn" onClick={()=>setStatus(r._id,'in_progress')}>In‑Progress</button>
                    <button className="btn" onClick={()=>setStatus(r._id,'resolved')}>Resolve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
