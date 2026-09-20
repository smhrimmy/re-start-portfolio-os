/* ══════════════════════════════════════════════════════════
   index.js — 2025/2026 Trending Portfolio — Animation Engine
   ══════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ── 1. Lenis Smooth Scroll ── */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 2,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


/* ── 2. Custom Cursor ── */
const cursorDot = document.querySelector('.cursor__dot');
const cursorRing = document.querySelector('.cursor__ring');

if (cursorDot && cursorRing) {
  const pos = { x: 0, y: 0 };
  const ringPos = { x: 0, y: 0 };

  window.addEventListener('pointermove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;

    /* Dot follows immediately */
    gsap.set(cursorDot, { x: pos.x, y: pos.y });
  });

  /* Ring follows with spring-like lag */
  gsap.ticker.add(() => {
    ringPos.x += (pos.x - ringPos.x) * 0.15;
    ringPos.y += (pos.y - ringPos.y) * 0.15;
    gsap.set(cursorRing, { x: ringPos.x, y: ringPos.y });
  });

  /* Hover scale on interactive elements */
  document.querySelectorAll('[data-hover], a, button').forEach((el) => {
    el.addEventListener('pointerenter', () => document.body.classList.add('cursor--hover'));
    el.addEventListener('pointerleave', () => document.body.classList.remove('cursor--hover'));
  });
}


/* ── 3. Loader ── */
const loader = document.getElementById('loader');
const loaderCounter = document.querySelector('.loader__counter');
const loaderFill = document.querySelector('.loader__fill');

if (loader) {
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => loader.remove(),
      });
      animateHeroEntrance();
    },
  });

  /* Count 0 → 100 */
  tl.to({ val: 0 }, {
    val: 100,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate: function () {
      const v = Math.round(this.targets()[0].val);
      if (loaderCounter) loaderCounter.textContent = v;
    },
  });

  /* Bar fill in sync */
  tl.to(loaderFill, { width: '100%', duration: 1.8, ease: 'power2.inOut' }, 0);
}


/* ── 4. Hero Entrance ── */
function animateHeroEntrance() {
  gsap.from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power3.out' });
  gsap.from('.hero__heading .line', { y: 60, opacity: 0, duration: 1, stagger: 0.1, delay: 0.2, ease: 'power3.out' });
  gsap.from('.hero__sub', { y: 20, opacity: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' });
  gsap.from('.hero .btn', { y: 20, opacity: 0, duration: 0.8, delay: 0.75, ease: 'power3.out' });
  gsap.from('.marquee', { opacity: 0, duration: 1, delay: 1, ease: 'power2.out' });
  gsap.from('.hero__scroll-hint', { opacity: 0, y: 10, duration: 0.8, delay: 1.1, ease: 'power3.out' });
}


/* ── 5. Split-Text Reveal on Scroll ── */
document.querySelectorAll('.reveal-text').forEach((el) => {
  /* Skip hero elements — they animate via entrance */
  if (el.closest('.hero')) return;

  const text = el.innerHTML;
  const words = text.split(/\s+/).filter(Boolean);
  el.innerHTML = words
    .map((w) => `<span class="word"><span class="word-inner">${w}</span></span>`)
    .join(' ');

  gsap.to(el.querySelectorAll('.word-inner'), {
    y: 0,
    duration: 0.8,
    stagger: 0.04,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
});


/* ── 6. Section Tag Fade-In ── */
gsap.utils.toArray('.section-tag').forEach((tag) => {
  gsap.from(tag, {
    opacity: 0,
    x: -20,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: { trigger: tag, start: 'top 85%' },
  });
});


/* ── 7. About Stats Counter ── */
gsap.utils.toArray('.stat__number').forEach((num) => {
  const end = parseInt(num.textContent, 10);
  const suffix = num.textContent.replace(/\d+/, '');

  ScrollTrigger.create({
    trigger: num,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to({ val: 0 }, {
        val: end,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: function () {
          num.textContent = Math.round(this.targets()[0].val) + suffix;
        },
      });
    },
  });
});


/* ── 8. Horizontal Scroll Gallery ── */
const workTrack = document.querySelector('.work__track');
const workScroller = document.querySelector('.work__scroller');

if (workTrack && workScroller) {
  /* Wait for images / layout to settle */
  requestAnimationFrame(() => {
    const panels = workTrack.querySelectorAll('.project-panel');
    if (panels.length === 0) return;

    const totalScroll = workTrack.scrollWidth - workScroller.offsetWidth;

    gsap.to(workTrack, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: '.work',
        start: 'top 10%',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    /* Stagger panels in from bottom on scroll */
    panels.forEach((panel, i) => {
      gsap.from(panel, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.work',
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });
    });
  });
}


/* ── 9. Contact Reveal ── */
gsap.from('.contact__inner', {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact',
    start: 'top 70%',
  },
});


/* ── 10. Magnetic Buttons ── */
document.querySelectorAll('.magnetic').forEach((btn) => {
  btn.addEventListener('pointermove', (e) => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - r.left - r.width / 2;
    const dy = e.clientY - r.top - r.height / 2;
    gsap.to(btn, { x: dx * 0.2, y: dy * 0.2, duration: 0.4, ease: 'power2.out' });
  });

  btn.addEventListener('pointerleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  });
});


/* ── 11. Nav Overlay Toggle ── */
const menuBtn = document.querySelector('.header__menu');
const navOverlay = document.querySelector('.nav-overlay');

if (menuBtn && navOverlay) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navOverlay.classList.toggle('is-open');
    menuBtn.classList.toggle('is-open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
    navOverlay.setAttribute('aria-hidden', !isOpen);

    /* Lock / unlock scroll */
    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  /* Close on link click */
  navOverlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navOverlay.classList.remove('is-open');
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', false);
      navOverlay.setAttribute('aria-hidden', true);
      lenis.start();
    });
  });
}


