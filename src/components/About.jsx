function About() {
  const features = [
    {
      icon: '🏆',
      title: 'Competitive Tournaments',
      description:
        'Structured brackets, scheduled scrims, and official tournaments across your favorite mobile and PC titles.',
    },
    {
      icon: '⚡',
      title: 'Seamless Registration',
      description:
        'Quick squad and solo sign-ups with automated lobby info delivered before every tournament match.',
    },
    {
      icon: '🛡️',
      title: 'Fair Play & Anti-Cheat',
      description:
        'Integrity-first platform with active gameplay verification to guarantee a fair, cheat-free environment.',
    },
    {
      icon: '💰',
      title: 'Guaranteed Prize Pools',
      description:
        'Transparent payouts, clear rewards, and fast disbursement to championship winners and runners-up.',
    },
  ]

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-heading">
          <span className="section-badge">ABOUT GAMEARENA</span>
          <h2>Built for Competitive Esports</h2>
          <p>
            GameArena empowers gamers of all levels to turn casual play into competitive glory.
            Experience esports the way it was meant to be played.
          </p>
        </div>

        <div className="about-grid">
          {features.map((item, index) => (
            <article className="about-card" key={index}>
              <div className="about-icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
