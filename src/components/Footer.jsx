function Footer({ session, onNavigate, onLogout }) {
  function handleLinkClick(event, targetId) {
    event.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else if (onNavigate) {
      onNavigate('home')
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <a
            href="#home"
            className="logo"
            onClick={(e) => handleLinkClick(e, 'home')}
          >
            🎮 Game<span className="logo-accent">Arena</span>
          </a>
          <p className="footer-tagline">Compete. Conquer. Become Champion.</p>
          <p className="footer-subtext">
            The premier tournament portal for competitive mobile and PC esports.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <div className="footer-nav-list">
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>
              Home
            </a>
            <a href="#games" onClick={(e) => handleLinkClick(e, 'games')}>
              Games
            </a>
            <a href="#tournaments" onClick={(e) => handleLinkClick(e, 'tournaments')}>
              Tournaments
            </a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>
              About
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <div className="footer-nav-list">
            {session ? (
              <>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => onNavigate('dashboard')}
                >
                  My Dashboard
                </button>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => onNavigate('login')}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={() => onNavigate('signup')}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        <div className="footer-col">
          <h4>Support & Contact</h4>
          <div className="footer-nav-list">
            <a href="mailto:hello@gamearena.example">Email: hello@gamearena.example</a>
            <span className="footer-text-item">Discord: discord.gg/gamearena</span>
            <span className="footer-text-item">Status: 🟢 Systems Normal</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2026 GameArena. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#rules">Fair Play Rules</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
