import { useAppContext } from '../context/AppContext'
import { useEffect, useState } from 'react'
import AddTransactionForm from '../components/AddTransactionForm'
import dayjs from 'dayjs'
import '../css/Transactions.css'
import '../css/Loader.css'
import '../css/style.css'

export default function Transactions() {
  const { state } = useAppContext()
  const { transactions } = state
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timeout)
  }, [])

  if (loading) {
    return (
      <div className="container">
        <div className="skeleton skeleton-title"></div>

        <div className="transactions-layout">
          <div className="transactions-main">
            <div className="card" style={{ padding: '1.5rem' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton skeleton-line"></div>
              ))}
            </div>
            <div className="card" style={{ marginTop: '2rem', padding: '1.5rem' }}>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="skeleton skeleton-line"></div>
              ))}
            </div>
          </div>

          <div className="transactions-sidebar">
            <div className="card" style={{ padding: '1.5rem' }}>
              <div className="skeleton skeleton-line"></div>
              <div className="skeleton skeleton-line"></div>
              <div className="skeleton skeleton-line"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const groupedByMonth = transactions.reduce((acc, tx) => {
    const month = dayjs(tx.date).format('MMMM YYYY')
    acc[month] = acc[month] || []
    acc[month].push(tx)
    return acc
  }, {})

  const upcoming = transactions.filter(tx => dayjs(tx.date).isAfter(dayjs(), 'day'))

  return (
    <div className="container">
      <h2 className="transactions-heading">Transactions</h2>

      <div className="transactions-layout">
        {/* Left column - transactions list */}
        <div className="transactions-main">
          <div className="transactions-section">
            <h3 className="transactions-title">Monthly Breakdown</h3>
            {Object.entries(groupedByMonth).map(([month, list]) => (
              <div key={month}>
                <h4 className="month-title">{month}</h4>
                <ul className="transaction-list">
                  {list.map((tx, i) => (
                    <li key={i} className="transaction-item">
                      <div className="transaction-left">
                        <p>{tx.category || (tx.type === 'income' ? 'Income' : 'Expense')}</p>
                        <p className="transaction-note">{tx.description || 'description'}</p>
                      </div>
                      <div className="transaction-right">
                        <p className={`transaction-amount ${tx.type}`}>
                          R{parseFloat(tx.amount).toFixed(2)}
                        </p>
                        <p className="transaction-note">{dayjs(tx.date).format('DD MMM')}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {transactions.length === 0 && (
              <p className="no-transactions">No transactions yet.</p>
            )}
          </div>

          <div className="transactions-section">
            <h3 className="transactions-title">Upcoming Payments</h3>
            {upcoming.length > 0 ? (
              <ul className="transaction-list">
                {upcoming.map((tx, i) => (
                  <li key={i} className="transaction-item">
                    <div className="transaction-left">
                      <p>{tx.category || (tx.type === 'income' ? 'Income' : 'Expense')}</p>
                      <p className="transaction-note">{tx.note || 'Scheduled payment'}</p>
                    </div>
                    <div className="transaction-right">
                      <p className={`transaction-amount upcoming-amount ${tx.type}`}>
                        R{parseFloat(tx.amount).toFixed(2)}
                      </p>
                      <p className="transaction-note">{dayjs(tx.date).format('DD MMM')}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-transactions">No upcoming transactions.</p>
            )}
          </div>
        </div>

        {/* Right column - Add transaction form */}
        <div className="transactions-sidebar">
          <AddTransactionForm />
        </div>
      </div>
    </div>
  )
}
