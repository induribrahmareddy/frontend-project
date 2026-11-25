const games = [
  {
    name: 'BGMI',
    image: '/games/bgmi.jpg',
    category: 'Battle Royale',
    badge: 'Popular',
    description: 'Intense 100-player tactical battlefield. Squad up and fight for the chicken dinner.',
    tag: 'Squad & Solo',
  },
  {
    name: 'Free Fire',
    image: '/games/free-fire.jpg',
    category: 'Battle Royale',
    badge: 'Fast Paced',
    description: 'Fast-action 50-player survival shooter designed for quick reflex combat.',
    tag: 'Survival FPS',
  },
  {
    name: 'COD Mobile',
    image: '/games/cod-mobile.jpg',
    category: 'Action FPS',
    badge: 'Competitive',
    description: 'Signature Call of Duty multiplayer arenas with competitive Search & Destroy.',
    tag: '5v5 Multiplayer',
  },
  {
    name: 'Smash Karts',
    image: '/games/smash-karts.jpg',
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
      return
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
            <article
              className="game-card game-card-clickable"
              key={game.name}
              onClick={() => handleGameClick(game.name)}
            >
              <div className="game-card-banner-wrap">
                <img
                  src={game.image}
                  alt={`${game.name} arena artwork`}
                  className="game-card-banner-img"
                />
              </div>
              <div className="game-card-top">
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
                    onClick={(event) => {
                      event.stopPropagation()
                      handleGameClick(game.name)
                    }}
                  >
                    Play Arena →
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
