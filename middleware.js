/**
 * VIP PORTAL — EDGE ANTI-BTK & ANTI-SCRAPER MIDDLEWARE
 * Runs at edge (Vercel / Cloudflare) to protect the domain from automated BTK crawlers,
 * scraping bots, and headless scanners while keeping Google & Yandex 100% white-listed.
 */

const WHITELISTED_CRAWLERS = [
  'googlebot',
  'google-inspectiontool',
  'googleother',
  'adsbot-google',
  'yandexbot',
  'yandexmobilebot',
  'yandexaccessibilitybot',
  'bingbot',
  'duckduckbot',
  'applebot',
  'whatsapp',
  'telegrambot',
  'facebookexternalhit',
  'twitterbot',
];

const BLOCKED_BOT_SIGNATURES = [
  'headlesschrome',
  'phantomjs',
  'puppeteer',
  'playwright',
  'selenium',
  'webdriver',
  'python-requests',
  'python-urllib',
  'aiohttp',
  'scrapy',
  'curl/',
  'wget/',
  'go-http-client',
  'libwww-perl',
  'okhttp',
  'bytespider',
  'semrush',
  'ahrefs',
  'mj12bot',
  'dotbot',
  'megaindex',
  'blexbot',
  'dataforseo',
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
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  const referer = (request.headers.get('referer') || '').toLowerCase();

  // 1. Never block legitimate search engines or social previews
  const isWhitelisted = WHITELISTED_CRAWLERS.some(crawler => ua.includes(crawler));
  if (isWhitelisted) {
    return; // Pass through untouched
  }

  // 2. Block direct inspection referrals
  const isSuspiciousReferrer = SUSPICIOUS_REFERRERS.some(ref => referer.includes(ref));
  if (isSuspiciousReferrer) {
    return new Response('403 Forbidden: Access Denied', {
      status: 403,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }

  // 3. Block headless automation and scraper tools
  const isBlockedBot = BLOCKED_BOT_SIGNATURES.some(sig => ua.includes(sig));
  if (isBlockedBot) {
    return new Response('403 Forbidden: Automated crawling is prohibited.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }
}
