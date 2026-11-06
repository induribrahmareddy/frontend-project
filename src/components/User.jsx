import { useState } from 'react'
import { DashboardHeader } from './Header.jsx'

function User({ name, email, tournaments = [], onPortal, onLogout }) {
  const [gamesPlayed, setGamesPlayed] = useState(() => {
    return Number.parseInt(window.localStorage.getItem('gameArenaGamesPlayed') || '0', 10)
  })

  const [registeredTournaments, setRegisteredTournaments] = useState(() => {
    try {
      const saved = window.localStorage.getItem('gameArenaUserRegistrations')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [feedback, setFeedback] = useState('')

  function handlePlayMatch() {
    const nextCount = gamesPlayed + 1
    setGamesPlayed(nextCount)
    window.localStorage.setItem('gameArenaGamesPlayed', nextCount.toString())
    setFeedback('🎉 Match recorded! Keep climbing the ranks.')
    setTimeout(() => setFeedback(''), 3000)
  }

  function handleUnregister(tournTitle) {
    const updated = registeredTournaments.filter((t) => t !== tournTitle)
    setRegisteredTournaments(updated)
    window.localStorage.setItem('gameArenaUserRegistrations', JSON.stringify(updated))
    setFeedback(`Unregistered from ${tournTitle}.`)
    setTimeout(() => setFeedback(''), 3000)
  }

  const totalPlatformTournaments = 3 + tournaments.length

  return (
    <div className="dashboard-page">
      <DashboardHeader onPortal={onPortal} onLogout={onLogout} name={name} />

      <main className="dashboard-main">
        {feedback && (
          <div className="tournament-alert-success" role="status">
            {feedback}
          </div>
        )}

        <section className="welcome-panel">
          <div className="welcome-text">
            <span className="eyebrow">PLAYER CONTROL PANEL</span>
            <h1>
              Welcome, <span className="highlight-player">{name}</span>!
            </h1>
            <p>
              Manage your tournament registrations, track match activity, and dive into live competitions.
            </p>
          </div>
          <div className="welcome-actions">
            <button className="dashboard-button" type="button" onClick={onPortal}>
              Explore Gaming Portal 🎮
            </button>
            <button
              className="dashboard-button btn-match"
              type="button"
              onClick={handlePlayMatch}
            >
              Simulate Match +1
            </button>
          </div>
        </section>

        {/* Player statistics grid */}
        <section className="stats-grid" aria-label="Player statistics">
          <article className="stat-card">
            <p>Games Played</p>
            <strong>{gamesPlayed}</strong>
            <small>Your total recorded matches</small>
          </article>
          <article className="stat-card">
            <p>Registered Events</p>
            <strong className="highlight-gold">{registeredTournaments.length}</strong>
            <small>Your active tournament slots</small>
          </article>
          <article className="stat-card">
            <p>Platform Tournaments</p>
            <strong>{totalPlatformTournaments}</strong>
            <small>Active & upcoming events</small>
          </article>
          <article className="stat-card">
            <p>Account Status</p>
            <strong className="stat-word highlight-green">Verified Player</strong>
            <small>{email || 'GameArena Community Member'}</small>
          </article>
        </section>

        {/* Registered Tournaments Section */}
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">YOUR SCHEDULE</span>
              <h2>Registered Tournaments ({registeredTournaments.length})</h2>
            </div>
            <button type="button" className="text-button" onClick={onPortal}>
              Find More Tournaments →
            </button>
          </div>

          <div className="dashboard-list">
            {registeredTournaments.length === 0 ? (
              <div className="empty-state-box">
                <p className="empty-state">You haven&apos;t registered for any tournaments yet.</p>
                <button
                  type="button"
                  className="dashboard-button small-action"
                  onClick={onPortal}
                >
                  Browse Available Tournaments
                </button>
              </div>
            ) : (
              registeredTournaments.map((tournTitle) => (
                <article className="dashboard-item" key={tournTitle}>
                  <div>
                    <strong>🏆 {tournTitle}</strong>
                    <p>Status: <span className="status-confirmed">🟢 Registration Confirmed</span> · Check-in opens 30m before match</p>
                  </div>
                  <button
                    className="small-button btn-danger-soft"
                    type="button"
                    onClick={() => handleUnregister(tournTitle)}
                  >
                    Withdraw
                  </button>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Quick Portal Navigation Panel */}
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">QUICK ACCESS</span>
              <h2>GameArena Public Portal</h2>
            </div>
          </div>
          <p className="panel-copy">
            The public portal is open to browse popular games, inspect upcoming tournament prize pools,
            and view the esports leaderboards.
          </p>
          <div className="manage-links">
            <button type="button" className="btn btn-primary" onClick={onPortal}>
              Go to Public Homepage 🏠
            </button>
            <button type="button" className="btn btn-outline" onClick={onLogout}>
              Log Out of Session 🚪
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default User
