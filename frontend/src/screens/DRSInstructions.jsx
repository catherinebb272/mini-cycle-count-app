function DRSInstructions({ onHome, onFAQ, onSecurity }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <div className="text-5xl mb-3">📋</div>
        <h1 className="text-2xl font-bold text-slate-800">
          Final Step: Enter into DRS
        </h1>
      </div>

      {/* How To Enter */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          How to Enter Write-Offs in DRS
        </h2>

        <div>
          <ol className="space-y-3 text-slate-600">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>Go to <strong>Inventory → Adjustments → Write-Off</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>Enter SKU, Quantity, Reason Code</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>Repeat for each item</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Reason Codes */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Reason Codes to Use
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 text-slate-600 font-medium">Code</th>
                <th className="pb-3 text-slate-600 font-medium">Meaning</th>
                <th className="pb-3 text-slate-600 font-medium">When to Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 font-mono text-primary font-bold">C-Cycl</td>
                <td className="py-3">Cycle Count</td>
                <td className="py-3 text-slate-600">Physical scan count — use this for our tool</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-primary font-bold">S-Loss</td>
                <td className="py-3">Shrink</td>
                <td className="py-3 text-slate-600">Unexplained loss (theft, damage)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Need Help */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Need Help?
        </h2>
        <div className="flex gap-4">
          <button onClick={onFAQ} className="btn-secondary">
            Visit FAQ
          </button>
          <button onClick={onSecurity} className="btn-secondary">
            Security Info
          </button>
        </div>
      </div>

      {/* Finish */}
      <div className="text-center pt-6">
        <button onClick={onHome} className="btn-primary text-lg px-10">
          Done — Start Over
        </button>
      </div>
    </div>
  )
}

export default DRSInstructions
