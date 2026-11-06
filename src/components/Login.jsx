import { useState } from 'react'

function Login({ onLogin, onSignup, onHome }) {
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const error = onLogin({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    if (error) {
      setMessage(error)
    }
  }

  return (
    <section className="auth-card" aria-labelledby="login-heading">
      <div className="auth-card-header">
        <h2 id="login-heading">Sign In to GameArena</h2>
        <p className="auth-card-subtitle">Access your player dashboard and registered tournaments.</p>
      </div>

      <form className="redirect-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email Address</label>
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {message && <p className="auth-feedback" role="alert">{message}</p>}

        <button className="auth-button auth-submit-btn" type="submit">
          Login to Dashboard
        </button>
      </form>

      <p className="auth-switch">
        Don&apos;t have an account?{' '}
        <button type="button" onClick={onSignup}>
          Sign up / Create account
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

export default Login
