import { useReducer, type Reducer } from 'react'

export interface CountState {
  count: number
}

export type CountAction =
  | { type: 'increment'; payload?: number }
  | { type: 'decrement'; payload?: number }
  | { type: 'reset' }
  | { type: 'set'; payload: number }

const initialState: CountState = {
  count: 0,
}

export const countReducer: Reducer<CountState, CountAction> = (state, action) => {
  switch (action.type) {
    case 'increment': {
      return {
        ...state,
        count: state.count + (action.payload || 1),
      }
    }

    case 'decrement': {
      const count = state.count - (action.payload || 1)
      return {
        ...state,
        count: count < 0 ? 0 : count,
      }
    }

    case 'reset':
      return {
        ...state,
        ...initialState,
      }

    case 'set':
      return {
        ...state,
        count: action.payload,
      }

    default:
      return state
  }
}

export function useCountReducer() {
  return useReducer(countReducer, initialState)
}
