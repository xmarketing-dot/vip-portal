/**
 * VIP PORTAL — ROMANTIC DATE INTERACTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion (.faq-row.active)
  const faqRows = document.querySelectorAll('.faq-row');
  faqRows.forEach(row => {
    const btn = row.querySelector('.faq-header-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = row.classList.contains('active');
        faqRows.forEach(r => r.classList.remove('active'));
        if (!isActive) {
          row.classList.add('active');
        }
      });
    }
  });

  // 2. City Tabs Switching
  const cityBtns = document.querySelectorAll('.city-romantic-btn');
  const cityPanels = document.querySelectorAll('.city-panel');

  cityBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCity = btn.getAttribute('data-city');

      cityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cityPanels.forEach(panel => {
        if (panel.id === 'grid-' + targetCity) {
          panel.style.display = 'grid';
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });

  // 3. Outgoing Speed Preconnect
  ['https://www.besteskort.online', 'https://escturkiye.devs.surf'].forEach(url => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
});
