import { Routes, Route, NavLink, Navigate } from 'react-router'
import './App.css'
import Default from './components/Default'
import LibraryApp from './components/LibraryApp'
import NotFound from './components/NotFound'
import Subscription from './components/Subscription'
import CounterProvider from './context/CounterProvider'

function App() {
  return (
    <>
      <nav className="app-nav">
        <NavLink
          to="/library"
          className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
        >
          Library Store (Zustand)
        </NavLink>
        <NavLink
          to="/counter"
          className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
        >
          Counter Demo
        </NavLink>
        <NavLink
          to="/subscription"
          className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
        >
          Stripe Subscription
        </NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/library" replace />} />
          <Route path="/library" element={<LibraryApp />} />
          <Route
            path="/counter"
            element={
              <CounterProvider>
                <Default />
              </CounterProvider>
            }
          />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App


