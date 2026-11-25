import { useState } from 'react'

const gameConfigs = {
  bgmi: {
    name: 'BGMI',
    image: '/games/bgmi.jpg',
    genre: 'BATTLE ROYALE',
    subtitle: 'BATTLEGROUNDS ARENA',
    tagline: 'DROP IN. GEAR UP. SURVIVE.',
    description:
      'Tactical 100-player squad combat built for precision aim, split-second callouts, and high-stakes circle rotations.',
    questTitle: 'BEYOND THE WALL',
    questTask: 'Secure the Forsaken Stronghold perimeter',
    mapTitle: 'THE HARBOR CITY',
    mapChapter: 'ERANGEL // CHAPTER 4',
    progress: '78%',
    hp: '1,250 / 1,250',
    mp: '750 / 750',
    ammo: '12 / 48',
    rank: 'LVL 28',
    xp: '12,450 / 28,000',
  },
  'free-fire': {
    name: 'FREE FIRE',
    image: '/games/free-fire.jpg',
    genre: 'SURVIVAL SHOOTER',
    subtitle: 'SURVIVAL CLASH ARENA',
    tagline: 'FAST. TACTICAL. UNFORGIVING.',
    description:
      'High-tempo 50-player survival combat engineered for rapid drops, custom character skills, and intense final-zone duels.',
    questTitle: 'CLOCK TOWER SIEGE',
    questTask: 'Eliminate rival squad inside the inner zone',
    mapTitle: 'BERMUDA PEAK',
    mapChapter: 'SECTOR 2 // SQUAD',
    progress: '84%',
    hp: '1,100 / 1,100',
    mp: '680 / 680',
    ammo: '18 / 60',
    rank: 'LVL 34',
    xp: '18,900 / 24,000',
  },
  'cod-mobile': {
    name: 'COD MOBILE',
    image: '/games/cod-mobile.jpg',
    genre: 'ACTION FPS',
    subtitle: 'STRIKE FORCE MULTIPLAYER',
    tagline: 'LOCKED. LOADED. DEPLOYED.',
    description:
      'Competitive 5v5 Search & Destroy and tactical multiplayer combat with precision gunsmith loadouts and scorestreaks.',
    questTitle: 'OPERATION BLACKOUT',
    questTask: 'Plant charge and hold Objective Alpha',
    mapTitle: 'STANDOFF DISTRICT',
    mapChapter: 'RANKED // SEASON 9',
    progress: '91%',
    hp: '1,300 / 1,300',
    mp: '820 / 820',
    ammo: '30 / 90',
    rank: 'LVL 42',
    xp: '22,100 / 25,000',
  },
  'smash-karts': {
    name: 'SMASH KARTS',
    image: '/games/smash-karts.jpg',
    genre: 'KART COMBAT',
    subtitle: '3D ARENA KART COMBAT',
    tagline: 'DRIFT. BLAST. DOMINATE.',
    description:
      'Chaotic multiplayer kart combat arena packed with rocket barrages, shield pickups, and explosive drift takedowns.',
    questTitle: 'NITRO GAUNTLET',
    questTask: 'Capture 5 power cores before timer expires',
    mapTitle: 'GRAVEL PIT CIRCUIT',
    mapChapter: 'ARENA 4 // CHAOS',
    progress: '72%',
    hp: '1,000 / 1,000',
    mp: '900 / 900',
    ammo: '08 / 24',
    rank: 'LVL 19',
    xp: '9,800 / 16,000',
  },
}

const menuItems = ['CONTINUE', 'NEW GAME', 'LOAD GAME', 'SETTINGS', 'CREDITS', 'STORE']

const settingsTabs = ['GAMEPLAY', 'CONTROLS', 'DISPLAY', 'AUDIO', 'ACCESSIBILITY']

