<div className="card" style={{marginTop: '1rem'}}>
  <h3>Quick Report</h3>
  <div className="form-row">
    <div className="field">
      <label>Description</label>
      <textarea placeholder="Overflowing bin near park..." />
    </div>
  </div>

  <div className="form-row">
    <div className="field">
      <label>Category</label>
      <select>...</select>
    </div>
    <div className="field">
      <label>Photo</label>
      <input type="file" className="file-input" />
    </div>
  </div>

  <div style={{display:'flex', gap: '0.75rem', marginTop:'1rem', flexDirection: 'row'}}>
    <button className="btn btn-primary">Submit</button>
    <button className="btn">Use my location</button>
  </div>
</div>
