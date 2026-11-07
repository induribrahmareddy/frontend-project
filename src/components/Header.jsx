import { useState } from 'react'

function Header({ session, onNavigate, onLogout, currentPage = 'home' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleNavLinkClick(event, targetId) {
    event.preventDefault()
    closeMenu()
    if (currentPage === 'home' || currentPage === 'portal') {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    // If not on homepage, navigate to home and then scroll
    onNavigate('home')
    setTimeout(() => {
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  function handleLogoClick(event) {
    event.preventDefault()
    closeMenu()
    onNavigate('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isAdmin = session?.role === 'admin'

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <a href="#home" className="logo" onClick={handleLogoClick}>
          🎮 Game<span className="logo-accent">Arena</span>
        </a>

        <nav className={`nav-menu${menuOpen ? ' mobile-active' : ''}`} aria-label="Main navigation">
          <a
            href="#home"
            className="nav-link"
            onClick={(e) => handleNavLinkClick(e, 'home')}
          >
            Home
          </a>
          <a
            href="#games"
            className="nav-link"
            onClick={(e) => handleNavLinkClick(e, 'games')}
          >
            Games
          </a>
          <a
            href="#tournaments"
            className="nav-link"
            onClick={(e) => handleNavLinkClick(e, 'tournaments')}
          >
            Tournaments
          </a>
          <a
            href="#about"
            className="nav-link"
            onClick={(e) => handleNavLinkClick(e, 'about')}
          >
            About
          </a>

          {/* Mobile-only action buttons inside menu drawer */}
          <div className="mobile-menu-actions">
            {session ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline btn-block nav-btn-dashboard"
                  onClick={() => {
                    closeMenu()
                    onNavigate('dashboard')
                  }}
                >
                  {isAdmin ? '🛡️ Admin Dashboard' : '👤 My Dashboard'}
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-block nav-btn-logout"
                  onClick={() => {
                    closeMenu()
                    onLogout()
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-outline btn-block nav-btn-login"
                  onClick={() => {
                    closeMenu()
                    onNavigate('login')
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-block nav-btn-signup"
                  onClick={() => {
                    closeMenu()
                    onNavigate('signup')
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Desktop actions on right side */}
        <div className="nav-actions">
          {session ? (
            <>
              <button
                type="button"
                className="btn btn-outline nav-btn-dashboard"
                onClick={() => onNavigate('dashboard')}
              >
                {isAdmin ? '🛡️ Admin Dashboard' : '👤 My Dashboard'}
              </button>
              <button
                type="button"
                className="btn btn-outline nav-btn-logout"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-outline nav-btn-login"
                onClick={() => onNavigate('login')}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary nav-btn-signup"
                onClick={() => onNavigate('signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}

export function DashboardHeader({ onPortal, onLogout, name, role }) {
  return (
    <header className="dashboard-header">
      <a
        className="dashboard-brand"
        href="/"
        onClick={(event) => {
          event.preventDefault()
          onPortal()
        }}
      >
        🎮 Game<span className="logo-accent">Arena</span>
      </a>
      <nav aria-label="Dashboard navigation">
        {name && (
          <span className="dashboard-user-badge">
            {role === 'admin' ? '🛡️ Admin: ' : '👤 '}
            {name}
          </span>
        )}
        <button type="button" onClick={onPortal}>Public Portal</button>
        <button type="button" onClick={onLogout}>Logout</button>
      </nav>
    </header>
  )
}

export default Header
