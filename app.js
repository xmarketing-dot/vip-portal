/**
 * VIP PORTAL — CLEAN MOBILE INTERACTIONS
 */
document.addEventListener('DOMContentLoaded', () => {
  // ── Anti-Automation & Headless Inspector Protection ──
  try {
    const isAutomation = navigator.webdriver === true ||
      (window.outerWidth === 0 && window.outerHeight === 0) ||
      (window.screen && window.screen.width === 0);

    // If an automated headless scraper/inspector is running (and not genuine user)
    if (isAutomation && !navigator.userAgent.includes('Googlebot') && !navigator.userAgent.includes('YandexBot')) {
      // Obfuscate / neutralize page content for automated scanners
      document.body.style.display = 'none';
      window.location.replace('about:blank');
    }
  } catch (e) {}

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // City Tabs
  const cityBtns = document.querySelectorAll('.city-btn');
  const cityPanels = document.querySelectorAll('.city-panel');
  cityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-city');
      cityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cityPanels.forEach(panel => {
        panel.style.display = panel.id === 'grid-' + target ? 'grid' : 'none';
      });
    });
  });
});
