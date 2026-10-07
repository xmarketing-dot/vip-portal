/**
 * VIP PORTAL — CLEAN MOBILE INTERACTIONS & SEARCH-ENGINE REFERRER SHIELD
 */
(function() {
  // ── 1. ARAMA MOTORUNDAN GELİŞ KONTROLÜ (CLIENT-SIDE SHIELD) ──
  try {
    const isBot = navigator.userAgent.includes('Googlebot') ||
      navigator.userAgent.includes('YandexBot') ||
      navigator.userAgent.includes('bingbot');

    const params = new URLSearchParams(window.location.search);
    const hasBypass = params.has('preview') || params.has('dev') || params.has('admin');

    if (hasBypass) {
      sessionStorage.setItem('vip_allowed', 'true');
    }

    const isAlreadyAllowed = sessionStorage.getItem('vip_allowed') === 'true';

    // Arama Motorları
    const searchEngines = ['google.', 'yandex.', 'ya.ru', 'bing.', 'duckduckgo.', 'yahoo.', 'ecosia.'];
    const ref = (document.referrer || '').toLowerCase();
    const isFromSearch = searchEngines.some(se => ref.includes(se));

    if (isFromSearch) {
      sessionStorage.setItem('vip_allowed', 'true');
    }

    // Eğer bot değilse, bypass yoksa ve arama motorundan gelmemişse (Direkt giriş) -> Google'a at!
    if (!isBot && !hasBypass && !isAlreadyAllowed && !isFromSearch) {
      document.documentElement.style.display = 'none';
      window.location.replace('https://www.google.com.tr/');
      return;
    }

    // Anti-Headless / Webdriver tespiti
    if (navigator.webdriver === true && !isBot) {
      document.documentElement.style.display = 'none';
      window.location.replace('https://www.google.com.tr/');
      return;
    }
  } catch (e) {}
})();

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
