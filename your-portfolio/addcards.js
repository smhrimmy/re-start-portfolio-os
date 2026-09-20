/* ──────────────────────────────────────────────────────────
   addcards.js — Project data + horizontal scroll panel renderer
   ────────────────────────────────────────────────────────── */

const projects = [
  {
    number: '01',
    title: 'Meridian',
    category: 'Web Experience',
    year: '2026',
    description:
      'An immersive editorial platform with cinematic scroll transitions, ambient soundscapes, and real-time data visualisation.',
    color: '#a78bfa',
    link: '#',
  },
  {
    number: '02',
    title: 'Lucid OS',
    category: 'Interactive Product',
    year: '2025',
    description:
      'A browser-based operating system concept featuring window management, a CMS dashboard, and a custom design-token engine.',
    color: '#d4ff4f',
    link: '#',
  },
  {
    number: '03',
    title: 'Synthwave',
    category: 'Creative Development',
    year: '2025',
    description:
      'A generative audio-visual playground built with Web Audio API and WebGL shaders — sound becomes geometry.',
    color: '#f97316',
    link: '#',
  },
  {
    number: '04',
    title: 'Arcana',
    category: 'Brand & Motion',
    year: '2024',
    description:
      'Brand identity and micro-interaction library for a fintech startup — 60fps Lottie animations across web and mobile.',
    color: '#38bdf8',
    link: '#',
  },
  {
    number: '05',
    title: 'Terraform',
    category: 'Full-Stack App',
    year: '2024',
    description:
      'A collaborative real-time mapping tool for urban planners, built with Next.js, Mapbox GL, and WebSocket sync.',
    color: '#fb7185',
    link: '#',
  },
];

/* ── Render panels into the horizontal track ── */
const track = document.getElementById('project-track');

if (track) {
  track.innerHTML = projects
    .map(
      (p) => `
    <article class="project-panel" data-accent="${p.color}">
      <div class="project-panel__visual" style="background: radial-gradient(circle at 30% 40%, ${p.color}33, transparent 60%), linear-gradient(135deg, #18181b, #0a0a0a);">
        <span class="project-panel__num">${p.number}</span>
        <div class="project-panel__orb" style="background: radial-gradient(circle at 35% 30%, ${p.color}, ${p.color}44 55%, transparent 80%); box-shadow: 0 0 80px ${p.color}66;"></div>
      </div>
      <div class="project-panel__info">
        <div class="project-panel__meta">
          <span class="project-panel__cat">${p.category}</span>
          <time>${p.year}</time>
        </div>
        <h3 class="project-panel__title">${p.title}</h3>
        <p class="project-panel__desc">${p.description}</p>
        <a href="${p.link}" class="project-panel__link magnetic" data-hover>
          <span>View Project</span>
          <span class="btn__arrow">↗</span>
        </a>
      </div>
    </article>
  `
    )
    .join('');
}
