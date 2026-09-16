import { useReducer } from 'react'

const initialState = {
  count: 0
}

export function countReducer(state, action) {
  switch (action.type) {
    case 'increment': {
      return {
        ...state,
        count: state.count + (action.payload || 1)
      }
    }

    case 'decrement': {
      const count = state.count - (action.payload || 1)
      return {
        ...state,
        count: count < 0 ? 0 : count
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