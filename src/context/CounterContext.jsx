import { createContext, useState, useContext, useEffect } from "react"
import { useCountReducer } from "../reducers/reducers"

const CounterContext = createContext()

export function CounterProvider({ children }) {
  // const [count, setCount] = useState(0)
  const [state, dispatch] = useCountReducer()

  useEffect(() => {
    console.log('Hello world')
  }, [])

  useEffect(() => {
    console.log(`Count: ${state.count}`)
  }, [state.count])

  // const increment = () => setCount(count + 1)
  // const decrement = () => {
  //   if (count > 0) {
  //     setCount(count - 1)
  //   }
  // }

  return (
    // <CounterContext value={{ count, increment, decrement }}>
    <CounterContext value={{ countState: state.count, dispatchCount: dispatch }}>
      {children}
    </CounterContext>
  )
}

export function useCounter() {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider')
  }
  return context
}