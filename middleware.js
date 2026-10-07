/**
 * VIP PORTAL — EDGE ANTI-BTK, ANTI-SCRAPER & SEARCH-ENGINE REFERRER SHIELD
 * 1. Googlebot, YandexBot, Bingbot ve doğrulama dosyaları TAM SERBEST (İndekslenme %100 açık).
 * 2. Ziyaretçiler YALNIZCA Google, Yandex, Bing veya arama motorlarından tıklayınca girebilir.
 * 3. Doğrudan link yapıştıranlar / BTK denetmenleri Google'a yönlendirilir (403 / Redirect).
 * 4. Yönetici/test için ?preview=1 veya ?dev=1 ile direkt giriş açıktır.
 */

const WHITELISTED_CRAWLERS = [
  'google',
  'yandex',
  'bing',
  'duckduck',
  'applebot',
  'twitterbot',
  'twitter',
  'xbot',
  't.co',
  'facebookexternalhit',
  'facebot',
  'meta-externalagent',
  'whatsapp',
  'telegrambot',
  'telegram',
];

const SEARCH_ENGINE_REFERRERS = [
  'google.',
  'yandex.',
  'ya.ru',
  'bing.',
  'duckduckgo.',
  'yahoo.',
  'ecosia.',
  'ask.com',
  'baidu.',
];

const BLOCKED_BOT_SIGNATURES = [
  'headless',
  'puppeteer',
  'playwright',
  'selenium',
  'webdriver',
  'python-requests',
  'python',
  'aiohttp',
  'scrapy',
  'curl/',
  'wget/',
  'go-http-client',
  'libwww-perl',
  'okhttp',
  'semrush',
  'ahrefs',
  'mj12bot',
  'dotbot',
  'petalbot',
  'bytespider',
  'megaindex',
  'blexbot',
  'dataforseo',
  'claudebot',
  'gptbot',
  'ccbot',
  'zgrab',
  'nmap',
  'masscan',
  'nikto',
  'sqlmap',
];

const SUSPICIOUS_REFERRERS = [
  'btk.gov.tr',
  'egm.gov.tr',
  'tib.gov.tr',
];

export default function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname.toLowerCase();
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  const referer = (request.headers.get('referer') || '').toLowerCase();

  // A. Arama Motoru Doğrulama ve Sistem Dosyaları HER ZAMAN SERBEST
  if (
    pathname.includes('google') ||
    pathname.includes('yandex') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/favicon.ico' ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js')
  ) {
    return;
  }

  // B. Meşru Arama Motoru ve Sosyal Önizleme Botları HER ZAMAN SERBEST (SEO Engellenemez)
  const isSearchBot = WHITELISTED_CRAWLERS.some(crawler => ua.includes(crawler));
  if (isSearchBot) {
    return;
  }

  // C. Resmi Kurum Denetim Referansı Engeli
  const isSuspiciousReferrer = SUSPICIOUS_REFERRERS.some(ref => referer.includes(ref));
  if (isSuspiciousReferrer) {
    return new Response('403 Forbidden: Access Denied', {
      status: 403,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }

  // D. Otomasyon / Headless Araç Engeli
  const isObviousAutomation = BLOCKED_BOT_SIGNATURES.some(sig => ua.includes(sig));
  if (isObviousAutomation) {
    return new Response('Access Denied: Automated scraping prohibited.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }

  // E. Geliştirici / Test Bypass Kontrolü (?preview=1 veya ?dev=1)
  if (url.searchParams.has('preview') || url.searchParams.has('dev') || url.searchParams.has('admin')) {
    return;
  }

  // F. KURAL: KULLANICILAR YALNIZCA ARAMA MOTORLARINDAN GİREBİLİR!
  // Eğer kullanıcı doğrudan link yazarak/yapıştırarak geldiyse (Referer yok veya arama motoru değilse)
  const isFromSearchEngine = SEARCH_ENGINE_REFERRERS.some(eng => referer.includes(eng));
  if (!isFromSearchEngine) {
    // Doğrudan gelen kullanıcıyı Google ana sayfasına yönlendir!
    return Response.redirect('https://www.google.com.tr/', 302);
  }
}
