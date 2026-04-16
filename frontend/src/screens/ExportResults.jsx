import { useState } from 'react'

// Convert Excel serial date (days since 1900-01-01) to formatted date
// Excel serial 45505 = Dec 30, 2024
function formatBuyDate(dateValue) {
  if (!dateValue) return ''
  
  // If it's already a string in reasonable format, return it
  if (typeof dateValue === 'string') {
    // Check if it's already YYYY-MM-DD or MM/DD/YYYY
    if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/) || dateValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
      return dateValue
    }
    // If it's a number (Excel serial), convert it
    const num = parseInt(dateValue, 10)
    if (!isNaN(num) && num > 30000) {
      // Excel serial date: days since 1900-01-01 (with Excel's leap year bug)
      // Excel incorrectly assumes 1900 is a leap year, so subtract 1 for dates after Feb 28, 1900
      const excelEpoch = new Date(1899, 11, 30) // Dec 30, 1899 = day 0 in Excel
      const date = new Date(excelEpoch.getTime() + num * 24 * 60 * 60 * 1000)
      return date.toISOString().split('T')[0]
    }
    return dateValue
  }
  
  // If it's a number (Excel serial date)
  if (typeof dateValue === 'number' && dateValue > 30000) {
    const excelEpoch = new Date(1899, 11, 30)
    const date = new Date(excelEpoch.getTime() + dateValue * 24 * 60 * 60 * 1000)
    return date.toISOString().split('T')[0]
  }
  
  return String(dateValue)
}

