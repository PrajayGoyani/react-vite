import { useEffect, type ReactNode } from 'react'
import { useCountReducer } from '../reducers/reducers'
import { CounterContext } from './CounterContext'

interface CounterProviderProps {
  children: ReactNode
}

export default function CounterProvider({ children }: CounterProviderProps) {
  const [state, dispatch] = useCountReducer()

  useEffect(() => {
    console.log('Hello world')
  }, [])

  useEffect(() => {
    console.log(`Count: ${state.count}`)
  }, [state.count])

  return (
    <CounterContext value={{ countState: state.count, dispatchCount: dispatch }}>
      {children}
    </CounterContext>
  )
}
