import { useEffect, useState } from 'react'
import './App.css'
import About from './components/About.jsx'
import Admin from './components/Admin.jsx'
import CtaSection from './components/CtaSection.jsx'
import Footer from './components/Footer.jsx'
import Games from './components/Games.jsx'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Stats from './components/Stats.jsx'
import Tournaments from './components/Tournaments.jsx'
import User from './components/User.jsx'

const tournamentStorageKey = 'gameArenaTournaments'
const accountStorageKey = 'gameArenaAccounts'

function readPage() {
  const pathname = window.location.pathname.trim().replace(/\/+$/, '')
  const segment = pathname.split('/').pop()?.toLowerCase() || ''

  if (segment === 'portal') return 'portal'
  if (segment === 'login') return 'login'
  if (segment === 'signup') return 'signup'
  if (segment === 'dashboard') return 'dashboard'
  if (segment === 'login-success') return 'login-success'
  if (segment === 'signup-success') return 'signup-success'

  // Default to public homepage for '/' or any unrecognized path
  return 'home'
}

function getPathForPage(pageName) {
  if (pageName === 'home') return '/'
  return `/${pageName}`
}

function readAccounts() {
  const savedAccounts = window.localStorage.getItem(accountStorageKey)
  if (!savedAccounts) return []

  try {
    const accounts = JSON.parse(savedAccounts)
    if (!Array.isArray(accounts)) return []

    return accounts
      .filter((account) => account && typeof account.email === 'string')
      .map((account) => ({
        name: account.name || 'Player',
        email: account.email.trim().toLowerCase(),
        password: account.password || '',
        role: account.role || (account.email.includes('admin') ? 'admin' : 'player'),
      }))
  } catch {
    return []
  }
}

function readSession() {
  try {
    const isLoggedIn = window.localStorage.getItem('gameArenaLoggedIn') === 'true'
    const email = window.localStorage.getItem('gameArenaUserEmail')?.trim().toLowerCase()
    if (!isLoggedIn || !email) return null

    const account = readAccounts().find((savedAccount) => savedAccount.email === email)
    if (!account) {
      const name = window.localStorage.getItem('gameArenaName') || 'Player'
      return {
        name,
        email,
        role: 'player',
      }
    }

    return {
      name: account.name,
      email: account.email,
      role: account.role || 'player',
    }
  } catch {
    return null
  }
}

function readTournaments() {
  try {
    const savedTournaments = window.localStorage.getItem(tournamentStorageKey)
    if (!savedTournaments) return []

    const tournaments = JSON.parse(savedTournaments)
    if (!Array.isArray(tournaments)) return []

    return tournaments
      .filter((tournament) => tournament && typeof tournament.name === 'string')
      .map((tournament, index) => ({
        ...tournament,
        id: typeof tournament.id === 'string' ? tournament.id : `saved-${index}`,
      }))
  } catch {
    return []
  }
}

