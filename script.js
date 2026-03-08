document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

(function () {
  const triggers = document.querySelectorAll('.profile-trigger[data-profile]');
  const modals = document.querySelectorAll('.profile-modal');

  function openModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.profile-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const trigger = document.querySelector('.profile-trigger[aria-controls="' + modal.id + '"]');
    if (trigger) trigger.focus();
  }

  triggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = this.getAttribute('aria-controls');
      const modal = id ? document.getElementById(id) : null;
      if (modal) {
        openModal(modal);
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  modals.forEach(function (modal) {
    modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
      el.addEventListener('click', function () {
        closeModal(modal);
        const trigger = document.querySelector('.profile-trigger[aria-controls="' + modal.id + '"]');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    modals.forEach(function (modal) {
      if (modal.getAttribute('aria-hidden') === 'false') {
        closeModal(modal);
        const trigger = document.querySelector('.profile-trigger[aria-controls="' + modal.id + '"]');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

(function () {
  const hint = document.getElementById('scroll-hint');
  const scrollContainer = document.querySelector('.page');
  if (!hint) return;
  /* Scroll may happen on .page (overflow-y: auto) or on window; use the one that actually scrolls */
  const getScrollTop = function () {
    if (scrollContainer && scrollContainer.scrollHeight > scrollContainer.clientHeight) {
      return scrollContainer.scrollTop;
    }
    return window.scrollY || window.pageYOffset;
  };
  const getCanScroll = function () {
    if (scrollContainer) {
      return scrollContainer.scrollHeight > scrollContainer.clientHeight;
    }
    return document.documentElement.scrollHeight > window.innerHeight;
  };
  let ticking = false;
  const threshold = 60;

  function updateHint() {
    var scrollTop = getScrollTop();
    if (scrollTop > threshold) {
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
    hint.style.display = getCanScroll() ? '' : 'none';
  }

  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', maybeHideHint);
  maybeHideHint();
  updateHint();
})();
