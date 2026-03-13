<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Kimelia Lumora — AI-Powered Learning Platform</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  :root {
    --ink: #0a0a0f;
    --ink2: #3a3a4a;
    --ink3: #7a7a90;
    --bg: #f7f6f2;
    --surface: #ffffff;
    --accent: #4f3ef5;
    --accent2: #00c9a0;
    --accent3: #ff6b35;
    --gold: #f0b429;
    --border: rgba(10,10,20,0.09);
    --radius: 14px;
    --mono: 'DM Mono', monospace;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-size: 15.5px;
    line-height: 1.75;
    -webkit-font-smoothing: antialiased;
  }

  /* ── HERO ── */
  .hero {
    background: var(--ink);
    color: #fff;
    padding: 90px 64px 80px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 30%, rgba(79,62,245,.45) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,201,160,.25) 0%, transparent 50%);
    pointer-events: none;
  }
  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: var(--accent2);
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .hero-eyebrow::before {
    content: '';
    display: inline-block;
    width: 32px;
    height: 1.5px;
    background: var(--accent2);
  }
  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(42px, 6vw, 72px);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -.02em;
    max-width: 700px;
    position: relative;
  }
  .hero h1 span {
    background: linear-gradient(110deg, #7c6fff 0%, #00c9a0 60%, #f0b429 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-sub {
    margin-top: 26px;
    font-size: 17px;
    color: rgba(255,255,255,.65);
    max-width: 520px;
    line-height: 1.7;
  }
  .hero-badges {
    margin-top: 36px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .badge {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .04em;
    padding: 5px 14px;
    border-radius: 99px;
    border: 1px solid rgba(255,255,255,.18);
    color: rgba(255,255,255,.75);
    background: rgba(255,255,255,.07);
    backdrop-filter: blur(8px);
  }
  .badge.primary {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
    font-weight: 500;
  }

  /* ── LAYOUT ── */
  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 40px;
  }
  .section { padding: 72px 0 56px; }
  .section + .section { border-top: 1px solid var(--border); }

  /* ── SECTION HEADINGS ── */
  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 10.5px;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .section-label::after {
    content: '';
    display: inline-block;
    flex: 1;
    height: 1px;
    background: var(--accent);
    opacity: .25;
    max-width: 60px;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(26px, 3.5vw, 38px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -.02em;
    margin-bottom: 10px;
  }
  .section-body {
    color: var(--ink2);
    font-size: 15.5px;
    max-width: 580px;
    line-height: 1.75;
    margin-bottom: 36px;
  }

  /* ── FEATURE GRID ── */
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
    margin-top: 8px;
  }
  .feature-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px 26px;
    transition: transform .2s, box-shadow .2s, border-color .2s;
  }
  .feature-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(10,10,20,.07);
    border-color: rgba(79,62,245,.2);
  }
  .feature-icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-size: 19px;
  }
  .icon-purple { background: rgba(79,62,245,.1); }
  .icon-teal   { background: rgba(0,201,160,.12); }
  .icon-orange { background: rgba(255,107,53,.1); }
  .icon-gold   { background: rgba(240,180,41,.12); }
  .icon-blue   { background: rgba(56,130,246,.1); }
  .icon-pink   { background: rgba(236,72,153,.1); }

  .feature-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: -.01em;
  }
  .feature-card p {
    font-size: 14px;
    color: var(--ink2);
    line-height: 1.65;
  }

  /* ── ARCHITECTURE BLOCK ── */
  .arch-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  @media (max-width: 640px) { .arch-grid { grid-template-columns: 1fr; } }
  .arch-card {
    border-radius: var(--radius);
    padding: 26px 24px;
    border: 1px solid var(--border);
  }
  .arch-card.dark { background: var(--ink); color: #fff; border-color: rgba(255,255,255,.07); }
  .arch-card.light { background: var(--surface); }
  .arch-card h4 {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .arch-card.dark h4 { color: var(--accent2); }
  .arch-card.light h4 { color: var(--accent); }
  .arch-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 13px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    margin: 4px 4px 0 0;
  }
  .arch-card.dark .arch-pill {
    background: rgba(255,255,255,.07);
    color: rgba(255,255,255,.8);
    border: 1px solid rgba(255,255,255,.1);
  }
  .arch-card.light .arch-pill {
    background: rgba(79,62,245,.06);
    color: var(--accent);
    border: 1px solid rgba(79,62,245,.14);
  }
  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot-green { background: var(--accent2); }
  .dot-purple { background: #7c6fff; }
  .dot-orange { background: var(--accent3); }
  .dot-blue { background: #60a5fa; }

  /* ── STRUCTURE TREE ── */
  .file-tree {
    background: var(--ink);
    border-radius: var(--radius);
    padding: 28px 30px;
    font-family: 'DM Mono', monospace;
    font-size: 13.5px;
    line-height: 2;
    color: rgba(255,255,255,.55);
    overflow-x: auto;
  }
  .ft-dir { color: #7c6fff; }
  .ft-comment { color: rgba(255,255,255,.3); font-style: italic; }
  .ft-root { color: var(--accent2); font-weight: 500; }

  /* ── API / DEPLOY ── */
  .info-strip {
    border-left: 3px solid var(--accent);
    background: rgba(79,62,245,.05);
    border-radius: 0 var(--radius) var(--radius) 0;
    padding: 20px 24px;
    font-size: 14.5px;
    margin-bottom: 16px;
  }
  .info-strip strong { font-weight: 600; color: var(--accent); }
  .code-inline {
    font-family: 'DM Mono', monospace;
    background: rgba(79,62,245,.1);
    color: var(--accent);
    padding: 1px 7px;
    border-radius: 5px;
    font-size: .9em;
  }

  .deploy-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-top: 8px;
  }
  @media (max-width: 640px) { .deploy-grid { grid-template-columns: 1fr; } }
  .deploy-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 22px 20px;
  }
  .deploy-card .step-num {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    line-height: 1;
    color: rgba(79,62,245,.12);
    margin-bottom: 12px;
  }
  .deploy-card h4 {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .deploy-card p { font-size: 13.5px; color: var(--ink2); line-height: 1.55; }

  /* ── FOOTER ── */
  .footer {
    background: var(--ink);
    color: rgba(255,255,255,.45);
    padding: 48px 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: gap;
    gap: 20px;
  }
  .footer-brand {
    font-family: 'Syne', sans-serif;
    font-size: 19px;
    font-weight: 800;
    color: #fff;
    letter-spacing: -.02em;
  }
  .footer-brand span { color: var(--accent2); }
  .footer p { font-size: 13px; line-height: 1.6; max-width: 340px; }
  .footer-right { text-align: right; }
  .footer-built {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: .06em;
    color: rgba(255,255,255,.25);
    margin-top: 4px;
  }

  /* ── DIVIDER ── */
  .divider {
    height: 1px;
    background: linear-gradient(to right, transparent, var(--border), transparent);
    margin: 0;
  }

  /* ── LANG TAGS ── */
  .lang-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 20px;
  }
  .lang-tag {
    font-family: 'DM Mono', monospace;
    font-size: 11.5px;
    padding: 5px 13px;
    border-radius: 99px;
    border: 1px solid var(--border);
    color: var(--ink2);
    background: var(--surface);
    letter-spacing: .02em;
  }

  @media (max-width: 720px) {
    .hero { padding: 60px 28px 60px; }
    .container { padding: 0 22px; }
    .footer { padding: 36px 28px; flex-direction: column; }
    .footer-right { text-align: left; }
  }
</style>
</head>
<body>

<!-- ── HERO ──────────────────────────────────── -->
<header class="hero">
  <div class="hero-eyebrow">Full-Stack Learning Platform</div>
  <h1>Kimelia<br/><span>Lumora</span></h1>
  <p class="hero-sub">
    A premium, AI-first learning management system that breaks the limits of traditional online education through real-time personalized tutoring, smart grading, and dynamic study paths.
  </p>
  <div class="hero-badges">
    <span class="badge primary">v1.0 · Active</span>
    <span class="badge">Node.js · Express</span>
    <span class="badge">MongoDB Atlas</span>
    <span class="badge">Google Gemini 1.5</span>
    <span class="badge">Flutter · Dart</span>
    <span class="badge">MIT License</span>
  </div>
</header>

<!-- ── OVERVIEW ──────────────────────────────── -->
<div class="container">
  <section class="section">
    <div class="section-label">Overview</div>
    <h2 class="section-title">Education, reinvented<br/>from the ground up</h2>
    <p class="section-body">
      Kimelia Lumora is not another course platform. It is a fully integrated ecosystem where artificial intelligence is a first-class citizen — embedded into every interaction, from the moment a student asks a question to the moment a certificate is issued.
    </p>

    <div class="feature-grid">
      <div class="feature-card">
        <div class="feature-icon icon-purple">🤖</div>
        <h3>AI-Powered Mentor</h3>
        <p>24/7 study assistant powered by Google Gemini 1.5 Flash. Responds fluently in English, French, and Kinyarwanda with contextually aware guidance.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon icon-teal"></div>
        <h3>Smart Grading</h3>
        <p>AI-driven assignment evaluation delivers instant, constructive feedback — removing grading delays and keeping learners in the flow state.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon icon-gold"></div>
        <h3>Gamified Learning</h3>
        <p>Real-time streak tracking, global leaderboards, and experience points (XP) that transform passive study into active, habitual engagement.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon icon-orange"></div>
        <h3>Progress Tracking</h3>
        <p>Dynamic course completion analytics and verifiable certificate generation that give learners a clear, motivating picture of their progress.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon icon-blue"></div>
        <h3>Secure Infrastructure</h3>
        <p>JWT authentication, Helmet, rate limiting, XSS protection, and role-based access control (RBAC) for distinct Admin and Student journeys.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon icon-pink"></div>
        <h3>Multilingual First</h3>
        <p>Built specifically for diverse learner communities. Language is not an afterthought — it is a core dimension of the mentoring experience.</p>
      </div>
    </div>
  </section>

  <!-- ── ARCHITECTURE ──────────────────────────── -->
  <section class="section">
    <div class="section-label">System Architecture</div>
    <h2 class="section-title">A modern stack built<br/>for production scale</h2>
    <p class="section-body">
      Every layer of the system is chosen for reliability, developer velocity, and AI-readiness — from the cross-platform Flutter frontend to the Gemini-integrated Node.js backend.
    </p>

    <div class="arch-grid">
      <div class="arch-card dark">
        <h4>Backend</h4>
        <div>
          <span class="arch-pill"><span class="dot dot-green"></span>Node.js</span>
          <span class="arch-pill"><span class="dot dot-green"></span>Express</span>
          <span class="arch-pill"><span class="dot dot-purple"></span>MongoDB Atlas</span>
          <span class="arch-pill"><span class="dot dot-orange"></span>Swagger / OpenAPI</span>
          <span class="arch-pill"><span class="dot dot-blue"></span>JWT Auth</span>
          <span class="arch-pill"><span class="dot dot-blue"></span>Helmet + Rate Limit</span>
        </div>
      </div>
      <div class="arch-card dark">
        <h4>Frontend</h4>
        <div>
          <span class="arch-pill"><span class="dot dot-blue"></span>Flutter</span>
          <span class="arch-pill"><span class="dot dot-blue"></span>Dart</span>
          <span class="arch-pill"><span class="dot dot-purple"></span>Riverpod State Mgmt</span>
          <span class="arch-pill"><span class="dot dot-green"></span>Mobile &amp; Web</span>
        </div>
      </div>
      <div class="arch-card light">
        <h4>Intelligence</h4>
        <div>
          <span class="arch-pill">Google Gemini 1.5 Flash</span>
          <span class="arch-pill">AI Tutor</span>
          <span class="arch-pill">Smart Grader</span>
          <span class="arch-pill">Hint Generator</span>
        </div>
      </div>
      <div class="arch-card light">
        <h4>DevOps</h4>
        <div>
          <span class="arch-pill">Render (Server)</span>
          <span class="arch-pill">MongoDB Atlas (DB)</span>
          <span class="arch-pill">GitHub Actions CI/CD</span>
          <span class="arch-pill">Containerised</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── REPO STRUCTURE ────────────────────────── -->
  <section class="section">
    <div class="section-label">Repository</div>
    <h2 class="section-title">Clean, purposeful<br/>project structure</h2>

    <div class="file-tree">
<span class="ft-root">kimelia-lumora/</span>
├── <span class="ft-dir">backend/</span>           <span class="ft-comment"># Node.js / Express REST API</span>
│   ├── <span class="ft-dir">src/</span>
│   │   ├── <span class="ft-dir">controllers/</span>   <span class="ft-comment"># Route handlers</span>
│   │   ├── <span class="ft-dir">models/</span>        <span class="ft-comment"># MongoDB schemas</span>
│   │   ├── <span class="ft-dir">routes/</span>        <span class="ft-comment"># API route definitions</span>
│   │   ├── <span class="ft-dir">middleware/</span>    <span class="ft-comment"># Auth, rate limit, XSS</span>
│   │   └── <span class="ft-dir">services/</span>      <span class="ft-comment"># AI &amp; business logic</span>
│   └── server.js
│
├── <span class="ft-dir">frontend/</span>          <span class="ft-comment"># Flutter application</span>
│   ├── <span class="ft-dir">lib/</span>
│   │   ├── <span class="ft-dir">screens/</span>       <span class="ft-comment"># UI pages</span>
│   │   ├── <span class="ft-dir">providers/</span>     <span class="ft-comment"># Riverpod state</span>
│   │   └── <span class="ft-dir">services/</span>      <span class="ft-comment"># API clients</span>
│   └── pubspec.yaml
│
├── <span class="ft-dir">docs/</span>              <span class="ft-comment"># Technical architecture &amp; business reports</span>
└── <span class="ft-dir">.github/</span>           <span class="ft-comment"># CI/CD workflows</span>
    └── <span class="ft-dir">workflows/</span>
        ├── test.yml
        └── deploy.yml
    </div>
  </section>

  <!-- ── API DOCS ──────────────────────────────── -->
  <section class="section">
    <div class="section-label">API Documentation</div>
    <h2 class="section-title">Interactive API docs<br/>via Swagger</h2>

    <div class="info-strip">
      <strong>Swagger UI</strong> is available at <span class="code-inline">[BASE_URL]/api/docs</span> once the server is running. The full OpenAPI specification covers all authentication, course, AI, and leaderboard endpoints.
    </div>
    <div class="info-strip" style="border-left-color: var(--accent2); background: rgba(0,201,160,.05);">
      <strong style="color: var(--accent2);">Base URL</strong> — Production: your Render deployment URL. Local development: <span class="code-inline">http://localhost:3000</span>
    </div>

    <div class="lang-row">
      <span class="lang-tag">POST /api/auth/register</span>
      <span class="lang-tag">POST /api/auth/login</span>
      <span class="lang-tag">GET /api/courses</span>
      <span class="lang-tag">POST /api/ai/ask</span>
      <span class="lang-tag">POST /api/assignments/grade</span>
      <span class="lang-tag">GET /api/leaderboard</span>
      <span class="lang-tag">GET /api/certificates/:id</span>
    </div>
  </section>

  <!-- ── DEPLOYMENT ────────────────────────────── -->
  <section class="section">
    <div class="section-label">Deployment</div>
    <h2 class="section-title">Zero-friction deployment<br/>pipeline</h2>
    <p class="section-body">
      The platform is built for containerised, cloud-native deployment. From a git push to a live production environment in minutes.
    </p>

    <div class="deploy-grid">
      <div class="deploy-card">
        <div class="step-num">01</div>
        <h4>Database</h4>
        <p>Hosted on MongoDB Atlas. Configure your connection string via environment variables — no manual provisioning required.</p>
      </div>
      <div class="deploy-card">
        <div class="step-num">02</div>
        <h4>Server</h4>
        <p>Deployed on Render with automated environment configuration. Connect your GitHub repo and Render handles the rest.</p>
      </div>
      <div class="deploy-card">
        <div class="step-num">03</div>
        <h4>CI / CD</h4>
        <p>GitHub Actions runs tests on every pull request and auto-deploys to production on merge to <span class="code-inline">main</span>.</p>
      </div>
    </div>
  </section>
</div>

<div class="divider"></div>

<!-- ── FOOTER ────────────────────────────────── -->
<footer class="footer">
  <div>
    <div class="footer-brand">Kimelia <span>Lumora</span></div>
    <p style="margin-top: 10px;">A premium AI-first learning ecosystem designed to break the limitations of traditional online education. Built with purpose, deployed with precision.</p>
  </div>
  <div class="footer-right">
    <p>© 2026 Kimelia Lumora.<br/>All Rights Reserved.</p>
    <div class="footer-built">Built with ❤to revolutionise education through AI</div>
  </div>
</footer>

</body>
</html>