import { useState, useEffect } from 'react'

function Processing({ countData, setCountData, onComplete }) {
  const [stage, setStage] = useState(0)
  const stages = [
    'Parsing your inventory file...',
    'Matching scanned items against inventory...',
    'Identifying missing items...',
    'Flagging items not in DRS...',
    'Building working dataset...',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStage(prev => {
        if (prev < stages.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          // Auto-advance after processing
          setTimeout(() => {
            // Generate some sample data for demo
            const sampleMissing = generateSampleMissingItems()
            setCountData(prev => ({ ...prev, missingItems: sampleMissing }))
            onComplete()
          }, 1500)
          return prev
        }
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  // Generate sample data for demo
  function generateSampleMissingItems() {
    const brands = ['Nike', 'Adidas', 'H&M', 'Zara', 'Levi\'s', 'Gap', 'Under Armour', 'Champion']
    const categories = ['Jeans', 'Tops', 'Shoes', 'Shorts', 'Dresses', 'Jackets']
    const items = []
    
    for (let i = 0; i < 47; i++) {
      items.push({
        sku: `SK${Math.floor(100000 + Math.random() * 900000)}`,
        brand: brands[Math.floor(Math.random() * brands.length)],
        description: `${categories[Math.floor(Math.random() * categories.length)]} Item ${i + 1}`,
        size: `${Math.floor(4 + Math.random() * 12)}`,
        buyDate: `2025-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
        cost: (Math.random() * 10 + 2).toFixed(2),
        retail: (Math.random() * 30 + 10).toFixed(2),
        category: categories[Math.floor(Math.random() * categories.length)],
        status: 'missing'
      })
    }
    return items
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
      <div className="text-6xl animate-spin">⏳</div>
      
      <div className="text-2xl font-semibold text-slate-800">
        Processing...
      </div>

      <div className="card w-full max-w-md">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          What's Happening in the Background
        </h2>
        <ul className="space-y-3">
          {stages.map((label, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                idx < stage ? 'bg-success text-white' :
                idx === stage ? 'bg-primary text-white animate-pulse' :
                'bg-slate-200 text-slate-500'
              }`}>
                {idx < stage ? '✓' : idx + 1}
              </span>
              <span className={idx <= stage ? 'text-slate-800' : 'text-slate-400'}>
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-slate-500">
        This usually takes 30 seconds to 2 minutes. Please don't close this page.
      </p>
    </div>
  )
}

export default Processing
