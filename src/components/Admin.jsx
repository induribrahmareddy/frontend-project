import { DashboardHeader } from './Header.jsx'

function Admin({ name, tournaments = [], onAddTournament, onRemoveTournament, onPortal, onLogout }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const tournName = formData.get('tournament')?.toString().trim()
    const game = formData.get('game')?.toString().trim()
    const date = formData.get('date')?.toString().trim()

    if (tournName && game && date) {
      onAddTournament({
        name: tournName,
        game,
        date,
      })
      event.currentTarget.reset()
    }
  }

  return (
    <div className="dashboard-page">
      <DashboardHeader onPortal={onPortal} onLogout={onLogout} name={name} />
      <main className="dashboard-main">
        <section className="welcome-panel">
          <div>
            <p className="eyebrow">ADMINISTRATOR CONTROL PANEL</p>
            <h1>
              Welcome, <span className="highlight-player">{name}</span> (Admin)
            </h1>
            <p>Manage community tournaments and update the public gaming portal.</p>
          </div>
          <button className="dashboard-button" type="button" onClick={onPortal}>
            View Public Portal 🎮
          </button>
        </section>

        <section className="stats-grid admin-stats" aria-label="Admin overview">
          <article className="stat-card">
            <p>Managed Tournaments</p>
            <strong>{tournaments.length}</strong>
            <small>Custom events listed by admins</small>
          </article>
          <article className="stat-card">
            <p>Portal Status</p>
            <strong className="stat-word highlight-green">Active</strong>
            <small>GameArena Public Server Online</small>
          </article>
        </section>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">EVENT CREATION</p>
              <h2>Create New Tournament</h2>
            </div>
          </div>
          <form className="tournament-form" onSubmit={handleSubmit}>
            <label>
              Tournament Name
              <input
                name="tournament"
                type="text"
                placeholder="e.g. Weekend Showdown"
                required
              />
            </label>
            <label>
              Game Title
              <input
                name="game"
                type="text"
                placeholder="e.g. BGMI, Free Fire, COD"
                required
              />
            </label>
            <label>
              Event Date
              <input
                name="date"
                type="date"
                required
              />
            </label>
            <button className="dashboard-button" type="submit">
              + Add Tournament
            </button>
          </form>
        </section>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">MANAGE EVENTS</p>
              <h2>Active Admin Tournaments</h2>
            </div>
            <span className="count-label">{tournaments.length} listed</span>
          </div>
          <div className="dashboard-list">
            {tournaments.length === 0 ? (
              <p className="empty-state">No custom tournaments created yet. Add one using the form above.</p>
            ) : (
              tournaments.map((tournament) => (
                <article className="dashboard-item" key={tournament.id}>
                  <div>
                    <strong>🏆 {tournament.name}</strong>
                    <p>{tournament.game} · Date: {tournament.date}</p>
                  </div>
                  <button
                    className="small-button btn-danger-soft"
                    type="button"
                    onClick={() => onRemoveTournament(tournament.id)}
                  >
                    Delete Event
                  </button>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">NAVIGATION</p>
              <h2>Portal Shortcuts</h2>
            </div>
          </div>
          <div className="manage-links">
            <button type="button" className="btn btn-primary" onClick={onPortal}>
              Open Public Gaming Portal
            </button>
            <button type="button" className="btn btn-outline" onClick={onLogout}>
              Logout of Admin
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Admin
