function Security({ onBack }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <button onClick={onBack} className="hover:text-primary">← Back</button>
        <span>|</span>
        <span>Security & Privacy</span>
      </div>

      <h1 className="text-2xl font-bold text-slate-800">Security & Privacy</h1>

      {/* Your Data Stays Local */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          🔒 Your Data Stays Local
        </h2>
        <ul className="space-y-3 text-slate-600">
          <li className="flex items-start gap-3">
            <span className="text-success text-xl">✓</span>
            <span>All inventory files are processed in your browser</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-success text-xl">✓</span>
            <span>Nothing is uploaded to an external server</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-success text-xl">✓</span>
            <span>Files are stored only in your session (cleared on close)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-success text-xl">✓</span>
            <span>Email delivery is the only data that leaves the tool — and only when you explicitly click "Send"</span>
          </li>
        </ul>
      </div>

      {/* What We Do With Your Data */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          📋 What We Do With Your Data
        </h2>
        <p className="text-slate-600 mb-4">
          Your inventory data is used solely to:
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-center gap-2">
            <span className="text-primary">•</span>
            <span>Match scanned items against your DRS inventory</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">•</span>
            <span>Generate write-off lists</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">•</span>
            <span>Create barcode sheets</span>
          </li>
        </ul>
        <p className="text-slate-600 mt-4">We do NOT:</p>
        <ul className="space-y-2 text-slate-700 mt-2">
          <li className="flex items-center gap-2">
            <span className="text-danger">✗</span>
            <span>Share your data with any third party</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-danger">✗</span>
            <span>Use it for analytics or benchmarking</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-danger">✗</span>
            <span>Store it beyond your session</span>
          </li>
        </ul>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          🛡️ Recommendations
        </h2>
        <ul className="space-y-3 text-slate-600">
          <li className="flex items-start gap-3">
            <span className="text-xl">1.</span>
            <span>Use a private browser window for counts</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">2.</span>
            <span>Close the tab when finished</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">3.</span>
            <span>Don't run counts on public WiFi</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-xl">4.</span>
            <span>If emailing results, use your work email, not personal accounts</span>
          </li>
        </ul>
      </div>

      <div className="text-center pt-4">
        <button onClick={onBack} className="btn-secondary">
          ← Back
        </button>
      </div>
    </div>
  )
}

export default Security
