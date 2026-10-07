/**
 * VIP PORTAL — CLEAN MOBILE INTERACTIONS
 */
document.addEventListener('DOMContentLoaded', () => {
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