function ExportResults({ countData, setCountData, onNext, onBack }) {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('your@email.com')

  const acceptedItems = countData.acceptedItems || []
  const skippedItems = countData.skippedItems || []
  const scannedItems = countData.scannedItems || []
  const totalCost = acceptedItems.reduce((sum, item) => sum + parseFloat(item.cost), 0).toFixed(2)
  const totalRetail = acceptedItems.reduce((sum, item) => sum + parseFloat(item.retail), 0).toFixed(2)

  // Generate duplicate scan log with positions
  const getOtherPosition = (item, allItems) => {
    // Find the first occurrence of this SKU
    const firstIdx = allItems.findIndex(i => i.sku === item.sku && i.scanPosition !== item.scanPosition)
    return firstIdx >= 0 ? firstIdx : ''
  }
  
  const duplicateLog = scannedItems
    .filter(item => item.isDuplicate || item.isNearbyDuplicate || item.isRepeatedChunk)
    .map(item => ({
      ...item,
      otherPosition: getOtherPosition(item, scannedItems),
      zone: item.zone || 'Endcap' // Default to Endcap since that's a common high-traffic area
    }))
  
  const nearbyDuplicates = scannedItems.filter(item => item.isNearbyDuplicate)
  const repeatedChunks = scannedItems.filter(item => item.isRepeatedChunk)
  const exactDuplicates = scannedItems.filter(item => item.isDuplicate)

  // Handle download of duplicate scan log
  const handleDownloadDuplicateLog = () => {
    const headers = ['SKU', 'Scan Position', 'Other Position', 'Zone', 'Issue Type', 'Notes']
    const rows = duplicateLog.map(item => [
      item.sku,
      item.scanPosition || 0,
      item.otherPosition,
      item.zone,
      item.isRepeatedChunk ? 'REPEATED_CHUNK' : item.isNearbyDuplicate ? 'NEARBY_DUPLICATE' : 'EXACT_DUPLICATE',
      item.isRepeatedChunk ? `Same 8 items scanned twice` : item.isNearbyDuplicate ? `Within 5 scans` : 'Already scanned'
    ])

    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `duplicate_scan_log_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDownload = () => {
    // Generate CSV content - combining Description + Brand, no Zone column
    const headers = ['SKU', 'Description', 'Size', 'Buy Date', 'Cost', 'Retail', 'Category', 'Reason Code', 'Notes']
    const rows = acceptedItems.map(item => [
      item.sku,
      `${item.description}/${item.brand}`,
      item.size,
      formatBuyDate(item.buyDate),
      item.cost,
      item.retail,
      item.category,
      'C-Cycl',
      'Physical count'
    ])

    const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `adjustments_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleEmail = () => {
    setEmailSent(true)
    // In real app, this would trigger backend email
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <button onClick={onBack} className="hover:text-primary">← Back</button>
        <span>|</span>
        <span>Step 5 of 5: Export Results</span>
      </div>

      {/* Review Summary */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Review Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-slate-800">{acceptedItems.length + skippedItems.length}</div>
            <div className="text-sm text-slate-600">Items Reviewed</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-success">{acceptedItems.length}</div>
            <div className="text-sm text-slate-600">Accepted</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-slate-600">${totalCost}</div>
            <div className="text-sm text-slate-600">Total Cost</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-slate-600">${totalRetail}</div>
            <div className="text-sm text-slate-600">Total Retail</div>
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Download Options
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📄</span>
              <div>
                <div className="font-semibold text-slate-800">Write-Off List (DRS-ready)</div>
                <div className="text-sm text-slate-600">adjustments_YYYY-MM-DD.csv</div>
              </div>
            </div>
            <button onClick={handleDownload} className="btn-primary">
              Download
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🖨️</span>
              <div>
                <div className="font-semibold text-slate-800">Barcode Sheet</div>
                <div className="text-sm text-slate-600">barcodes_YYYY-MM-DD.csv</div>
              </div>
            </div>
            <button className="btn-secondary">
              Download
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <div className="font-semibold text-slate-800">Combined Report</div>
                <div className="text-sm text-slate-600">Full report with all columns</div>
              </div>
            </div>
            <button className="btn-secondary">
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Duplicate Scan Log */}
      <div className="card border-2 border-orange-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          📋 Duplicate Scan Log
        </h2>
        <div className="text-sm text-slate-600 mb-4">
          Records of items scanned that match previous scans. Threshold settings: Nearby duplicates within 5 items, repeated chunks of 8.
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{repeatedChunks.length}</div>
            <div className="text-xs text-slate-600">Repeated Chunks</div>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-amber-600">{nearbyDuplicates.length}</div>
            <div className="text-xs text-slate-600">Nearby Duplicates</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{exactDuplicates.length}</div>
            <div className="text-xs text-slate-600">Exact Duplicates</div>
          </div>
        </div>

        {duplicateLog.length > 0 && (
          <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg mb-4">
            <div className="divide-y divide-slate-200">
              {duplicateLog.slice(0, 20).map((item, idx) => (
                <div key={idx} className="p-2 flex justify-between items-center bg-white">
                  <div className="flex flex-col">
                    <span className="font-mono text-sm">{item.sku}</span>
                    <span className="text-xs text-slate-500">
                      Pos {item.scanPosition} → {item.otherPosition} | {item.zone}
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${
                    item.isRepeatedChunk ? 'text-orange-600' : 
                    item.isNearbyDuplicate ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {item.isRepeatedChunk ? 'REPEATED CHUNK' : item.isNearbyDuplicate ? 'NEARBY' : 'DUPLICATE'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={handleDownloadDuplicateLog} className="btn-secondary w-full">
          Download Duplicate Scan Log
        </button>
      </div>

      {/* 2 OH Write-Up Candidates */}
      <div className="card border-2 border-yellow-200 bg-yellow-50">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          📈 2 OH Write-Up Candidates
        </h2>
        <div className="text-sm text-slate-600 mb-4">
          Items with exactly 2 on-hand that may need inventory written up. (Populated after inventory file comparison)
        </div>
        <div className="text-center py-8 text-slate-500">
          ℹ️ This section will be populated after comparing scanned items against your inventory file. Run a cycle count to generate this list.
        </div>
      </div>

      {/* Email Option */}
      <div className="card">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Email to Me
        </h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Send to</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
            <input
              type="text"
              value={`Cycle Count Results - ${countData.storeName || 'Store'} - ${new Date().toLocaleDateString()}`}
              readOnly
              className="input-field bg-slate-50"
            />
          </div>
          <button 
            onClick={handleEmail}
            className="btn-primary w-full"
          >
            {emailSent ? '✓ Email Sent!' : '📧 Email Me These Files'}
          </button>
        </div>
      </div>

      {/* Additional Processing */}
      <div className="card bg-blue-50 border border-blue-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Want to go further?
        </h2>
        <p className="text-slate-600 mb-4">
          Your basic write-off list is ready. I can also:
        </p>
        <ul className="space-y-2 text-slate-700 mb-4">
          <li>• Deduplicate SKUs (combine qty for same SKU)</li>
          <li>• Add reason codes (C-Cycl, S-Loss, etc.)</li>
          <li>• Group by category for organized DRS entry</li>
          <li>• Generate printable barcode sheet</li>
        </ul>
        <div className="flex gap-3">
          <button onClick={onNext} className="btn-primary">
            Continue Processing
          </button>
          <button className="btn-secondary">
            No Thanks — Use Current List
          </button>
        </div>
      </div>

      {/* Barcode ZIP Processing */}
      <div className="card border-2 border-purple-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          🖨️ Process Barcode Images
        </h2>
        <p className="text-slate-600 mb-4">
          Upload a ZIP file from <a href="https://www.barcodegenerator.tech/Code128" target="_blank" rel="noopener" className="text-primary hover:underline">barcodegenerator.tech</a> to create printable barcode sheets.
        </p>
        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <div className="text-sm font-medium text-purple-800 mb-2">How it works:</div>
          <ol className="text-sm text-purple-700 space-y-1 list-decimal list-inside">
            <li>Go to barcodegenerator.tech, select Code 128</li>
            <li>Upload your SKU list or enter SKUs manually</li>
            <li>Download as ZIP (contains ~200 PNG files)</li>
            <li>Upload the ZIP here - we'll create 5x22 page layouts</li>
          </ol>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            📁 Upload Barcode ZIP
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="btn-secondary">
          ← Back
        </button>
        <button onClick={onNext} className="btn-primary">
          Continue →
        </button>
      </div>
    </div>
  )
}

export default ExportResults
