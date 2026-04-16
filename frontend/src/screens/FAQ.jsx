import { useState } from 'react'

function FAQ({ onBack }) {
  const [openSection, setOpenSection] = useState('general')

  const sections = {
    general: {
      title: 'General',
      questions: [
        {
          q: "How is this different from a full physical count?",
          a: "A full physical count (RGIS/Datascan) scans every item in the store. This tool lets you scan a subset — one category, date range, or zone at a time. It's faster, cheaper, and can be done more frequently."
        },
        {
          q: "How often should I run a partial count?",
          a: "Monthly is ideal for high-traffic stores. Quarterly works for lower-volume locations. Always run before a major clearance event to catch drift early."
        },
        {
          q: "Can I use this if I don't have a barcode scanner?",
          a: "Yes. You can upload a scan file from a dedicated scanner, or manually enter SKUs one by one in the scan field."
        }
      ]
    },
    files: {
      title: 'Files & Data',
      questions: [
        {
          q: "My file is too large (>10,000 rows). What do I do?",
          a: "Split your DRS export into multiple date ranges. For example: Jan–Mar, Apr–Jun, Jul–Sep separately."
        },
        {
          q: "The tool says my file has no valid data.",
          a: "Make sure you're uploading the Item Buy Detail, not the Summary Report. Check that columns include SKU, Buy Date, Cost, and Retail."
        }
      ]
    },
    hardware: {
      title: 'Hardware',
      questions: [
        {
          q: "My scanner isn't working.",
          a: "Try clicking the scan field first. Some scanners require the field to be focused. Also ensure no other app has the scanner bound."
        },
        {
          q: "Can I use a phone instead of a laptop?",
          a: "Yes, but a laptop or tablet is recommended for larger screens. Phones work but require more scrolling."
        }
      ]
    },
    drs: {
      title: 'DRS & Write-Offs',
      questions: [
        {
          q: "What happens if I enter the wrong reason code?",
          a: "It can cause reporting issues. Use C-Cycl for cycle counts, S-Loss for shrink. Avoid S-Misc unless truly necessary."
        },
        {
          q: "Can I undo a write-off in DRS?",
          a: "Yes, but it requires supervisor access. Contact your DM if you've made an error."
        }
      ]
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <button onClick={onBack} className="hover:text-primary">← Back</button>
        <span>|</span>
        <span>FAQ</span>
      </div>

      <h1 className="text-2xl font-bold text-slate-800">Frequently Asked Questions</h1>

      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            onClick={() => setOpenSection(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              openSection === key 
                ? 'bg-primary text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {sections[openSection].questions.map((item, idx) => (
          <div key={idx} className="card">
            <h3 className="font-semibold text-slate-800 mb-2">{item.q}</h3>
            <p className="text-slate-600">{item.a}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button onClick={onBack} className="btn-secondary">
          ← Back
        </button>
      </div>
    </div>
  )
}

export default FAQ
