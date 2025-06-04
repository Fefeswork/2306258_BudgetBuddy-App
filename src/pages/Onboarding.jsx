import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import '../css/Onboarding.css'
import loaderGif from '../assets/onboarding-loader.gif'
import logo from '../assets/BB-Logo.png' // importing image for logo
import '../css/style.css'

export default function Onboarding() {
  const { dispatch } = useAppContext()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')
  const [error, setError] = useState('')

  // Initial animation when page first loads
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000) // load time 3.0sec
    return () => clearTimeout(timeout)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !budget.trim()) {
      setError('Please fill in both fields.')
      return
    }

    setSubmitting(true)

    setTimeout(() => {
      dispatch({ type: 'SET_USER_NAME', payload: name.trim() })
      dispatch({ type: 'SET_BUDGET', payload: parseFloat(budget) })
      navigate('/')
    }, 3000) // Simulate loading delay after form submit
  }

  if (loading || submitting) {
    return (
      <div className="onboarding-loader">
        <img src={loaderGif} alt="Loading animation" />
        <p>{loading ? 'Setting up your BudgetBuddy...' : 'Preparing your dashboard...'}</p>
      </div>
    )
  }

  return (
    <div className="onboarding-container">
      <div>
         <img src={logo} alt="Loading animation" style={{ width: '150px', height: '150px' }} />
       </div>
      <h2>Welcome to BudgetBuddy 🎉</h2>
      <p>Let’s set up your name and monthly budget to get started.</p>

      <form onSubmit={handleSubmit} className="onboarding-form">
        <label>
          Your Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Anderson"
            required
          />
        </label>

        <label>
          Monthly Income (R)
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g. 50000"
            required
          />
        </label>

        {error && <p className="onboarding-error">{error}</p>}

        <button type="submit" className="btn">Get Started</button>
      </form>
    </div>
  )
}
