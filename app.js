/**
 * VIP PORTAL — APPLE & PAMBA STYLE MINIMAL INTERACTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Clean FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const toggleBtn = item.querySelector('.faq-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // 2. City Tabs Switching
  const tabBtns = document.querySelectorAll('.city-pill-btn');
  const cityPanels = document.querySelectorAll('.city-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCity = btn.getAttribute('data-city');

      tabBtns.forEach(b => b.classList.remove('active'));
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

  // 3. DNS Prefetch for Destination Platforms
  ['https://www.besteskort.online', 'https://escturkiye.devs.surf'].forEach(url => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
});
