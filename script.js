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

// Scroll hint: hide when user scrolls down or reaches the bottom
(function () {
  const hint = document.getElementById('scroll-hint');
  if (!hint) return;
  let ticking = false;
  const threshold = 60;
  const bottomBuffer = 20;

  function updateHint() {
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const atTop = scrollY <= threshold;
    const atBottom = maxScroll <= bottomBuffer || scrollY >= maxScroll - bottomBuffer;
    const shouldHide = !atTop || atBottom;
    hint.classList.toggle('scroll-hint--hidden', shouldHide);
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
  window.addEventListener('resize', function () {
    maybeHideHint();
    updateHint();
  });
  maybeHideHint();
  updateHint();
})();
