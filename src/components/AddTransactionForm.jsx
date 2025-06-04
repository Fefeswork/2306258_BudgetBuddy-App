import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import '../css/AddTransactionForm.css'
import '../css/style.css'

export default function AddTransactionForm() {
  const { dispatch } = useAppContext()

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense') //  creating a new state

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!description || !amount) return

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type, // NEW field added to the transaction object
    }

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction })

    // Reset form
    setDescription('')
    setAmount('')
    setType('expense')
  }

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      {/*Transaction Type Dropdown */}
      <h2>Manage Transactions</h2>
      <label>
        Transaction Type
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </label>

      <label>
        Description
        <input
          type="text"
          placeholder="e.g. Groceries"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <label>
        Amount (R)
        <input
          type="number"
          placeholder="e.g. 100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>

      <button type="submit" className="btn">Add</button>
    </form>
  )
}
