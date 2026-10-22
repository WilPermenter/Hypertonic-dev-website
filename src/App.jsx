import { useEffect, useState } from 'react'
import logo from './assets/logo.png'
import longship from './assets/longship.jpg'
import franticSearch from './assets/franticsearch.jpg'
import voxelEditor from './assets/voxel-editor.jpg'

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'software', label: 'Software Dev' },
  { id: 'games', label: 'Game Dev' },
  { id: 'tools', label: 'Free Tools' },
  { id: 'contact', label: 'Contact' },
]

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

// Shown in the footer and privacy policy only when filled in.
const BUSINESS = {
  name: 'Hypertonic Studios LLC',
  email: 'wilpermenter@gmail.com',
  address: '',
}
const POLICY_DATE = 'October 22, 2026'

function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#home" className="brand" aria-label="Hypertonic Studios">
          <img src={logo} alt="Hypertonic Studios" />
        </a>
        <nav className="nav">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>{n.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}

const NODES = {
  A: [90, 130], B: [300, 270], C: [520, 100], D: [760, 240], E: [980, 120],
  F: [1120, 330], G: [170, 480], H: [470, 440], I: [720, 510], J: [940, 450],
}
const EDGES = [
  ['A', 'B'], ['G', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'F'],
  ['B', 'H'], ['G', 'H'], ['H', 'D'], ['H', 'I'], ['I', 'J'], ['J', 'F'],
]
const R = 22

function edgePath([a, b]) {
  const [x1, y1] = NODES[a]
  const [x2, y2] = NODES[b]
  const sx = x1 + R
  const ex = x2 - R - 6
  const mx = (sx + ex) / 2
  return `M${sx},${y1} C${mx},${y1} ${mx},${y2} ${ex},${y2}`
}

function WorkflowBg() {
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <svg
      className="flow-bg"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1,1 L9,5 L1,9 Z" fill="#7c3aed" />
        </marker>
      </defs>
      {EDGES.map((e, i) => (
        <path
          key={i}
          id={`edge-${i}`}
          d={edgePath(e)}
          className={reduce ? 'edge' : 'edge flowing'}
          markerEnd="url(#arrow)"
        />
      ))}
      {Object.entries(NODES).map(([k, [x, y]], i) => (
        <g key={k} transform={`translate(${x} ${y})`}>
          <rect className="node-ring" x={-R} y={-R} width={R * 2} height={R * 2} rx="9" style={{ animationDelay: `${i * 0.45}s` }} />
          <rect className="node" x={-R} y={-R} width={R * 2} height={R * 2} rx="9" />
          <path className="node-mark" d="M-8,0 L-2,6 L9,-6" />
        </g>
      ))}
      {!reduce &&
        EDGES.map((_, i) => (
          <circle key={i} r="4.5" className="packet">
            <animateMotion dur={`${3.2 + (i % 4) * 0.5}s`} begin={`${(i * 0.37).toFixed(2)}s`} repeatCount="indefinite">
              <mpath href={`#edge-${i}`} />
            </animateMotion>
          </circle>
        ))}
    </svg>
  )
}

function Home() {
  return (
    <section id="home" className="hero">
      <WorkflowBg />
      <div className="container hero-inner">
        <p className="eyebrow">Software · Workflows · Games</p>
        <h1>
          Software, workflows &amp; games, <span className="accent">hyper-charged.</span>
        </h1>
        <p className="lead">
          Hypertonic Studios builds custom web applications around the way you work, and original
          games from the ground up.
        </p>
        <div className="actions">
          <a className="btn primary" href="#contact">Start a project</a>
          <a className="btn ghost" href="#games">See our games</a>
        </div>
      </div>
    </section>
  )
}

