import { useTheme } from '../context/ThemeContext'
import { useEffect,useState } from 'react'
import '../css/Settings.css'


// Loading state for settings page 
export default function Settings() {
  const { theme, toggleTheme } = useTheme()
   const [loading, setLoading] = useState(true)
    
      useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 3000) // simulate page loading
        return () => clearTimeout(timeout)
      }, [])
  

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
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <h3 className="settings-subtitle">Toggle Display</h3>
      <div className="theme-toggle">
        <span role="img" aria-label="sun" className="theme-icon">🌞</span>

        <div
          className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}
          onClick={toggleTheme}
        >
          <div className="toggle-thumb" />
        </div>

        <span role="img" aria-label="moon" className="theme-icon">🌙</span>
      </div>
    </div>
  )
}
