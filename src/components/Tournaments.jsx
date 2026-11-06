import { useState } from 'react'

const featuredTournaments = [
  {
    game: 'SMASH KARTS',
    title: 'Smash Karts Championship',
    prize: '₹15,000',
    players: '24 Players',
    date: 'Sep 12',
    banner: 'SK',
    style: 'smashkarts-banner',
    status: 'Registration Open',
    format: 'Single Elimination',
  },
  {
    game: 'BGMI',
    title: 'Battle Arena Championship',
    prize: '₹50,000',
    players: '64 Teams',
    date: 'Sep 18',
    banner: 'BGMI',
    style: 'bgmi-banner',
    status: 'Registration Open',
    format: 'Battle Royale Squad',
  },
  {
    game: 'FREE FIRE',
    title: 'Free Fire Clash',
    prize: '₹35,000',
    players: '48 Teams',
    date: 'Sep 22',
    banner: 'FF',
    style: 'freefire-banner',
    status: 'Registration Open',
    format: 'Survival Squad',
  },
]

function Tournaments({ tournaments = [], session, onNavigate }) {
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [registeredList, setRegisteredList] = useState(() => {
    try {
      const saved = window.localStorage.getItem('gameArenaUserRegistrations')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [regSuccess, setRegSuccess] = useState('')

  const allCards = [
    ...featuredTournaments,
    ...tournaments.map((tournament) => ({
      game: (tournament.game || 'CUSTOM').toUpperCase(),
      title: tournament.name,
      prize: tournament.prize || '₹20,000 Pool',
      players: tournament.players || 'Registration open',
      date: tournament.date,
      banner: (tournament.game || 'GM').slice(0, 4).toUpperCase(),
      style: 'custom-banner',
      status: 'Open for Entry',
      format: 'Standard Bracket',
    })),
  ]

  function handleRegister(tournament) {
    if (!session) {
      return
    }

    const tournId = tournament.title
    if (!registeredList.includes(tournId)) {
      const updated = [...registeredList, tournId]
      setRegisteredList(updated)
      window.localStorage.setItem('gameArenaUserRegistrations', JSON.stringify(updated))
      setRegSuccess(`You have successfully registered for ${tournament.title}!`)
      setTimeout(() => setRegSuccess(''), 4000)
    }
  }

  return (
    <section className="tournaments-section" id="tournaments">
      <div className="container">
        <div className="section-heading">
          <span className="section-badge">UPCOMING EVENTS</span>
          <h2>Featured Tournaments</h2>
          <p>Find your next challenge, register your squad, and compete for amazing rewards.</p>
        </div>

        {regSuccess && (
          <div className="tournament-alert-success" role="status">
            <span>✓</span> {regSuccess}
          </div>
        )}

        <div className="tournament-grid">
          {allCards.map((tournament, index) => {
            const isRegistered = registeredList.includes(tournament.title)

            return (
              <article
                className="tournament-card"
                key={`${tournament.title}-${index}`}
              >
                <div className={`tournament-banner ${tournament.style}`}>
                  <span className="banner-badge">{tournament.banner}</span>
                  <span className="banner-status">{tournament.status}</span>
                </div>

                <div className="tournament-content">
                  <div className="tournament-meta-top">
                    <span className="tournament-game">{tournament.game}</span>
                    <span className="tournament-format">{tournament.format}</span>
                  </div>

                  <h3>{tournament.title}</h3>

                  <div className="tournament-info">
                    <div className="info-chip">
                      <span className="info-icon">🏆</span>
                      <strong className="prize-highlight">{tournament.prize}</strong>
                    </div>
                    <div className="info-chip">
                      <span className="info-icon">👥</span>
                      <span>{tournament.players}</span>
                    </div>
                    <div className="info-chip">
                      <span className="info-icon">📅</span>
                      <span>{tournament.date}</span>
                    </div>
                  </div>

                  <div className="tournament-card-actions">
                    <button
                      type="button"
                      className="tournament-btn-view"
                      onClick={() => setSelectedTournament(tournament)}
                    >
                      View Tournament Details →
                    </button>
                    {isRegistered && (
                      <span className="registered-badge">✓ Registered</span>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Modal Dialog for Tournament Details */}
      {selectedTournament && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedTournament(null)}
          role="presentation"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-tourn-title"
          >
            <div className="modal-header">
              <span className="modal-badge">{selectedTournament.game}</span>
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedTournament(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <h2 id="modal-tourn-title">{selectedTournament.title}</h2>

            <div className="modal-details-grid">
              <div className="modal-detail-item">
                <span className="modal-label">Prize Pool</span>
                <strong className="modal-val highlight-gold">{selectedTournament.prize}</strong>
              </div>
              <div className="modal-detail-item">
                <span className="modal-label">Teams / Slots</span>
                <strong className="modal-val">{selectedTournament.players}</strong>
              </div>
              <div className="modal-detail-item">
                <span className="modal-label">Tournament Date</span>
                <strong className="modal-val">{selectedTournament.date}</strong>
              </div>
              <div className="modal-detail-item">
                <span className="modal-label">Format</span>
                <strong className="modal-val">{selectedTournament.format}</strong>
              </div>
            </div>

            <div className="modal-rules-box">
              <h4>Tournament Overview & Rules</h4>
              <ul>
                <li>Free participation for registered GameArena members.</li>
                <li>Rooms, lobby keys, and schedules are shared 30 minutes prior to match time.</li>
                <li>Fair play policy strictly enforced by automated anti-cheat protocols.</li>
                <li>Cash prizes disbursed directly to winner profiles within 24 hours.</li>
              </ul>
            </div>

            <div className="modal-footer">
              {session ? (
                registeredList.includes(selectedTournament.title) ? (
                  <div className="modal-registered-notice">
                    <span>✓ You are already registered for this tournament!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary modal-action-btn"
                    onClick={() => {
                      handleRegister(selectedTournament)
                    }}
                  >
                    Confirm Registration 🎮
                  </button>
                )
              ) : (
                <div className="modal-auth-prompt">
                  <p>Create an account or log in to register for this tournament.</p>
                  <div className="modal-auth-buttons">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => {
                        setSelectedTournament(null)
                        onNavigate('login')
                      }}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setSelectedTournament(null)
                        onNavigate('signup')
                      }}
                    >
                      Sign Up to Play
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Tournaments
