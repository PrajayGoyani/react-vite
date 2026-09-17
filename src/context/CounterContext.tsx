import { createContext, useContext, type Dispatch } from "react"
import type { CountAction } from "../reducers/reducers"

interface CounterContextType {
  countState: number
  dispatchCount: Dispatch<CountAction>
}

export const CounterContext = createContext<CounterContextType | null>(null)

export function useCounter(): CounterContextType {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider')
  }
  return context
}