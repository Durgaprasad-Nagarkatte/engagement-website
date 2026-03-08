// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll hint: hide when user scrolls down (small screens only)
(function () {
  const hint = document.getElementById('scroll-hint');
  if (!hint) return;
  let ticking = false;
  let lastScrollY = 0;
  const threshold = 60;

  function updateHint() {
    lastScrollY = window.scrollY || window.pageYOffset;
    if (lastScrollY > threshold) {
      hint.classList.add('scroll-hint--hidden');
    } else {
      hint.classList.remove('scroll-hint--hidden');
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateHint);
      ticking = true;
    }
  }

  function maybeHideHint() {
    const canScroll = document.documentElement.scrollHeight > window.innerHeight;
    hint.style.display = canScroll ? '' : 'none';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', maybeHideHint);
  maybeHideHint();
  updateHint();
})();
