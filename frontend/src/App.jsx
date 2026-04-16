import { useState } from 'react'
import Welcome from './screens/Welcome'
import PrepareFiles from './screens/PrepareFiles'
import ConductScan from './screens/ConductScan'
import Processing from './screens/Processing'
import ReviewItems from './screens/ReviewItems'
import ExportResults from './screens/ExportResults'
import DRSInstructions from './screens/DRSInstructions'
import FAQ from './screens/FAQ'
import Security from './screens/Security'

const SCREENS = {
  welcome: 'welcome',
  prepareFiles: 'prepareFiles',
  conductScan: 'conductScan',
  processing: 'processing',
  reviewItems: 'reviewItems',
  exportResults: 'exportResults',
  drsInstructions: 'drsInstructions',
  faq: 'faq',
  security: 'security',
}

const STEP_LABELS = [
  'Welcome',
  'Prepare Files',
  'Conduct Scan',
  'Processing',
  'Review Items',
  'Export',
]

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [countData, setCountData] = useState({
    storeName: '',
    storeNumber: '',
    countType: '',
    inventoryFile: null,
    scanFile: null,
    scannedItems: [],
    missingItems: [],
    acceptedItems: [],
    skippedItems: [],
  })

  const currentStep = Object.keys(SCREENS).indexOf(currentScreen)
  
  const goToScreen = (screen) => {
    setCurrentScreen(screen)
    window.scrollTo(0, 0)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.welcome:
        return <Welcome onNext={() => goToScreen(SCREENS.prepareFiles)} />
      case SCREENS.prepareFiles:
        return <PrepareFiles 
                countData={countData} 
                setCountData={setCountData}
                onNext={() => goToScreen(SCREENS.conductScan)}
                onBack={() => goToScreen(SCREENS.welcome)}
              />
      case SCREENS.conductScan:
        return <ConductScan 
                countData={countData}
                setCountData={setCountData}
                onNext={() => goToScreen(SCREENS.processing)}
                onBack={() => goToScreen(SCREENS.prepareFiles)}
              />
      case SCREENS.processing:
        return <Processing 
                countData={countData}
                setCountData={setCountData}
                onComplete={() => goToScreen(SCREENS.reviewItems)}
              />
      case SCREENS.reviewItems:
        return <ReviewItems 
                countData={countData}
                setCountData={setCountData}
                onNext={() => goToScreen(SCREENS.exportResults)}
                onBack={() => goToScreen(SCREENS.conductScan)}
              />
      case SCREENS.exportResults:
        return <ExportResults 
                countData={countData}
                setCountData={setCountData}
                onNext={() => goToScreen(SCREENS.drsInstructions)}
                onBack={() => goToScreen(SCREENS.reviewItems)}
              />
      case SCREENS.drsInstructions:
        return <DRSInstructions 
                onHome={() => goToScreen(SCREENS.welcome)}
                onFAQ={() => goToScreen(SCREENS.faq)}
                onSecurity={() => goToScreen(SCREENS.security)}
              />
      case SCREENS.faq:
        return <FAQ onBack={() => goToScreen(SCREENS.drsInstructions)} />
      case SCREENS.security:
        return <Security onBack={() => goToScreen(SCREENS.drsInstructions)} />
      default:
        return <Welcome onNext={() => goToScreen(SCREENS.prepareFiles)} />
    }
  }

  // Hide progress bar on certain screens
  const hideProgress = ['processing', 'faq', 'security'].includes(currentScreen)

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏪</span>
            <h1 className="text-xl font-semibold text-slate-800">Mini Cycle Count</h1>
          </div>
          {currentScreen !== 'welcome' && currentScreen !== 'faq' && currentScreen !== 'security' && (
            <button 
              onClick={() => goToScreen(SCREENS.welcome)}
              className="text-sm text-slate-500 hover:text-primary"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {renderScreen()}
      </main>

      {/* Progress Bar */}
      {!hideProgress && currentScreen !== 'welcome' && currentScreen !== 'drsInstructions' && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg">
          <div className="max-w-3xl mx-auto px-6 py-4">
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-4">
              {STEP_LABELS.map((label, idx) => (
                <div key={label} className="flex items-center">
                  <div 
                    className={`progress-step ${
                      idx < currentStep ? 'progress-step-complete' :
                      idx === currentStep ? 'progress-step-active' :
                      'progress-step-pending'
                    }`}
                  >
                    {idx < currentStep ? '✓' : idx + 1}
                  </div>
                  {idx < STEP_LABELS.length - 1 && (
                    <div 
                      className={`w-8 h-1 mx-1 rounded ${
                        idx < currentStep ? 'bg-success' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-slate-500">
              Step {currentStep + 1} of {STEP_LABELS.length}: {STEP_LABELS[currentStep]}
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App
