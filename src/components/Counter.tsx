import { useCountReducer } from '../reducers/reducers'

export interface CounterProps {
  label: string
}

export default function Counter({ label }: CounterProps) {
  const [state, dispatch] = useCountReducer()

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button
        type="button"
        className="counter"
        onClick={() => dispatch({ type: 'decrement', payload: 5 })}
      >
        -5
      </button>
      <button
        type="button"
        className="counter"
        onClick={() => dispatch({ type: 'decrement' })}
      >
        -
      </button>
      <button
        type="button"
        className="counter"
        onClick={(e) => e.preventDefault()}
      >
        {label} is {state.count}
      </button>
      <button
        type="button"
        className="counter"
        onClick={() => dispatch({ type: 'increment' })}
      >
        +
      </button>
      &nbsp;&nbsp;
      <button
        type="button"
        className="counter"
        onClick={() => dispatch({ type: 'reset' })}
      >
        Reset
      </button>
      <button
        type="button"
        className="counter"
        onClick={() => dispatch({ type: 'increment', payload: 5 })}
      >
        +5
      </button>
    </div>
  )
}
