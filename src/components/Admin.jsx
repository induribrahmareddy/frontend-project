import { useState } from 'react'
import { DashboardHeader } from './Header.jsx'

const defaultFeatured = [
  { name: 'Smash Karts Championship', game: 'SMASH KARTS', prize: '₹15,000', date: 'Sep 12', players: '24 Players' },
  { name: 'Battle Arena Championship', game: 'BGMI', prize: '₹50,000', date: 'Sep 18', players: '64 Teams' },
  { name: 'Free Fire Clash', game: 'FREE FIRE', prize: '₹35,000', date: 'Sep 22', players: '48 Teams' },
]

function Admin({ name, tournaments = [], onAddTournament, onRemoveTournament, onPortal, onLogout }) {
  const [feedback, setFeedback] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const tournName = formData.get('tournament')?.toString().trim()
    const game = formData.get('game')?.toString().trim()
    const date = formData.get('date')?.toString().trim()
    const prize = formData.get('prize')?.toString().trim()
    const players = formData.get('players')?.toString().trim()

    if (tournName && game && date) {
      onAddTournament({
        name: tournName,
        game,
        date,
        prize: prize || '₹25,000 Pool',
        players: players || '32 Teams',
      })
      setFeedback(`✓ Tournament "${tournName}" created successfully and published to the public portal!`)
      event.currentTarget.reset()
      setTimeout(() => setFeedback(''), 4000)
    }
  }

  function handleDelete(id, tournName) {
    onRemoveTournament(id)
    setFeedback(`Deleted tournament "${tournName}".`)
    setTimeout(() => setFeedback(''), 3000)
  }

  const totalEvents = defaultFeatured.length + tournaments.length

  return (
    <div className="dashboard-page">
      <DashboardHeader onPortal={onPortal} onLogout={onLogout} name={name} role="admin" />
      <main className="dashboard-main">
        {feedback && (
          <div className="tournament-alert-success" role="status">
            {feedback}
          </div>
        )}

        <section className="welcome-panel">
          <div>
            <div className="admin-badge-strip">
              <span className="eyebrow">ADMINISTRATOR CONTROL PANEL</span>
              <span className="admin-status-pill">🛡️ MASTER ADMIN</span>
            </div>
            <h1>
              Welcome, <span className="highlight-player">{name}</span>
            </h1>
            <p>
              Signed in as <code>admin@gmail.com</code>. Manage community tournaments, publish events, and update the live portal.
            </p>
          </div>
          <div className="welcome-actions">
            <button className="dashboard-button" type="button" onClick={onPortal}>
              View Live Public Portal 🎮
            </button>
          </div>
        </section>

        {/* Admin overview stats */}
        <section className="stats-grid" aria-label="Admin overview">
          <article className="stat-card">
            <p>Admin-Added Tournaments</p>
            <strong className="highlight-gold">{tournaments.length}</strong>
            <small>Custom events managed by you</small>
          </article>
          <article className="stat-card">
            <p>Total Live Events</p>
            <strong>{totalEvents}</strong>
            <small>3 default + {tournaments.length} custom</small>
          </article>
          <article className="stat-card">
            <p>Portal Status</p>
            <strong className="stat-word highlight-green">Active</strong>
            <small>Public server online & accessible</small>
          </article>
          <article className="stat-card">
            <p>Administrator Role</p>
            <strong className="stat-word highlight-player">Tournament Manager</strong>
            <small>Full publish and remove rights</small>
          </article>
        </section>

        {/* Tournament Creation Form */}
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">EVENT CREATION</p>
              <h2>Publish New Tournament</h2>
            </div>
          </div>
          <p className="panel-copy">
            Fill in the tournament details below. The event will appear immediately on the public homepage and in player registration lists.
          </p>
          <form className="tournament-form admin-form-grid" onSubmit={handleSubmit}>
            <label>
              Tournament Name *
              <input
                name="tournament"
                type="text"
                placeholder="e.g. Apex Squad Championship"
                required
              />
            </label>
            <label>
              Game Title *
              <input
                name="game"
                type="text"
                placeholder="e.g. BGMI, Free Fire, COD Mobile"
                required
              />
            </label>
            <label>
              Prize Pool (Optional)
              <input
                name="prize"
                type="text"
                placeholder="e.g. ₹50,000"
              />
            </label>
            <label>
              Slots / Format (Optional)
              <input
                name="players"
                type="text"
                placeholder="e.g. 64 Teams or 32 Players"
              />
            </label>
            <label>
              Event Date *
              <input
                name="date"
                type="date"
                required
              />
            </label>
            <button className="dashboard-button btn-publish" type="submit">
              + Publish to Portal
            </button>
          </form>
        </section>

        {/* Custom Tournaments Management List */}
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">MANAGE EVENTS</p>
              <h2>Your Custom Tournaments ({tournaments.length})</h2>
            </div>
            <span className="count-label">{tournaments.length} custom events</span>
          </div>

          <div className="dashboard-list">
            {tournaments.length === 0 ? (
              <div className="empty-state-box">
                <p className="empty-state">No custom tournaments created yet. Use the form above to add your first event.</p>
              </div>
            ) : (
              tournaments.map((tournament) => (
                <article className="dashboard-item" key={tournament.id}>
                  <div>
                    <strong>🏆 {tournament.name}</strong>
                    <p>
                      Game: <strong>{tournament.game}</strong> · Prize: <span className="highlight-gold">{tournament.prize || '₹25,000'}</span> · Slots: {tournament.players || 'Open'} · Date: {tournament.date}
                    </p>
                  </div>
                  <div className="dashboard-item-actions">
                    <button
                      className="small-button btn-view-soft"
                      type="button"
                      onClick={onPortal}
                    >
                      View on Portal
                    </button>
                    <button
                      className="small-button btn-danger-soft"
                      type="button"
                      onClick={() => handleDelete(tournament.id, tournament.name)}
                    >
                      Delete Event
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Built-in Featured Tournaments Overview */}
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">PORTAL SHOWCASE</p>
              <h2>Default Platform Tournaments (3)</h2>
            </div>
            <span className="count-label">System Default</span>
          </div>
          <div className="dashboard-list">
            {defaultFeatured.map((tourn) => (
              <article className="dashboard-item default-item" key={tourn.name}>
                <div>
                  <strong>🎮 {tourn.name}</strong>
                  <p>Game: {tourn.game} · Prize: <span className="highlight-gold">{tourn.prize}</span> · Slots: {tourn.players} · Date: {tourn.date}</p>
                </div>
                <span className="status-confirmed">Live on Homepage</span>
              </article>
            ))}
          </div>
        </section>

        {/* Navigation Actions */}
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">NAVIGATION</p>
              <h2>Quick Actions</h2>
            </div>
          </div>
          <div className="manage-links">
            <button type="button" className="btn btn-primary" onClick={onPortal}>
              Open Public Gaming Portal 🏠
            </button>
            <button type="button" className="btn btn-outline" onClick={onLogout}>
              Logout of Admin Session 🚪
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Admin
