import { useState, useRef } from 'react'

function PrepareFiles({ countData, setCountData, onNext, onBack }) {
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState(countData.inventoryFile?.name || '')
  const [storeName, setStoreName] = useState(countData.storeName || '')
  const [storeNumber, setStoreNumber] = useState(countData.storeNumber || '')
  const [countType, setCountType] = useState(countData.countType || '')
  const fileInputRef = useRef(null)

  const handleFile = (file) => {
    if (file) {
      setFileName(file.name)
      setCountData(prev => ({ ...prev, inventoryFile: file }))
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  const canContinue = storeName && storeNumber && countType && fileName

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <button onClick={onBack} className="hover:text-primary">← Back</button>
        <span>|</span>
        <span>Step 1 of 5: Prepare Your Files</span>
      </div>

      {/* Store Info */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Store Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Store Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => {
                setStoreName(e.target.value)
                setCountData(prev => ({ ...prev, storeName: e.target.value }))
              }}
              placeholder="e.g., Plano"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Store Number
            </label>
            <input
              type="text"
              value={storeNumber}
              onChange={(e) => {
                setStoreNumber(e.target.value)
                setCountData(prev => ({ ...prev, storeNumber: e.target.value }))
              }}
              placeholder="e.g., 80026"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Count Type
            </label>
            <select
              value={countType}
              onChange={(e) => {
                setCountType(e.target.value)
                setCountData(prev => ({ ...prev, countType: e.target.value }))
              }}
              className="input-field"
            >
              <option value="">Select...</option>
              <option value="full">Full Inventory</option>
              <option value="category">Category (jeans, tops, etc.)</option>
              <option value="dateRange">Date Range</option>
              <option value="highValue">High-Value Items (retail &gt; $30)</option>
            </select>
          </div>
        </div>
      </div>

      {/* What You Need */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          What You Need to Upload
        </h2>
        <div className="space-y-3 text-slate-600">
          <p>
            <strong className="text-slate-800">Item Buy Detail</strong> — This is your main inventory file from DRS.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="text-sm font-medium text-slate-700 mb-2">Where to find it:</div>
            <code className="text-sm">DRS → Reports → Inventory Reports → Item Buy Detail</code>
          </div>
          <p className="text-sm">
            Export as <strong>CSV</strong> or <strong>Excel (.xlsx)</strong>. For large stores (&gt;50 bins), 
            consider splitting into multiple date ranges to keep file size manageable (&lt;10,000 rows per file).
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Upload Your File
        </h2>
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragOver ? 'border-primary bg-blue-50' : 'border-slate-300 hover:border-slate-400'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleChange}
            className="hidden"
          />
          <div className="text-4xl mb-3">📁</div>
          <div className="text-lg font-medium text-slate-700 mb-1">
            {fileName ? fileName : 'Drag & drop your file here'}
          </div>
          <div className="text-sm text-slate-500">
            or click to browse — supported: .csv, .xlsx
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-slate-500 text-sm">
            Don't have the file?{' '}
            <button className="text-primary hover:underline">
              Email it to your assistant →
            </button>
          </span>
        </div>
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

export default PrepareFiles
