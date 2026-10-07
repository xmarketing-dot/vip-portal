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

  // 2. FAQ Accordion Toggle (.faq-card.open)
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const trigger = card.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');
        // Close all cards
        faqCards.forEach(c => c.classList.remove('open'));
        // Toggle current card
        if (!isOpen) {
          card.classList.add('open');
        }
      });
    }
  });

  // 3. City Tab Switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const districtPanels = document.querySelectorAll('.districts-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCity = btn.getAttribute('data-city');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      districtPanels.forEach(panel => {
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
