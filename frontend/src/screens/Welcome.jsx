function Welcome({ onNext }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🏪</div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Mini Cycle Count Tool
        </h1>
        <p className="text-lg text-slate-600">
          A lightweight alternative to full physical inventory counts
        </p>
      </div>

      {/* Explanation Card */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Why Partial Counts?
        </h2>
        <ul className="space-y-3 text-slate-600">
          <li className="flex items-start gap-3">
            <span className="text-success text-xl">✓</span>
            <span>
              <strong className="text-slate-800">Full physical counts cost $2,000–$5,000+</strong> — 
              this tool is free
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-success text-xl">✓</span>
            <span>
              <strong className="text-slate-800">Run on your schedule</strong> — monthly, quarterly, or before clearance events
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-success text-xl">✓</span>
            <span>
              <strong className="text-slate-800">Scan one category or date range at a time</strong> — 
              fits into normal operations
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-success text-xl">✓</span>
            <span>
              <strong className="text-slate-800">Catch drift early</strong> — before small losses become big problems
            </span>
          </li>
        </ul>
      </div>

      {/* How It Works */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <span className="text-2xl">📁</span>
            <div>
              <div className="font-semibold text-slate-800">1. Upload Inventory File</div>
              <div className="text-sm text-slate-600">Get it from DRS — we'll guide you</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <span className="text-2xl">📱</span>
            <div>
              <div className="font-semibold text-slate-800">2. Scan Items</div>
              <div className="text-sm text-slate-600">Use a barcode scanner or upload a scan file</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold text-slate-800">3. Review & Approve</div>
              <div className="text-sm text-slate-600">See what's missing, decide what to write off</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <span className="text-2xl">📤</span>
            <div>
              <div className="font-semibold text-slate-800">4. Export for DRS</div>
              <div className="text-sm text-slate-600">Download ready-to-use write-off files</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button onClick={onNext} className="btn-primary text-lg px-10 py-4">
          Get Started →
        </button>
      </div>
    </div>
  )
}

export default Welcome
