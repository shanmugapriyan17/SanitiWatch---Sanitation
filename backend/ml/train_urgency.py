# Tiny, silly "model" that averages class weights from a toy dataset.
# Produces model.json consumed by Node backend for urgency scoring.
import csv, json, statistics, os
from collections import defaultdict

fn = os.path.join(os.path.dirname(__file__), '..', '..', 'dataset', 'reports_sample.csv')
weights = defaultdict(list)
with open(fn) as f:
    rdr = csv.DictReader(f)
    for r in rdr:
        w = float(r['urgent'])
        weights[r['category']].append(w)

base = 0.15
out = {'base': base, 'nightBoost': 0.12}
for cat, arr in weights.items():
    out[cat] = 0.4 + 0.35*(sum(arr)/len(arr))  # map 0..1 to ~0.4..0.75

with open(os.path.join(os.path.dirname(__file__), 'model.json'), 'w') as f:
    json.dump(out, f, indent=2)
print('Wrote model.json:', out)
