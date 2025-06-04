import { createContext, useContext, useReducer } from 'react'
import dayjs from 'dayjs'

// Mock data — now includes `type`
const mockTransactions = [
  {
    id: 1,
    description: 'Groceries',
    amount: 350,
    type: 'expense',
    date: dayjs().subtract(2, 'day').toISOString(),
  },
  {
    id: 2,
    description: 'Freelance Income',
    amount: 1200,
    type: 'income',
    date: dayjs().subtract(3, 'day').toISOString(),
  },
  {
    id: 3,
    description: 'Electricity Bill',
    amount: 500,
    type: 'expense',
    date: dayjs().subtract(4, 'day').toISOString(),
  },
  {
    id: 4,
    description: 'Bill',
    amount: 500,
    type: 'expense',
    date: dayjs().subtract(6, 'day').toISOString(),
  },
  {
    id: 5,
    description: 'Freelance Income',
    amount: 1200,
    type: 'income',
    date: dayjs().subtract(10, 'day').toISOString(),
  },
]

// Initial state
const initialState = {
  user: {
    name: '',
  },
  budget: 0,
  transactions: mockTransactions,
  loading: false,
}

// Reducer — lightly extended to support `type`
function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER_NAME':
      return {
        ...state,
        user: { ...state.user, name: action.payload },
      }

    case 'SET_BUDGET':
      return {
        ...state,
        budget: action.payload,
      }

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}

// Context setup
const AppContext = createContext()

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook
export const useAppContext = () => useContext(AppContext)
