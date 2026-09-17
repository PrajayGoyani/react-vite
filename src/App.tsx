import { useState } from 'react'
import './App.css'
import Default from './components/Default'
import LibraryApp from './components/LibraryApp'
import { CounterProvider } from './context/CounterContext'

type TabType = 'library' | 'counter'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('library')

  return (
    <>
      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'library' ? 'active' : ''}`}
          onClick={() => setActiveTab('library')}
        >
          Library Store (Zustand)
        </button>
        <button
          className={`nav-btn ${activeTab === 'counter' ? 'active' : ''}`}
          onClick={() => setActiveTab('counter')}
        >
          Counter Demo
        </button>
      </nav>

      {activeTab === 'library' && <LibraryApp />}

      {activeTab === 'counter' && (
        <CounterProvider>
          <Default />
        </CounterProvider>
      )}
    </>
  )
}

export default App
