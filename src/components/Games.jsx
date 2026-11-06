const games = [
  {
    icon: '🔫',
    name: 'BGMI',
    category: 'Battle Royale',
    badge: 'Popular',
    description: 'Intense 100-player tactical battlefield. Squad up and fight for the chicken dinner.',
    tag: 'Squad & Solo',
  },
  {
    icon: '🔥',
    name: 'Free Fire',
    category: 'Battle Royale',
    badge: 'Fast Paced',
    description: 'Fast-action 50-player survival shooter designed for quick reflex combat.',
    tag: 'Survival FPS',
  },
  {
    icon: '⚔️',
    name: 'COD Mobile',
    category: 'Action FPS',
    badge: 'Competitive',
    description: 'Signature Call of Duty multiplayer arenas with competitive Search & Destroy.',
    tag: '5v5 Multiplayer',
  },
  {
    icon: '🏎️',
    name: 'Smash Karts',
    category: 'Kart Combat',
    badge: 'Action Arcade',
    description: 'Chaotic 3D multiplayer kart combat filled with power-ups, rockets and mayhem.',
    tag: 'Arena Combat',
  },
]

function Games({ onSelectGame }) {
  function handleGameClick(gameName) {
    if (onSelectGame) {
      onSelectGame(gameName)
    }
    const element = document.getElementById('tournaments')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="games-section" id="games">
      <div className="container">
        <div className="section-heading">
          <span className="section-badge">POPULAR GAMES</span>
          <h2>Choose Your Arena</h2>
          <p>Compete in official tournaments across the industry&apos;s most played titles.</p>
        </div>

        <div className="games-grid">
          {games.map((game) => (
            <article className="game-card" key={game.name}>
              <div className="game-card-top">
                <div className="game-icon" aria-hidden="true">{game.icon}</div>
                <span className="game-badge">{game.badge}</span>
              </div>
              <div className="game-card-body">
                <h3>{game.name}</h3>
                <span className="game-category">{game.category}</span>
                <p className="game-description">{game.description}</p>
                <div className="game-footer">
                  <span className="game-tag">{game.tag}</span>
                  <button
                    type="button"
                    className="game-action-btn"
                    onClick={() => handleGameClick(game.name)}
                  >
                    View Events →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Games