function App() {
  const [page, setPage] = useState(readPage)
  const [session, setSession] = useState(readSession)
  const [tournaments, setTournaments] = useState(readTournaments)
  const [accounts, setAccounts] = useState(readAccounts)

  useEffect(() => {
    const handlePopState = () => {
      setPage(readPage())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Access control:
  // 1. Unauthenticated users cannot access /dashboard or /login-success -> redirect to /login
  // 2. Authenticated users visiting /login or /signup -> redirect to /dashboard
  // 3. Root '/' and '/portal' are accessible to everyone (authenticated and unauthenticated)
  const requestedPage = !session && (page === 'dashboard' || page === 'login-success')
    ? 'login'
    : session && (page === 'login' || page === 'signup')
      ? 'dashboard'
      : page

  useEffect(() => {
    if (requestedPage !== page) {
      const targetPath = getPathForPage(requestedPage)
      if (window.location.pathname !== targetPath) {
        window.history.replaceState({}, '', targetPath)
      }
    }
  }, [page, requestedPage])

  function navigate(nextPage) {
    const targetPath = getPathForPage(nextPage)
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath)
    }
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function signIn({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase()
    const account = accounts.find(
      (savedAccount) => savedAccount.email === normalizedEmail && savedAccount.password === password,
    )

    if (!account) {
      return 'No account matches that email and password. Create an account first or check your details.'
    }

    window.localStorage.setItem('gameArenaName', account.name)
    window.localStorage.setItem('gameArenaUserEmail', account.email)
    window.localStorage.setItem('gameArenaLoggedIn', 'true')
    if (account.role) {
      window.localStorage.setItem('gameArenaRole', account.role)
    } else {
      window.localStorage.removeItem('gameArenaRole')
    }

    setSession({
      name: account.name,
      email: account.email,
      role: account.role || 'player',
    })

    // Redirect to authenticated user dashboard
    navigate('dashboard')
    return ''
  }

  function createAccount({ name, email, password }) {
    const normalizedEmail = email.trim().toLowerCase()
    if (accounts.some((account) => account.email === normalizedEmail)) {
      return 'An account with this email already exists. Please log in instead.'
    }

    const newAccount = {
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: normalizedEmail.includes('admin') ? 'admin' : 'player',
    }

    const updatedAccounts = [...accounts, newAccount]
    window.localStorage.setItem(accountStorageKey, JSON.stringify(updatedAccounts))
    setAccounts(updatedAccounts)
    navigate('signup-success')
    return ''
  }

  function signOut() {
    window.localStorage.removeItem('gameArenaName')
    window.localStorage.removeItem('gameArenaUserEmail')
    window.localStorage.removeItem('gameArenaLoggedIn')
    window.localStorage.removeItem('gameArenaRole')
    setSession(null)
    navigate('home')
  }

  function handleAddTournament(newTournament) {
    const item = {
      ...newTournament,
      id: `tourn-${Date.now()}`,
    }
    const updated = [...tournaments, item]
    window.localStorage.setItem(tournamentStorageKey, JSON.stringify(updated))
    setTournaments(updated)
  }

  function handleRemoveTournament(id) {
    const updated = tournaments.filter((tournament) => tournament.id !== id)
    window.localStorage.setItem(tournamentStorageKey, JSON.stringify(updated))
    setTournaments(updated)
  }

  // Success view (Signup success or Login success)
  if (requestedPage === 'login-success' || requestedPage === 'signup-success') {
    const isLoginSuccess = requestedPage === 'login-success'
    return (
      <main className="auth-page">
        <div className="auth-container">
          <section className="auth-card auth-success-page" role="status">
            <a
              className="auth-logo"
              href="/"
              onClick={(e) => {
                e.preventDefault()
                navigate('home')
              }}
            >
              🎮 Game<span className="logo-accent">Arena</span>
            </a>
            <div className="success-mark" aria-hidden="true">✓</div>
            <p className="eyebrow">{isLoginSuccess ? 'LOGIN SUCCESSFUL' : 'SIGNUP SUCCESSFUL'}</p>
            <h1>{isLoginSuccess ? 'Welcome back!' : 'Your account is ready!'}</h1>
            <p>
              {isLoginSuccess
                ? `You are now logged in${session?.name ? ` as ${session.name}` : ''}.`
                : 'Your GameArena account has been created successfully. Log in to access your dashboard.'}
            </p>
            <div className="success-actions">
              <button
                className="dashboard-button"
                type="button"
                onClick={() => navigate(isLoginSuccess ? 'dashboard' : 'login')}
              >
                {isLoginSuccess ? 'Go to My Dashboard 👤' : 'Go to Login →'}
              </button>
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => navigate('home')}
              >
                Return to Public Homepage 🏠
              </button>
            </div>
          </section>
        </div>
      </main>
    )
  }

  // Auth pages (Login or Signup)
  if (requestedPage === 'login' || requestedPage === 'signup') {
    const isSignup = requestedPage === 'signup'
    return (
      <main className="auth-page">
        <div className="auth-container">
          <header className="auth-heading">
            <a
              className="auth-logo"
              href="/"
              onClick={(event) => {
                event.preventDefault()
                navigate('home')
              }}
            >
              🎮 Game<span className="logo-accent">Arena</span>
            </a>
            <h1>{isSignup ? 'Create your player account' : 'Welcome to GameArena'}</h1>
            <p>{isSignup ? 'Sign up to compete in tournaments and climb the leaderboard.' : 'Log in to continue to your dashboard.'}</p>
          </header>

          <div className="auth-grid auth-grid-single">
            {isSignup ? (
              <Signup
                onRegister={createAccount}
                onLogin={() => navigate('login')}
                onHome={() => navigate('home')}
              />
            ) : (
              <Login
                onLogin={signIn}
                onSignup={() => navigate('signup')}
                onHome={() => navigate('home')}
              />
            )}
          </div>
          <p className="auth-note">Account information is securely saved in your browser storage.</p>
        </div>
      </main>
    )
  }

  // Authenticated Dashboard
  if (requestedPage === 'dashboard') {
    if (session?.role === 'admin') {
      return (
        <Admin
          name={session.name}
          tournaments={tournaments}
          onAddTournament={handleAddTournament}
          onRemoveTournament={handleRemoveTournament}
          onPortal={() => navigate('home')}
          onLogout={signOut}
        />
      )
    }

    return (
      <User
        name={session?.name || 'Player'}
        email={session?.email || ''}
        tournaments={tournaments}
        onPortal={() => navigate('home')}
        onLogout={signOut}
      />
    )
  }

  // Default: Public Homepage / Gaming Portal ('home' or 'portal')
  return (
    <>
      <Header
        session={session}
        onNavigate={navigate}
        onLogout={signOut}
        currentPage={requestedPage}
      />
      <main>
        <Home
          onExploreTournaments={() => {
            const el = document.getElementById('tournaments')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
          onBrowseGames={() => {
            const el = document.getElementById('games')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
        />
        <Stats
          totalGames={4}
          featuredTournaments={3}
          availableEvents={3 + tournaments.length}
          totalCategories={3}
        />
        <Games />
        <Tournaments
          tournaments={tournaments}
          session={session}
          onNavigate={navigate}
        />
        <About />
        <CtaSection
          session={session}
          onNavigate={navigate}
        />
      </main>
      <Footer
        session={session}
        onNavigate={navigate}
        onLogout={signOut}
      />
    </>
  )
}

export default App
