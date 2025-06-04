import { useAppContext } from '../context/AppContext'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect,useState } from 'react'
import '../css/Budget.css'
import '../css/Loader.css' // Loading state for Budget page 
import '../css/style.css'


const COLORS = ['#3b82f6', '#10b981']


// Loading state for Budget page 
export default function Budget() {
  const { state, dispatch } = useAppContext()
  const { transactions, budget} = state
  const [newBudget, setNewBudget] = useState(budget.toString())
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const timeout = setTimeout(() => setLoading(false), 3000) // simulate page loading
      return () => clearTimeout(timeout)
    }, [])

  if (loading) {
    return (
      <div className="container">
        <div className="skeleton skeleton-title"></div>

        <div className="budget-grid">
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="skeleton skeleton-circle"></div>
            <div className="skeleton skeleton-line"></div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line"></div>
          </div>
        </div>
      </div>
    )
  }

  const totalSpent = transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0)
  const remaining = budget - totalSpent

  const chartData = [
    { name: 'Spent', value: totalSpent },
    { name: 'Remaining', value: remaining < 0 ? 0 : remaining },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = parseFloat(newBudget)
    if (isNaN(value) || value <= 0) {
      setMessage('Enter a valid positive number')
      return
    }
    dispatch({ type: 'SET_BUDGET', payload: value })
    setMessage('Budget updated!')
    setTimeout(() => setMessage(''), 2500)
  }

  if (loading) {
    return <div className="text-center py-10">Loading Budget Page...</div>
  }

  //content for the charts and form

  return (
    <div className="container">
      <h2 className="budget-heading">Manage Budget</h2>

      <div className="budget-grid">
        {/* Budget Usage Chart */}
        <div className="budget-card">
          <h3 className="budget-card-title">Budget Usage</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.9rem', color: '#6b7280' }}>
            R{totalSpent.toFixed(2)} spent out of R{budget.toFixed(2)}
          </p>
        </div>

        {/* Budget Update Form */}
        <div className="budget-card">
          <h3 className="budget-card-title">Set Monthly Budget</h3>
          <form onSubmit={handleSubmit} className="budget-form">
            <label htmlFor="budget">Monthly Budget (R)</label>
            <input
              type="number"
              id="budget"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              step="0.01"
              min="0"
            />
            <button type="submit">Save Budget</button>
            {message && <p className="budget-message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