function Software() {
  const points = [
    ['Built around you', 'We start from the way your team already works and shape the software to match.'],
    ['No forced workflows', 'Off-the-shelf tools make you adapt. Custom software adapts to you.'],
    ['Integrates with what you have', 'Connect your existing data, spreadsheets and systems instead of replacing them.'],
    ['Yours to grow', 'Modern, maintainable web apps that evolve as your process does.'],
  ]
  return (
    <section id="software" className="section">
      <div className="container">
        <p className="eyebrow">Software Dev</p>
        <h2>Your workflow, hyper-charged.</h2>
        <p className="lead">
          Most business software asks you to rebuild your process around it. We do the opposite. We
          build custom web applications that support the workflows you already have, so your tools
          work for your team and not the other way around.
        </p>
        <div className="grid">
          {points.map(([t, d]) => (
            <div className="card" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Games() {
  return (
    <section id="games" className="section alt">
      <div className="container split">
        <div>
          <p className="eyebrow">Game Dev</p>
          <h2>Game development</h2>
          <p className="lead">
            We make games the way we make software: start small, iterate fast, and keep the
            tooling honest. Our current project, <strong>StoneWake</strong>, is a voxel RPG about
            sailing, exploration and adventure, with custom-built tools for voxel models,
            animation and world content.
          </p>
          <ul className="checks">
            <li>Prototype early and playtest constantly</li>
            <li>Build custom tools so content ships faster</li>
            <li>Data-driven design that's easy to tune and extend</li>
          </ul>
        </div>
        <figure className="shot">
          <img src={longship} alt="A voxel longship sailing in StoneWake" />
          <figcaption>StoneWake: a longship under sail</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Tools() {
  return (
    <section id="tools" className="section">
      <div className="container">
        <p className="eyebrow">Free Tools</p>
        <h2>Free tools, released regularly.</h2>
        <p className="lead">
          We regularly release free tools: small, useful apps we build to solve real problems and
          share with everyone. Our latest is Frantic Search.
        </p>
        <div className="tool-grid">
          <article className="tool">
            <img src={franticSearch} alt="The Frantic Search deck builder showing a Commander decklist" />
            <div className="tool-body">
              <span className="tag">Featured</span>
              <h3>Frantic Search</h3>
              <p>
                A free Magic: The Gathering Commander deck builder. It scores cards using EDHREC
                theme data and Scryfall oracle tags, then refines your list for synergy.
              </p>
              <a className="btn primary" href="https://www.franticsearch.net/" target="_blank" rel="noreferrer">
                Try Frantic Search
              </a>
            </div>
          </article>
          <article className="tool">
            <img src={voxelEditor} alt="The StoneWake voxel model editor showing a boat model" />
            <div className="tool-body">
              <span className="tag muted">In-house tool</span>
              <h3>StoneWake Model Editor</h3>
              <p>
                The custom voxel editor we built for StoneWake. Paint voxels, mirror and pivot
                parts, and bake models straight into the game.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    const data = new FormData(form)
    data.append('access_key', WEB3FORMS_KEY || '')
    data.append('subject', 'New message from hypertonic website')
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) {
        setStatus('sent')
        form.reset()
      } else {
        setErrorMsg(json.message || '')
        setStatus('error')
      }
    } catch {
      setErrorMsg('')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section alt">
      <div className="container narrow">
        <p className="eyebrow">Contact</p>
        <h2>Let's talk.</h2>
        <p className="lead">Tell us about your project or workflow and we'll get back to you.</p>
        <form className="form" onSubmit={onSubmit}>
          <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" />
          <label>
            Name
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="btn primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'sent' && <p className="note ok">Thanks! We'll be in touch soon.</p>}
          {status === 'error' && <p className="note err">Something went wrong. {errorMsg || 'Please try again.'}</p>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</div>
          {BUSINESS.address && <div className="footer-sub">{BUSINESS.address}</div>}
          {BUSINESS.email && (
            <div className="footer-sub">
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </div>
          )}
        </div>
        <nav className="footer-links" aria-label="Footer">
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  )
}

function Privacy() {
  return (
    <section className="section legal">
      <div className="container narrow">
        <p className="eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="muted-text">Last updated: {POLICY_DATE}</p>
        <p>
          This policy explains what information {BUSINESS.name} ("we", "us") collects through this
          website and how we use it.
        </p>

        <h2>Information we collect</h2>
        <p>
          When you use the contact form, we collect the name, email address and message you
          provide. We don't ask for anything else, and we don't require an account to use this
          site.
        </p>

        <h2>How we use it</h2>
        <p>
          We use your information only to read and respond to your message. We don't sell your
          information or use it for advertising.
        </p>

        <h2>Service providers</h2>
        <ul>
          <li>
            <strong>Web3Forms</strong> processes contact form submissions and delivers them to us
            by email.
          </li>
          <li>
            <strong>DigitalOcean</strong> hosts this website and may keep standard server logs,
            such as IP addresses and browser details.
          </li>
          <li>
            <strong>Google Fonts</strong> serves the site's typeface, so your browser requests it
            from Google, which receives your IP address.
          </li>
        </ul>

        <h2>Cookies and analytics</h2>
        <p>This site doesn't set cookies and doesn't use analytics or advertising trackers.</p>

        <h2>How long we keep it</h2>
        <p>
          We keep messages for as long as needed to respond and to maintain a record of our
          business communications, then delete them.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct or delete the information you've sent us by contacting
          us using the details below.
        </p>

        <h2>Other sites</h2>
        <p>
          Our Free Tools and other linked sites, such as Frantic Search, have their own policies
          that apply when you use them.
        </p>

        <h2>Children</h2>
        <p>This site isn't directed to children under 13, and we don't knowingly collect their information.</p>

        <h2>Changes</h2>
        <p>If we change this policy, we'll update the date above.</p>

        <h2>Contact</h2>
        <p>
          {BUSINESS.name}
          {BUSINESS.address && <><br />{BUSINESS.address}</>}
          {BUSINESS.email && <><br /><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></>}
          <br />
          Or use the <a href="#contact">contact form</a>.
        </p>
      </div>
    </section>
  )
}

function usePage() {
  const read = () => (window.location.hash === '#privacy' ? 'privacy' : 'home')
  const [page, setPage] = useState(read)
  useEffect(() => {
    const onChange = () => setPage(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  useEffect(() => {
    document.title = page === 'privacy' ? 'Privacy Policy | Hypertonic Studios' : 'Hypertonic Studios'
    if (page === 'privacy') {
      window.scrollTo(0, 0)
    } else if (window.location.hash.length > 1) {
      requestAnimationFrame(() =>
        document.getElementById(window.location.hash.slice(1))?.scrollIntoView(),
      )
    }
  }, [page])
  return page
}

export default function App() {
  const page = usePage()
  return (
    <>
      <Header />
      <main>
        {page === 'privacy' ? (
          <Privacy />
        ) : (
          <>
            <Home />
            <Software />
            <Games />
            <Tools />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
