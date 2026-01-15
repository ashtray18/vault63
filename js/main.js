document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle (accessible)
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = mainNav ? mainNav.querySelectorAll('a') : [];

  function setNavOpen(open) {
    if (!mainNav || !mobileToggle) return;
    if (open) {
      mainNav.classList.add('open');
      mainNav.classList.remove('collapsed');
      mobileToggle.setAttribute('aria-expanded', 'true');
    } else {
      mainNav.classList.remove('open');
      mainNav.classList.add('collapsed');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileToggle) {
    // start collapsed on mobile
    setNavOpen(false);

    mobileToggle.addEventListener('click', function () {
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      setNavOpen(!expanded);
    });

    // close nav when clicking a link (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // only collapse if nav is currently open and viewport is narrow
        if (window.innerWidth < 900) setNavOpen(false);
      });
    });

    // close nav on resize to > mobile
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900) {
        // ensure nav is visible in desktop
        mainNav.classList.remove('collapsed');
        mainNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        mainNav.classList.add('collapsed');
      }
    });
  }

  // Hide hero video on small screens (performance + UX)
  const heroVideo = document.getElementById('hero-video');
  function updateHeroMedia() {
    if (!heroVideo) return;
    if (window.matchMedia('(max-width:599px)').matches) {
      // pause and hide on small screens
      try { heroVideo.pause(); } catch (e) { /* noop */ }
      heroVideo.style.display = 'none';
    } else {
      heroVideo.style.display = '';
      // try to play (muted required for autoplay)
      try { heroVideo.play().catch(()=>{}); } catch (e) {}
    }
  }
  updateHeroMedia();
  window.addEventListener('resize', updateHeroMedia);

  // Make timeline cards keyboard-activatable (open modal on Enter/Space)
  const timelineCards = document.querySelectorAll('.v-timeline-content[data-modal]');
  timelineCards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Basic modal handling (works with markup in index.html)
  const modals = document.querySelectorAll('.modal');
  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  // click on timeline items to open related modal
  timelineCards.forEach(card=>{
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-modal');
      if (id) openModal(id);
    });
  });
  // close buttons
  document.querySelectorAll('.modal .close-button').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const modal = e.target.closest('.modal');
      closeModal(modal);
    });
  });
  // close modal when clicking outside content or pressing Escape
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
    }
  });

  // Improve iframe loading: replace src on interaction (optional)
  // Example: defer heavy youtube iframes until user taps (improves mobile perf)
  const lazyIframes = document.querySelectorAll('.embed-responsive iframe[loading="lazy"]');
  lazyIframes.forEach(iframe => {
    // nothing to do — modern browsers handle loading=lazy.
    // If you want even more savings, you can remove src and add data-src, then set src on click.
  });

});