const accessibilitySteps = [
  {
    title: 'ACCESSIBILITY',
    color: 'slate',
    desc: "We're committed to making our game accessible to everyone.",
    items: [],
    action: 'CONTINUE',
  },
  {
    title: 'VISION',
    color: 'blue',
    desc: 'Adjust visual settings to suit your needs.',
    items: ['Colorblind Mode', 'High Contrast', 'UI Scale', 'Text Size'],
    action: 'CONTINUE',
  },
  {
    title: 'HEARING',
    color: 'gold',
    desc: 'Adjust audio settings to suit your needs.',
    items: ['Subtitles', 'Subtitle Size', 'Speaker Names', 'Audio Cues'],
    action: 'CONTINUE',
  },
  {
    title: 'MOTOR',
    color: 'purple',
    desc: 'Adjust control settings to suit your needs.',
    items: ['Hold / Toggle', 'Button Remapping', 'Stick Sensitivity', 'Aim Assist'],
    action: 'FINISH',
  },
]

const principles = [
  {
    title: 'CLARITY',
    desc: 'Information at a glance, when it matters most.',
    icon: 'clarity',
  },
  {
    title: 'IMMERSION',
    desc: 'Diegetic design that respects the game world.',
    icon: 'immersion',
  },
  {
    title: 'ACCESSIBILITY',
    desc: 'Built-in support for all types of players.',
    icon: 'accessibility',
  },
  {
    title: 'CONSISTENCY',
    desc: 'Unified experience across all platforms.',
    icon: 'consistency',
  },
  {
    title: 'SCALABILITY',
    desc: 'Systems designed to grow with your game.',
    icon: 'scalability',
  },
]

