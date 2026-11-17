// Which sites the window may navigate to. The app is a front end for one
// service; anything else is refused rather than opened.
const SERVICE_HOSTS = ['disneyplus.com'];

// Sign-in is on the service's own domain: a signed-out request for /login is
// redirected to /identity/login on the same host (seen with curl, 2026-11-17).
// Nothing is added here without seeing the app refuse a page a person needs;
// a refused navigation is logged and shown, so a missing domain is noticed.
const ACCOUNT_DOMAINS = new Set<string>([]);

function matchesDomain(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`);
}

export function isAllowedUrl(raw: string, opts: { dev: boolean } = { dev: false }): boolean {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return false;
  }
  if (opts.dev) {
    if (u.protocol === 'file:') return true;
    if (u.protocol === 'http:' && (u.hostname === 'localhost' || u.hostname === '127.0.0.1')) return true;
  }
  if (u.protocol !== 'https:') return false;
  if (u.username || u.password) return false;
  const host = u.hostname.toLowerCase();
  if (SERVICE_HOSTS.some((d) => matchesDomain(host, d))) return true;
  for (const d of ACCOUNT_DOMAINS) {
    if (matchesDomain(host, d)) return true;
  }
  return false;
}

/**
 * The browser identity we send: the embedded Chromium's own user agent with
 * the Electron and app tokens removed. It states the real engine, the real
 * version and the real OS. It never claims to be a TV, console or other OS.
 */
export function browserUserAgent(defaultUa: string): string {
  return defaultUa
    .replace(/\s?Electron\/\S+/g, '')
    .replace(/\s?steamboat\/\S+/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
