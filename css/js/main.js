// Sticky header shadow on scroll
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 40 ? '0 6px 24px -16px rgba(28,26,19,.3)' : 'none';
  });
}

// Mobile nav toggle with backdrop, close-on-link, and Escape key
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('main-nav');
const backdrop = document.getElementById('navBackdrop');

function openNav() {
  nav.style.display = 'flex';
  nav.style.cssText += 'position:absolute; top:74px; left:0; right:0; background:var(--surface); flex-direction:column; padding:22px 40px; gap:18px; border-bottom:1px solid var(--line); z-index:250;';
  if (backdrop) backdrop.classList.add('show');
}
function closeNav() {
  nav.style.display = 'none';
  if (backdrop) backdrop.classList.remove('show');
}
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.style.display === 'flex';
    isOpen ? closeNav() : openNav();
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
}
if (backdrop) backdrop.addEventListener('click', closeNav);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav) closeNav(); });

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Scroll progress bar + back-to-top button
const progress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
if (progress || backToTop) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = scrolled + '%';
    if (backToTop) backToTop.classList.toggle('show', h.scrollTop > 500);
  });
}
if (backToTop) {
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Quote form preview note with loading feedback
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Request Sent \u2713';
      const note = document.getElementById('form-note');
      if (note) { note.style.display = 'block'; note.textContent = 'This is a design preview â€” connect a real form endpoint before launch.'; }
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2500);
    }, 600);
  });
}