/* ── 12. Animated Gradient Blob (replaces Three.js) ── */
const blobCanvas = document.getElementById('blob-canvas');

if (blobCanvas) {
  const ctx = blobCanvas.getContext('2d');
  let w, h;

  function resizeBlob() {
    const rect = blobCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    w = rect.width;
    h = rect.height;
    blobCanvas.width = w * dpr;
    blobCanvas.height = h * dpr;
    ctx.scale(dpr, dpr);
  }

  resizeBlob();
  window.addEventListener('resize', resizeBlob);

  /* Simple 2D noise for organic motion */
  function noise(x, y, t) {
    return (
      Math.sin(x * 1.3 + t * 0.7) * Math.cos(y * 0.9 + t * 0.5) * 0.5 +
      Math.sin(x * 2.1 - t * 0.4) * Math.cos(y * 1.7 + t * 0.8) * 0.3 +
      Math.sin(x * 0.7 + y * 1.1 + t * 0.6) * 0.2
    );
  }

  function drawBlob(t) {
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const baseR = Math.min(w, h) * 0.32;
    const points = 120;

    /* Draw multiple layered blobs */
    const layers = [
      { color: 'rgba(167, 139, 250, 0.35)', rMul: 1.0, speed: 1.0 },
      { color: 'rgba(212, 255, 79, 0.15)', rMul: 0.85, speed: 1.3 },
      { color: 'rgba(167, 139, 250, 0.12)', rMul: 1.18, speed: 0.7 },
    ];

    layers.forEach((layer) => {
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const nx = Math.cos(angle) * 2;
        const ny = Math.sin(angle) * 2;
        const offset = noise(nx, ny, t * layer.speed) * baseR * 0.25;
        const r = baseR * layer.rMul + offset;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      /* Radial gradient fill */
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * layer.rMul * 1.3);
      grad.addColorStop(0, layer.color);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fill();
    });

    /* Center glow */
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 0.5);
    glow.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, baseR * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  let blobTime = 0;
  function animateBlob() {
    blobTime += 0.008;
    drawBlob(blobTime);
    requestAnimationFrame(animateBlob);
  }
  animateBlob();
}


/* ── 13. Footer — smooth scroll to top ── */
document.querySelector('.footer__top')?.addEventListener('click', (e) => {
  e.preventDefault();
  lenis.scrollTo('#hero', { duration: 2 });
});
