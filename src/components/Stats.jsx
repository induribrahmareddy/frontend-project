function Stats({ totalGames = 4, featuredTournaments = 3, availableEvents = 3, totalCategories = 3 }) {
  const statItems = [
    {
      id: 'games',
      icon: '🎮',
      value: totalGames,
      label: 'Total Games',
      description: 'Competitive titles available',
    },
    {
      id: 'featured',
      icon: '🏆',
      value: featuredTournaments,
      label: 'Featured Tournaments',
      description: 'High-stakes championships',
    },
    {
      id: 'events',
      icon: '🔥',
      value: availableEvents,
      label: 'Available Events',
      description: 'Active & upcoming brackets',
    },
    {
      id: 'categories',
      icon: '⚡',
      value: totalCategories,
      label: 'Gaming Categories',
      description: 'Battle Royale, FPS & Combat',
    },
  ]

  return (
    <section className="stats-section" aria-label="Platform statistics">
      <div className="container">
        <div className="stats-grid-public">
          {statItems.map((item) => (
            <article className="stat-card-public" key={item.id}>
              <div className="stat-icon-wrapper" aria-hidden="true">
                {item.icon}
              </div>
              <div className="stat-content">
                <span className="stat-number">{item.value}</span>
                <h3 className="stat-title">{item.label}</h3>
                <p className="stat-description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
