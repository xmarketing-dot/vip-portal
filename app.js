/**
 * VIP PORTAL — HIGH PERFORMANCE INTERACTIVE CLIENT SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Live Online Counter Simulation
  const onlineCountEl = document.getElementById('live-online-count');
  if (onlineCountEl) {
    let currentOnline = Math.floor(Math.random() * (1620 - 1380 + 1)) + 1380;
    onlineCountEl.textContent = currentOnline.toLocaleString('tr-TR');

    setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
      currentOnline = Math.max(1200, currentOnline + delta);
      onlineCountEl.textContent = currentOnline.toLocaleString('tr-TR');
    }, 4500);
  }

  // 2. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other items
        faqItems.forEach(i => i.classList.remove('active'));
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. City Tab Switching
  const cityPills = document.querySelectorAll('.city-pill');
  const cityDistrictPanels = document.querySelectorAll('.districts-panel');

  cityPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCity = pill.getAttribute('data-city');

      cityPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      cityDistrictPanels.forEach(panel => {
        if (panel.id === 'panel-' + targetCity) {
          panel.style.display = 'grid';
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });

  // 4. Preconnect and DNS Prefetch optimization for outgoing target platforms
  const preconnectDomains = [
    'https://www.besteskort.online',
    'https://escturkiye.devs.surf'
  ];
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
});