function GameDetail({ gameSlug, onBack, onExploreTournaments }) {
  const data = gameConfigs[gameSlug] || gameConfigs.bgmi

  const [activeMenu, setActiveMenu] = useState('CONTINUE')
  const [activeTab, setActiveTab] = useState('DISPLAY')
  const [brightness, setBrightness] = useState(0.8)
  const [fov, setFov] = useState(85)
  const [hdr, setHdr] = useState(true)
  const [fullscreen, setFullscreen] = useState(true)
  const [vsync, setVsync] = useState(true)
  const [motionBlur, setMotionBlur] = useState(true)
  const [chromatic, setChromatic] = useState(false)
  const [launchNotice, setLaunchNotice] = useState('')

  function handleLaunch(actionLabel) {
    setLaunchNotice(`${data.name}: ${actionLabel} — Initializing match lobby & HUD...`)
    setTimeout(() => setLaunchNotice(''), 3500)
  }

  function handleResetDefaults() {
    setBrightness(0.8)
    setFov(85)
    setHdr(true)
    setFullscreen(true)
    setVsync(true)
    setMotionBlur(true)
    setChromatic(false)
  }

  return (
    <div className="game-showcase-page">
      {/* Top Enhanced Game Picture Banner */}
      <section className="game-top-hero-banner">
        <img
          src={data.image}
          alt={`${data.name} key visual`}
          className="game-top-hero-img"
        />
        <div className="game-top-hero-overlay" />
        <div className="showcase-container game-top-hero-content">
          <div className="game-top-hero-nav">
            <button type="button" className="showcase-back-btn" onClick={onBack}>
              ← BACK TO GAMES
            </button>
            <div className="topbar-actions">
              <button
                type="button"
                className="showcase-topbar-link"
                onClick={onExploreTournaments}
              >
                VIEW TOURNAMENTS →
              </button>
              <button
                type="button"
                className="showcase-play-btn"
                onClick={() => handleLaunch('LAUNCHING ARENA')}
              >
                PLAY {data.name}
              </button>
            </div>
          </div>

          <div className="game-top-hero-caption">
            <span className="game-top-pill">{data.genre}</span>
            <p className="game-top-sub">{data.tagline}</p>
          </div>
        </div>
      </section>

      {launchNotice && (
        <div className="showcase-container">
          <div className="showcase-toast" role="status">
            {launchNotice}
          </div>
        </div>
      )}

      <main className="showcase-container showcase-main">
        {/* ROW 1: BRAND + TITLE + PLATFORMS (LEFT) & LIVE HUD VIEWPORT (RIGHT) */}
        <section className="showcase-hero-row">
          <div className="showcase-hero-left">
            <div className="showcase-studio-brand">
              <span className="studio-emblem" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" />
                  <path d="M12 22V12M20 7L12 12L4 7" />
                </svg>
              </span>
              <div>
                <strong>GAMEARENA</strong>
                <span>{data.subtitle}</span>
              </div>
            </div>

            <h1 className="showcase-main-title">
              {data.name}
              <span>ARENA UI &amp; LOBBY</span>
            </h1>

            <p className="showcase-tagline">SHIPPED. POLISHED. PLAYED.</p>

            <p className="showcase-lead">{data.description}</p>

            <div className="showcase-platforms-box">
              <span className="platforms-heading">PLATFORMS</span>
              <div className="platforms-row">
                <div className="platform-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="4" width="18" height="12" rx="1.5" />
                    <path d="M8 20H16M12 16V20" />
                  </svg>
                  <span>PC</span>
                </div>
                <div className="platform-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M9 4V19M9 4C14 4 16 7 16 9.5C16 12 13.5 13 9 13" />
                    <path d="M4 17C6 16 14 15 20 17" />
                  </svg>
                  <span>PS5</span>
                </div>
                <div className="platform-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M7 7C10 9 14 13 17 17M17 7C14 9 10 13 7 17" />
                  </svg>
                  <span>XBOX</span>
                </div>
                <div className="platform-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M9 8V14C9 15.6 10.3 17 12 17C13.7 17 15 15.6 15 14V8" />
                  </svg>
                  <span>ARENA ENGINE</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ATMOSPHERIC IN-GAME HUD VIEWPORT */}
          <div
            className="showcase-hud-viewport"
            style={{ filter: `brightness(${0.75 + brightness * 0.4})` }}
          >
            <img
              src={data.image}
              alt=""
              aria-hidden="true"
              className="hud-viewport-bg-img"
            />
            <div className="hud-scenery" aria-hidden="true">
              <div className="hud-sky-glow" />
            </div>

            {/* Top HUD Strip */}
            <div className="hud-top-bar">
              <div className="hud-level-box">
                <div className="hud-rank-shield">★</div>
                <div className="hud-level-info">
                  <div className="hud-level-row">
                    <strong>{data.rank}</strong>
                    <div className="hud-xp-track">
                      <div className="hud-xp-fill" />
                    </div>
                  </div>
                  <span>{data.xp}</span>
                </div>
              </div>

              <div className="hud-compass">
                <span>NE</span>
                <span className="compass-tick">|</span>
                <span className="compass-active">E</span>
                <span className="compass-tick">|</span>
                <span>SE</span>
                <span className="compass-tick">|</span>
                <span>S</span>
              </div>

              <div className="hud-minimap" aria-label="Tactical minimap">
                <div className="minimap-ring" />
                <div className="minimap-grid" />
                <div className="minimap-dot" />
              </div>
            </div>

            {/* Left Active Quest */}
            <div className="hud-quest-box">
              <span className="hud-quest-label">ACTIVE QUEST</span>
              <strong>{data.questTitle}</strong>
              <p>◇ {data.questTask}</p>
            </div>

            {/* Bottom HUD Controls & Vital Bars */}
            <div className="hud-bottom-bar">
              <div className="hud-left-slots">
                <span className="hud-slot">+</span>
                <span className="hud-slot gold">🛡️</span>
                <span className="hud-slot">⚔️</span>
              </div>

              <div className="hud-vitals">
                <div className="vital-bar vital-hp">
                  <span>{data.hp}</span>
                </div>
                <div className="vital-bar vital-mp">
                  <span>{data.mp}</span>
                </div>
              </div>

              <div className="hud-right-abilities">
                <div className="ability-slots">
                  <span className="ability-box purple">⚡</span>
                  <span className="ability-box cyan">❄️</span>
                  <span className="ability-box emerald">🎯</span>
                </div>
                <div className="hud-ammo">
                  <span className="ammo-icon">⌖</span>
                  <strong>{data.ammo}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROW 2: MAIN MENU | SETTINGS SCREEN | ACCESSIBILITY FLOW */}
        <section className="showcase-mid-row">
          {/* PANEL 1: MAIN MENU */}
          <article className="showcase-panel">
            <h2 className="showcase-panel-title">MAIN MENU (CONSOLE)</h2>
            <div className="console-menu-frame">
              <div className="console-menu-backdrop" aria-hidden="true" />
              <div className="console-menu-list">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`console-menu-item${activeMenu === item ? ' active' : ''}`}
                    onClick={() => {
                      setActiveMenu(item)
                      if (item === 'CONTINUE' || item === 'NEW GAME') {
                        handleLaunch(item)
                      }
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="console-chapter-card">
                <div className="chapter-thumb" aria-hidden="true">
                  <img src={data.image} alt="" className="chapter-thumb-img" />
                </div>
                <div className="chapter-meta">
                  <div>
                    <strong>{data.mapTitle}</strong>
                    <span>{data.mapChapter}</span>
                  </div>
                  <div className="chapter-progress">
                    <strong>{data.progress}</strong>
                    <span>SERIES X/S</span>
                  </div>
                </div>
              </div>

              <div className="console-menu-footer">
                <span>Ⓐ SELECT</span>
                <span>ⓧ NEWS</span>
                <span>Ⓨ DETAILS</span>
              </div>
            </div>
          </article>

          {/* PANEL 2: SETTINGS SCREEN */}
          <article className="showcase-panel">
            <h2 className="showcase-panel-title">SETTINGS SCREEN (PC &amp; CONSOLE)</h2>
            <div className="settings-frame">
              <div className="settings-tabs">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`settings-tab${activeTab === tab ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="settings-body">
                <div className="settings-controls-col">
                  <span className="settings-section-label">{activeTab}</span>

                  <label className="setting-row">
                    <span>BRIGHTNESS</span>
                    <div className="setting-slider-wrap">
                      <input
                        type="range"
                        min="0.4"
                        max="1.2"
                        step="0.05"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                      />
                      <strong>{brightness.toFixed(1)}</strong>
                    </div>
                  </label>

                  <button type="button" className="setting-row" onClick={() => setHdr((v) => !v)}>
                    <span>HDR</span>
                    <span className="setting-val">&lt; {hdr ? 'ON' : 'OFF'} &gt;</span>
                  </button>

                  <div className="setting-row">
                    <span>RESOLUTION</span>
                    <span className="setting-val">&lt; 3840 × 2160 &gt;</span>
                  </div>

                  <button type="button" className="setting-row" onClick={() => setFullscreen((v) => !v)}>
                    <span>FULLSCREEN</span>
                    <span className="setting-val">&lt; {fullscreen ? 'ON' : 'OFF'} &gt;</span>
                  </button>

                  <button type="button" className="setting-row" onClick={() => setVsync((v) => !v)}>
                    <span>VSYNC</span>
                    <span className="setting-val">&lt; {vsync ? 'ON' : 'OFF'} &gt;</span>
                  </button>

                  <label className="setting-row">
                    <span>FIELD OF VIEW</span>
                    <div className="setting-slider-wrap">
                      <input
                        type="range"
                        min="65"
                        max="110"
                        step="1"
                        value={fov}
                        onChange={(e) => setFov(Number(e.target.value))}
                      />
                      <strong>{fov}</strong>
                    </div>
                  </label>

                  <button type="button" className="setting-row" onClick={() => setMotionBlur((v) => !v)}>
                    <span>MOTION BLUR</span>
                    <span className="setting-val">&lt; {motionBlur ? 'ON' : 'OFF'} &gt;</span>
                  </button>

                  <button type="button" className="setting-row" onClick={() => setChromatic((v) => !v)}>
                    <span>CHROMATIC ABERRATION</span>
                    <span className="setting-val">&lt; {chromatic ? 'ON' : 'OFF'} &gt;</span>
                  </button>
                </div>

                <div className="settings-preview-col">
                  <p>Adjust overall screen brightness and display clarity.</p>
                  <div
                    className="settings-preview-thumb"
                    style={{ filter: `brightness(${0.75 + brightness * 0.4})` }}
                  >
                    <img src={data.image} alt="" className="settings-preview-img" />
                  </div>
                </div>
              </div>

              <div className="settings-footer">
                <button type="button" className="settings-reset-btn" onClick={handleResetDefaults}>
                  ⓧ RESET TO DEFAULTS
                </button>
                <button type="button" className="settings-reset-btn" onClick={onBack}>
                  Ⓑ BACK
                </button>
              </div>
            </div>
          </article>

          {/* PANEL 3: ACCESSIBILITY FLOW */}
          <article className="showcase-panel">
            <h2 className="showcase-panel-title">ACCESSIBILITY FLOW</h2>
            <div className="accessibility-grid">
              {accessibilitySteps.map((step, idx) => (
                <div className={`access-step-card tone-${step.color}`} key={step.title}>
                  <div className="access-icon-circle" aria-hidden="true">
                    {idx === 0 && 'ⓘ'}
                    {idx === 1 && '◉'}
                    {idx === 2 && '🎧'}
                    {idx === 3 && '✋'}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  {step.items.length > 0 && (
                    <ul>
                      {step.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  <span className="access-action">Ⓐ {step.action}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* ROW 3: IN-GAME HUD BREAKDOWN & DESIGN PRINCIPLES */}
        <section className="showcase-bottom-row">
          <article className="showcase-panel">
            <h2 className="showcase-panel-title">IN-GAME HUD (DIEGETIC + NON-DIEGETIC)</h2>
            <div className="hud-breakdown-grid">
              <div className="hud-mini-viewport">
                <div className="hud-mini-quest">
                  <span>THE LOST RELIC</span>
                  <small>Reach the inner sanctum</small>
                </div>
                <div className="hud-mini-bars">
                  <div className="vital-bar vital-hp">
                    <span>{data.hp}</span>
                  </div>
                  <div className="vital-bar vital-mp">
                    <span>{data.mp}</span>
                  </div>
                </div>
              </div>

              <div className="hud-callouts">
                <div className="hud-callout-item">
                  <strong className="callout-gold">DIEGETIC ELEMENTS</strong>
                  <p>Blend into the world to maintain immersion.</p>
                  <div className="callout-chip">
                    <span>◆ {data.questTitle}</span>
                    <small>{data.questTask}</small>
                  </div>
                </div>
                <div className="hud-callout-item">
                  <strong className="callout-blue">NON-DIEGETIC ELEMENTS</strong>
                  <p>Deliver critical info clearly and quickly.</p>
                  <div className="callout-bars-preview">
                    <div className="mini-red">{data.hp}</div>
                    <div className="mini-blue">{data.mp}</div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="showcase-panel">
            <h2 className="showcase-panel-title">DESIGN PRINCIPLES</h2>
            <div className="principles-grid">
              {principles.map((item) => (
                <div className="principle-col" key={item.title}>
                  <div className={`principle-icon tone-${item.icon}`} aria-hidden="true">
                    {item.icon === 'clarity' && '⌖'}
                    {item.icon === 'immersion' && '◈'}
                    {item.icon === 'accessibility' && '❖'}
                    {item.icon === 'consistency' && '🎮'}
                    {item.icon === 'scalability' && '📶'}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* BOTTOM 3-COLUMN TRUST STRIP */}
        <footer className="showcase-trust-footer">
          <div className="trust-item">
            <span className="trust-icon">🏆</span>
            <div>
              <strong>SHIPPED QUALITY</strong>
              <p>Battle-tested UI systems in live competitive titles.</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">👥</span>
            <div>
              <strong>COLLABORATIVE</strong>
              <p>Seamless squad sync and instant bracket lobbies.</p>
            </div>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🌐</span>
            <div>
              <strong>CROSS-PLATFORM</strong>
              <p>PC, mobile, and current-gen console optimized.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default GameDetail
