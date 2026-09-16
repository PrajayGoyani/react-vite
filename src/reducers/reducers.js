import { useReducer } from 'react'

const initialState = {
  count: 0
}

export function countReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
      }

    case 'decrement':
      return state.count > 0
        ? {
          ...state,
          count: state.count - 1,
        }
        : state

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