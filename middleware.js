/**
 * VIP PORTAL — EDGE ANTI-BTK & ANTI-SCRAPER MIDDLEWARE
 * Birebir Best Eskort & Esc Türkiye projelerindeki güvenlik kalkanı mimarisiyle aynıdır.
 * Googlebot ve Yandexbot'a %100 açık, otomatik denetim/BTK/scraper botlarına mühürlüdür.
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
  'discordbot',
  'slackbot',
  'linkedinbot',
  'pinterest',
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

  // 1. Meşru arama motorları ve sosyal medya botları asla engellenmez
  const isSearchEngineOrSocial = WHITELISTED_CRAWLERS.some(crawler => ua.includes(crawler));
  if (isSearchEngineOrSocial) {
    return; // Pass through
  }

  // 2. Doğrudan resmi kurum veya denetim referansı engeli
  const isSuspiciousReferrer = SUSPICIOUS_REFERRERS.some(ref => referer.includes(ref));
  if (isSuspiciousReferrer) {
    return new Response('403 Forbidden: Access Denied', {
      status: 403,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }

  // 3. Otomasyon, Headless ve Açık Tarayıcı Botları (BTK inceleme araçları)
  const isObviousAutomation = BLOCKED_BOT_SIGNATURES.some(sig => ua.includes(sig));

  // 4. Zaafiyet tarama URL'leri
  const isKnownExploitProbe =
    pathname.includes('/.git') ||
    pathname.includes('/.env') ||
    pathname.includes('/wp-admin') ||
    pathname.includes('/phpmyadmin') ||
    pathname.includes('eval(') ||
    pathname.includes('select%20') ||
    pathname.includes('<script') ||
    pathname.includes('cmd=');

  if (isObviousAutomation || isKnownExploitProbe) {
    return new Response('Access Denied: Automated scraping or probing prohibited.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }
}
