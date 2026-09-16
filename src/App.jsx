import './App.css'
import Default from './components/Default'
import { CounterProvider } from './context/CounterContext'

function App() {
  return (
    <>
      <CounterProvider>
        <Default />
      </CounterProvider>
    </>
  )
}

export default App
