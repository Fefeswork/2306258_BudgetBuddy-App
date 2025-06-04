import { useAppContext } from '../context/AppContext'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'
import '../css/Dashboard.css'
import '../css/Loader.css'

const COLORS = ['#34d399', '#3b82f6', '#f59e0b', '#ef4444']

export default function Dashboard() {
  const { state, dispatch } = useAppContext()
  const { user, transactions, budget } = state
  const [nameInput, setNameInput] = useState(user.name)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timeout)
  }, [])

  // Updated calculations- from data
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0)

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0)

  const savings = totalIncome - totalExpenses
  const remaining = budget - totalExpenses

  // Only expense transactions grouped by category
  const categoryData = Object.values(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        const key = t.category || 'Other'
        acc[key] = acc[key] || { category: key, total: 0 }
        acc[key].total += parseFloat(t.amount)
        return acc
      }, {})
  )

  const handleNameChange = (e) => setNameInput(e.target.value)
  const updateName = () =>
    dispatch({ type: 'SET_USER_NAME', payload: nameInput.trim() || 'User' })

  if (loading) {
    return (
      <div className="container">
        <div className="skeleton skeleton-title"></div>
        <div className="dashboard-grid">
          <div className="skeleton skeleton-card"></div>
          <div className="skeleton skeleton-card"></div>
        </div>
        <div className="skeleton skeleton-circle"></div>
        <div className="card" style={{ marginTop: '2rem', padding: '1.5rem' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton skeleton-line"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="dashboard-heading">
        Welcome back, <span style={{ color: '#3b82f6' }}>{user.name}</span> 👋
      </h2>

      <div className="dashboard-grid">
        {/* Monthly Summary Bar Chart */}
        <div className="card">
          <h3 className="card-title">Monthly Summary</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Income', value: totalIncome },
                  { name: 'Expenses', value: totalExpenses },
                  { name: 'Savings', value: savings }
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Ring Pie Chart */}
        <div className="card">
          <h3 className="card-title">Budget Ring</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  data={[
                    { name: 'Spent', value: totalExpenses },
                    { name: 'Remaining', value: remaining < 0 ? 0 : remaining }
                  ]}
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="card-title">Recent Transactions</h3>
        <ul className="transaction-list">
          {transactions.slice(-4).reverse().map((tx, idx) => (
            <li key={idx} className="transaction-item">
              <div>
                <strong>{tx.category || (tx.type === 'income' ? 'Income' : 'Expense')}</strong>
                <div className="text-sm text-gray-500">
                  {tx.description || (tx.type === 'income' ? 'Income received' : 'description')}
                </div>
              </div>
              <span>R{parseFloat(tx.amount).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
