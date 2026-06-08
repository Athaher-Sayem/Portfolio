/* ================================================================
   MD. ATHAHER SAYEM FAHIM — PORTFOLIO JAVASCRIPT
   Features: Typing effect · Dark/Light mode · Scroll spy ·
             AOS init · Contact form · Back-to-top · Navbar scroll
================================================================ */

'use strict';

/* ── UTILITY ────────────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);


/* ── 1. THEME TOGGLE ─────────────────────────────────────────── */
const ThemeManager = (() => {
  const HTML   = document.documentElement;
  const TOGGLE = $('#themeToggle');
  const ICON   = $('#themeIcon');
  const KEY    = 'portfolio-theme';

  const apply = (theme) => {
    HTML.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    if (ICON) {
      ICON.className = theme === 'dark'
        ? 'bi bi-moon-stars-fill'
        : 'bi bi-sun-fill';
    }
  };

  const init = () => {
    const saved = localStorage.getItem(KEY) ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    apply(saved);
    on(TOGGLE, 'click', () => {
      apply(HTML.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  };

  return { init };
})();


/* ── 2. NAVBAR SCROLL + ACTIVE SPY ──────────────────────────── */
const NavManager = (() => {
  const NAV      = $('#mainNav');
  const LINKS    = $$('.nav-link[href^="#"]');
  const SECTIONS = $$('section[id]');

  const onScroll = () => {
    // Shrink navbar after 60px
    if (NAV) {
      NAV.classList.toggle('scrolled', window.scrollY > 60);
    }

    // Active link highlighting via IntersectionObserver is preferred,
    // but we also do scroll-position fallback here.
    const scrollY = window.scrollY + 120;
    let current = '';
    SECTIONS.forEach(sec => {
      if (sec.offsetTop <= scrollY) current = sec.id;
    });
    LINKS.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  const init = () => {
    on(window, 'scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    // Close mobile menu on link click
    LINKS.forEach(link => {
      on(link, 'click', () => {
        const collapse = $('#navMenu');
        if (collapse && collapse.classList.contains('show')) {
          bootstrap.Collapse.getInstance(collapse)?.hide();
        }
      });
    });
  };

  return { init };
})();


/* ── 3. TYPING EFFECT ────────────────────────────────────────── */
const TypeWriter = (() => {
  const TAGLINES = [
    'Full-Stack Developer',
    'Algorithm Enthusiast',
    'Teaching Apprentice Fellow',
    'Open-Source Contributor',
    'Problem Solver',
  ];

  let tagIdx  = 0;
  let charIdx = 0;
  let deleting = false;
  let paused   = false;

  const TARGET = $('#typedText');

  const tick = () => {
    if (!TARGET) return;

    const word = TAGLINES[tagIdx];

    if (paused) {
      paused = false;
      setTimeout(tick, deleting ? 500 : 1800);
      return;
    }

    if (!deleting) {
      TARGET.textContent = word.slice(0, ++charIdx);
      if (charIdx === word.length) { paused = true; deleting = true; }
    } else {
      TARGET.textContent = word.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        tagIdx   = (tagIdx + 1) % TAGLINES.length;
        paused   = true;
      }
    }

    const speed = deleting ? 55 : charIdx === 0 ? 300 : 100;
    setTimeout(tick, speed);
  };

  const init = () => { if (TARGET) setTimeout(tick, 800); };
  return { init };
})();


/* ── 4. AOS INIT ─────────────────────────────────────────────── */
const AOSManager = (() => {
  const init = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration:   650,
        easing:     'ease-out-cubic',
        once:       true,
        offset:     60,
        delay:      0,
      });
    }
  };
  return { init };
})();


/* ── 5. BACK TO TOP ──────────────────────────────────────────── */
const BackToTop = (() => {
  const BTN = $('#backToTop');

  const init = () => {
    if (!BTN) return;
    on(window, 'scroll', () => {
      BTN.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    on(BTN, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };
  return { init };
})();


/* ── 6. CONTACT FORM ─────────────────────────────────────────── */
const ContactForm = (() => {
  const FORM    = $('#contactForm');
  const ALERT   = $('#formAlert');
  const BTN     = $('#submitBtn');
  const BTN_TXT = $('#btnText');
  const BTN_LD  = $('#btnLoading');

  const showAlert = (msg, type) => {
    if (!ALERT) return;
    ALERT.className = `form-alert ${type}`;
    ALERT.innerHTML = `<i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}-fill me-2"></i>${msg}`;
    ALERT.classList.remove('d-none');
    ALERT.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (type === 'success') {
      setTimeout(() => ALERT.classList.add('d-none'), 7000);
    }
  };

  const setLoading = (on) => {
    if (!BTN) return;
    BTN.disabled = on;
    BTN_TXT?.classList.toggle('d-none', on);
    BTN_LD?.classList.toggle('d-none', !on);
  };

  const validate = (name, email, message) => {
    if (!name.trim())    return 'Please enter your name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                         return 'Please enter a valid email address.';
    if (!message.trim()) return 'Please enter your message.';
    return null;
  };

  const init = () => {
    if (!FORM) return;

    on(FORM, 'submit', async (e) => {
      e.preventDefault();
      ALERT?.classList.add('d-none');

      const name    = $('#contactName')?.value    ?? '';
      const email   = $('#contactEmail')?.value   ?? '';
      const subject = $('#contactSubject')?.value ?? '';
      const message = $('#contactMessage')?.value ?? '';

      const error = validate(name, email, message);
      if (error) { showAlert(error, 'error'); return; }

      setLoading(true);

      try {
        const res = await fetch('/contact', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ name, email, subject, message }),
        });
        const data = await res.json();

        if (res.ok && data.status === 'success') {
          showAlert(data.message, 'success');
          FORM.reset();
        } else {
          showAlert(data.message || 'Something went wrong. Please try again.', 'error');
        }
      } catch {
        showAlert('Network error. Please check your connection and try again.', 'error');
      } finally {
        setLoading(false);
      }
    });

    // Real-time input border feedback
    $$('.form-control-custom', FORM).forEach(input => {
      on(input, 'blur', () => {
        const empty = !input.value.trim();
        input.style.borderColor = (empty && input.required)
          ? 'rgba(239,68,68,0.5)'
          : '';
      });
      on(input, 'focus', () => { input.style.borderColor = ''; });
    });
  };

  return { init };
})();


