function CtaSection({ session, onNavigate }) {
  return (
    <section className="cta-section" id="join-arena">
      <div className="container">
        <div className="cta-card">
          <div className="cta-glow-bg" aria-hidden="true" />
          <div className="cta-content">
            <span className="cta-eyebrow">READY TO COMPETE?</span>
            <h2>Join GameArena</h2>
            <p>
              Create your free account today to join official tournaments, compete for real prize pools,
              track your gaming journey, and dominate the leaderboards.
            </p>

            {session ? (
              <div className="cta-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-large cta-primary-btn"
                  onClick={() => onNavigate('dashboard')}
                >
                  Go to My Dashboard 👤
                </button>
                <a href="#tournaments" className="btn btn-outline btn-large">
                  Browse Tournaments 🏆
                </a>
              </div>
            ) : (
              <div className="cta-actions-column">
                <div className="cta-buttons">
                  <button
                    type="button"
                    className="btn btn-primary btn-large cta-primary-btn"
                    onClick={() => onNavigate('signup')}
                  >
                    Sign Up to Join the Arena 🚀
                  </button>
                </div>
                <p className="cta-login-prompt">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="cta-login-link"
                    onClick={() => onNavigate('login')}
                  >
                    Log In here
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
