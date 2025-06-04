import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budget from './pages/Budget'
import Design from './pages/Design';
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Onboarding from './pages/Onboarding'
import Sidebar from './components/Sidebar'
import './css/style.css'

export default function App() {
  const { state } = useAppContext()
  const { user, budget } = state
  const navigate = useNavigate()
  const location = useLocation()
  const hideSidebar = location.pathname === '/onboarding';  //defining 'hideSideBar

  useEffect(() => {
    if ((!user.name || budget === 0) && location.pathname !== '/onboarding') {
      navigate('/onboarding')
    }
  }, [user.name, budget, location.pathname, navigate])

  return (
    <div className="app-container">
      {!hideSidebar && <Sidebar />} 
      <div className={`main-content ${hideSidebar ? 'no-sidebar' : ''}`}>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/design" element={<Design />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}