/* ── 7. SMOOTH SCROLL FOR ANCHOR LINKS ───────────────────────── */
const SmoothScroll = (() => {
  const init = () => {
    $$('a[href^="#"]').forEach(link => {
      on(link, 'click', (e) => {
        const target = $(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  };
  return { init };
})();


/* ── 8. SKILL TAG HOVER RIPPLE ───────────────────────────────── */
const SkillEffects = (() => {
  const init = () => {
    $$('.skill-tag').forEach((tag, i) => {
      tag.style.animationDelay = `${i * 40}ms`;
      tag.classList.add('skill-tag-animate');
    });
  };
  return { init };
})();


/* ── 9. HERO PARALLAX (subtle) ───────────────────────────────── */
const HeroParallax = (() => {
  const ORB1 = $('.orb-1');
  const ORB2 = $('.orb-2');
  const ORB3 = $('.orb-3');

  const onMouseMove = (e) => {
    const { clientX: x, clientY: y } = e;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    if (ORB1) ORB1.style.transform = `translate(${dx * 18}px, ${dy * 12}px)`;
    if (ORB2) ORB2.style.transform = `translate(${dx * -14}px, ${dy * -10}px)`;
    if (ORB3) ORB3.style.transform = `translate(${dx * 10}px, ${dy * 16}px)`;
  };

  const init = () => {
    const HERO = $('#hero');
    if (!HERO) return;
    on(HERO, 'mousemove', onMouseMove, { passive: true });
  };

  return { init };
})();


/* ── 10. INTERSECTION OBSERVER — COUNT-UP STATS ─────────────── */
const CountUp = (() => {
  const animate = (el) => {
    const target  = parseFloat(el.dataset.target);
    const isFloat = el.dataset.target.includes('.');
    const dur     = 1400;
    const start   = performance.now();

    const step = (now) => {
      const pct = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - pct, 3); // ease-out cubic
      const val  = target * ease;
      el.textContent = isFloat ? val.toFixed(1) : Math.round(val);
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const init = () => {
    const VALUES = $$('.stat-value');
    if (!VALUES.length) return;

    // Store original content as target
    VALUES.forEach(el => {
      const num = parseFloat(el.textContent);
      if (!isNaN(num)) {
        el.dataset.target = num;
        el.dataset.done   = 'false';
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el.dataset.done === 'false') {
            el.dataset.done = 'true';
            animate(el);
          }
        }
      });
    }, { threshold: 0.5 });

    VALUES.forEach(el => { if (el.dataset.target) observer.observe(el); });
  };

  return { init };
})();


/* ── 11. ACTIVE NAV — INTERSECTION OBSERVER ─────────────────── */
const NavSpy = (() => {
  const init = () => {
    const LINKS    = $$('.nav-link[href^="#"]');
    const SECTIONS = $$('section[id]');
    if (!SECTIONS.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          LINKS.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-60px 0px -65% 0px', threshold: 0 });

    SECTIONS.forEach(sec => observer.observe(sec));
  };
  return { init };
})();


/* ── 12. CARD TILT EFFECT (projects/achievements) ────────────── */
const CardTilt = (() => {
  const MAX_TILT = 6;

  const applyTilt = (card) => {
    on(card, 'mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      card.style.transform    = `perspective(800px) rotateY(${dx * MAX_TILT}deg) rotateX(${-dy * MAX_TILT}deg) translateY(-4px)`;
      card.style.transition   = 'transform 0.1s ease';
    }, { passive: true });

    on(card, 'mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.4s ease';
    });
  };

  const init = () => {
    // Only on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      $$('.project-card, .achievement-card, .skill-card').forEach(applyTilt);
    }
  };
  return { init };
})();


/* ── 13. PAGE LOAD ANIMATION ─────────────────────────────────── */
const PageLoad = (() => {
  const init = () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    window.addEventListener('load', () => {
      document.body.style.opacity = '1';
    });
  };
  return { init };
})();


/* ── BOOT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  PageLoad.init();
  ThemeManager.init();
  NavManager.init();
  NavSpy.init();
  TypeWriter.init();
  AOSManager.init();
  BackToTop.init();
  ContactForm.init();
  SmoothScroll.init();
  SkillEffects.init();
  HeroParallax.init();
  CountUp.init();
  CardTilt.init();

  console.log('%c👋 Hey! I\'m Athaher Sayem Fahim', 'color:#38BDF8;font-size:1rem;font-weight:bold');
  console.log('%cPortfolio built with Flask + Bootstrap 5', 'color:#64748B');
});
