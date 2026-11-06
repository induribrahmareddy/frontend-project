function Home({ onExploreTournaments, onBrowseGames }) {
  function handleScroll(e, targetId) {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge-container">
            <span className="hero-badge">🏆 GAMEARENA ESPORTS PLATFORM</span>
            <span className="hero-live-pill">
              <span className="live-dot" /> LIVE EVENTS OPEN
            </span>
          </div>

          <h1>
            COMPETE.<br />
            <span className="hero-highlight">CONQUER.</span><br />
            DOMINATE.
          </h1>

          <p>
            Welcome to GameArena — the premier gaming tournament hub. Compete against top players,
            climb leaderboard rankings, and claim your share of exciting prize pools across your favorite titles.
          </p>

          <div className="hero-buttons">
            <a
              href="#tournaments"
              className="btn btn-primary btn-large hero-btn-primary"
              onClick={(e) => (onExploreTournaments ? (e.preventDefault(), onExploreTournaments()) : handleScroll(e, 'tournaments'))}
            >
              Explore Tournaments 🏆
            </a>
            <a
              href="#games"
              className="btn btn-outline btn-large hero-btn-secondary"
              onClick={(e) => (onBrowseGames ? (e.preventDefault(), onBrowseGames()) : handleScroll(e, 'games'))}
            >
              Browse Games 🎮
            </a>
          </div>

          <div className="hero-trust-bar">
            <span>🛡️ Anti-Cheat Verified</span>
            <span>⚡ Instant Brackets</span>
            <span>💰 Guaranteed Rewards</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-spotlight-card">
            <div className="spotlight-header">
              <span className="spotlight-tag">FEATURED EVENT</span>
              <span className="spotlight-status">🟢 Registering</span>
            </div>
            <div className="spotlight-body">
              <div className="spotlight-icon-wrap" aria-hidden="true">
                🏆
              </div>
              <h3>Battle Arena Championship</h3>
              <p className="spotlight-game">BGMI • Squad Battle Royale</p>
              <div className="spotlight-stats">
                <div className="spotlight-stat">
                  <span className="stat-label">Prize Pool</span>
                  <strong className="stat-val highlight-gold">₹50,000</strong>
                </div>
                <div className="spotlight-stat">
                  <span className="stat-label">Slots</span>
                  <strong className="stat-val">64 Teams</strong>
                </div>
                <div className="spotlight-stat">
                  <span className="stat-label">Schedule</span>
                  <strong className="stat-val">Sep 18</strong>
                </div>
              </div>
            </div>
            <div className="spotlight-footer">
              <a
                href="#tournaments"
                className="spotlight-action"
                onClick={(e) => handleScroll(e, 'tournaments')}
              >
                View Tournament Details →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
