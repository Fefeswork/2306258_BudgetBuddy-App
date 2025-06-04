import { NavLink } from 'react-router-dom'
import { Home, BanknoteArrowDown , Wallet, Menu, Settings,UserPen , Palette } from 'lucide-react'
import { useState } from 'react'
import '../css/Sidebar.css'
import '../css/style.css'
import logo from '../assets/BB-Logo.png' // importing image for logo

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const toggleSidebar = () => setOpen(prev => !prev)
  const closeSidebar = () => setOpen(false)

  const getLinkClass = ({ isActive }) =>
    isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}> 
        <Menu size={20} />
      </button>

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${open ? 'visible' : ''}`}>
        <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
         <img src={logo} alt="Loading animation" style={{ width: '120px', height: '120px' }} />
       </div>
          <h1 className="sidebar-title">BudgetBuddy</h1>
          <nav className="sidebar-nav">
            <NavLink to="/" className={getLinkClass} onClick={closeSidebar}>
              <Home size={18} /> Dashboard
            </NavLink>
            <NavLink to="/transactions" className={getLinkClass} onClick={closeSidebar}>
              <BanknoteArrowDown size={18} /> Transactions
            </NavLink>
            <NavLink to="/budget" className={getLinkClass} onClick={closeSidebar}>
              <Wallet size={18} /> Budget
            </NavLink>
            <NavLink to="/design" className={getLinkClass} onClick={closeSidebar}>
              <Palette size={18} /> Design
            </NavLink>
            <NavLink to="/settings" className={getLinkClass} onClick={closeSidebar}>
              <Settings size={18} /> Settings
            </NavLink>
            <NavLink to="/profile" className={getLinkClass} onClick={closeSidebar}>
              <UserPen size={18} /> Profile
            </NavLink>
          </nav>
        </div>
        <p className="sidebar-footer">&copy; 2025 BudgetBuddy</p>
      </aside>

      {/* Backdrop for mobile */}
      {open && <div className="sidebar-backdrop" onClick={closeSidebar}></div>}
    </>
  )
}
