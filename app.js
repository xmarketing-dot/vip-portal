/**
 * VIP PORTAL — CLEAN CORPORATE CLIENT INTERACTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Online Counter
  const counterEl = document.getElementById('online-counter');
  if (counterEl) {
    let count = Math.floor(Math.random() * (1580 - 1420 + 1)) + 1420;
    counterEl.textContent = count.toLocaleString('tr-TR');

    setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 2;
      count = Math.max(1200, count + delta);
      counterEl.textContent = count.toLocaleString('tr-TR');
    }, 5000);
  }

  // 2. Clean FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. City Tabs Switching
  const tabItems = document.querySelectorAll('.tab-item');
  const cityPanels = document.querySelectorAll('.city-panel');

  tabItems.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCity = tab.getAttribute('data-city');

      tabItems.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      cityPanels.forEach(panel => {
        if (panel.id === 'grid-' + targetCity) {
          panel.style.display = 'grid';
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });

  // 4. DNS Prefetch for Destination Platforms
  ['https://www.besteskort.online', 'https://escturkiye.devs.surf'].forEach(url => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
});
