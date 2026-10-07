/**
 * VIP PORTAL — EDGE BOT & EXPLOIT SHIELD
 * Birebir Best Eskort & Esc Türkiye projelerindeki çalışan koruma mantığıdır.
 * Google Search Console, Googlebot, YandexBot ve tüm arama motorları %100 açık.
 * Yalnızca açık saldırgan otomasyon/kazıma araçları ve exploit aramaları engellenir.
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
  'headlesschrome',
  'phantomjs',
  'puppeteer',
  'playwright',
  'selenium',
  'webdriver',
  'python-requests',
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

  // 1. Meşru arama motorları ve doğrulama dosyaları HER ZAMAN SERBEST
  const isSearchEngineOrSocial = WHITELISTED_CRAWLERS.some(crawler => ua.includes(crawler));
  if (isSearchEngineOrSocial) {
    return; // Pass through untouched
  }

  // 2. Doğrulama ve statik dosyalar her zaman serbest
  if (
    pathname.includes('google') ||
    pathname.includes('yandex') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.includes('.')
  ) {
    return;
  }

  // 3. Doğrudan resmi kurum denetim referansı engeli
  const isSuspiciousReferrer = SUSPICIOUS_REFERRERS.some(ref => referer.includes(ref));
  if (isSuspiciousReferrer) {
    return new Response('403 Forbidden: Access Denied', {
      status: 403,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }

  // 4. Açık otomasyon ve kazıma botları engeli
  const isObviousAutomation = BLOCKED_BOT_SIGNATURES.some(sig => ua.includes(sig));

  // 5. Zaafiyet tarama URL'leri
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
