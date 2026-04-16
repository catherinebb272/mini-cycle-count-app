import { useState, useRef, useEffect } from 'react'

function ConductScan({ countData, setCountData, onNext, onBack }) {
  const [scanInput, setScanInput] = useState('')
  const [scannedItems, setScannedItems] = useState(countData.scannedItems || [])
  const [lastScanned, setLastScanned] = useState(null)
  const inputRef = useRef(null)

  // Auto-focus scan input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleScan = (e) => {
    if (e.key === 'Enter' && scanInput.trim()) {
      const sku = scanInput.trim().toUpperCase()
      
      // Check for duplicate
      const isDuplicate = scannedItems.some(item => item.sku === sku)
      
      const newItem = {
        sku,
        scannedAt: new Date().toISOString(),
        isDuplicate
      }
      
      setScannedItems(prev => [...prev, newItem])
      setLastScanned(sku)
      setScanInput('')
      
      // Clear last scanned display after 1.5s
      setTimeout(() => setLastScanned(null), 1500)
      
      // Update parent state
      setCountData(prev => ({ ...prev, scannedItems: [...prev.scannedItems, newItem] }))
    }
  }

  const clearAll = () => {
    setScannedItems([])
    setCountData(prev => ({ ...prev, scannedItems: [] }))
  }

  const canContinue = scannedItems.length > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <button onClick={onBack} className="hover:text-primary">← Back</button>
        <span>|</span>
        <span>Step 2 of 5: Conduct the Scan</span>
      </div>

      {/* Hardware Setup */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          What You'll Need
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="font-semibold text-slate-800 mb-2">Option A: Laptop + USB Scanner</div>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Laptop with wide USB port</li>
              <li>• USB barcode scanner ($30–$80)</li>
              <li>• Plug in, open this page, click scan field</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="font-semibold text-slate-800 mb-2">Option B: Tablet + Bluetooth</div>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• iPad, Surface, or Android tablet</li>
              <li>• Bluetooth scanner paired to device</li>
              <li>• Tap field and start scanning</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <div className="font-medium text-amber-800 mb-1">💡 Scanning Tips</div>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Scan each item once — duplicate beeps = already counted</li>
            <li>• Keep scanner beam perpendicular to barcode</li>
            <li>• For items without barcodes, you can skip or manually enter SKU</li>
          </ul>
        </div>
      </div>

      {/* Scan Input */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Scan Now
        </h2>
        
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={scanInput}
            onChange={(e) => setScanInput(e.target.value)}
            onKeyDown={handleScan}
            placeholder="Click here and start scanning..."
            className="input-field text-lg font-mono text-center py-6 text-2xl"
          />
        </div>

        {/* Last Scanned Feedback */}
        {lastScanned && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-4 text-center animate-pulse">
            <span className="text-success font-semibold">✓ Scanned: {lastScanned}</span>
          </div>
        )}

        <div className="text-center text-2xl font-bold text-slate-700 mb-4">
          Items scanned: <span className="text-primary">{scannedItems.length}</span>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={clearAll}
            disabled={scannedItems.length === 0}
            className="btn-ghost text-danger"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          Recent Scans
        </h2>
        <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
          {scannedItems.length === 0 ? (
            <div className="p-4 text-center text-slate-500">
              No items scanned yet
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {[...scannedItems].reverse().slice(0, 10).map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 flex justify-between items-center ${
                    item.isDuplicate ? 'bg-red-50' : 'bg-white'
                  }`}
                >
                  <span className="font-mono text-sm">{item.sku}</span>
                  {item.isDuplicate && (
                    <span className="text-xs text-danger font-medium">DUPLICATE</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Alternative: Upload Scan File */}
      <div className="card">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          Alternative: Upload a Scan File
        </h2>
        <p className="text-slate-600 text-sm mb-3">
          If you used a dedicated inventory scanner (Datascan, RGIS), you can upload that CSV file instead.
        </p>
        <button className="btn-secondary">
          Upload Scan File
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button 
          onClick={onNext} 
          disabled={!canContinue}
          className="btn-primary"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

export default ConductScan
