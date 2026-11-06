import { useState } from 'react'

function Signup({ onRegister, onLogin, onHome }) {
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const error = onRegister({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    })
    if (error) {
      setMessage(error)
    }
  }

  return (
    <section className="auth-card" aria-labelledby="register-heading">
      <div className="auth-card-header">
        <h2 id="register-heading">Join GameArena</h2>
        <p className="auth-card-subtitle">Create your player profile and start competing today.</p>
      </div>

      <form className="redirect-form" onSubmit={handleSubmit}>
        <label htmlFor="register-name">Player Name / Gamer Tag</label>
        <input
          id="register-name"
          name="name"
          type="text"
          placeholder="e.g. ShadowHunter"
          autoComplete="name"
          required
        />

        <label htmlFor="register-email">Email Address</label>
        <input
          id="register-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          required
        />

        {message && <p className="auth-feedback" role="alert">{message}</p>}

        <button className="auth-button auth-submit-btn" type="submit">
          Create Account & Register
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{' '}
        <button type="button" onClick={onLogin}>
          Log In
        </button>
      </p>

      {onHome && (
        <div className="auth-back-wrap">
          <button type="button" className="auth-back-btn" onClick={onHome}>
            ← Back to Public Homepage
          </button>
        </div>
      )}
    </section>
  )
}

export default Signup
