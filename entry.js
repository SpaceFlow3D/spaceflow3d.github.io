// Serve the current published project page at the organization root address.
// A bundled snapshot remains available if the project page cannot be fetched.
(async () => {
  const entry = document.currentScript;
  const source = new URL(entry.dataset.source, location.origin);
  source.search = location.search;
  const fallback = entry.dataset.fallback;
  let html, base;
  try {
    const response = await fetch(source, { cache: 'no-cache', signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error('Project page unavailable');
    html = await response.text();
    if (!html.includes('SpaceFlow') || !html.includes('<html')) throw new Error('Unexpected project page');
    base = new URL('/spaceflow/', location.origin).href;
  } catch {
    html = new TextDecoder().decode(Uint8Array.from(atob(fallback), char => char.charCodeAt(0)));
    base = new URL('/', location.origin).href;
  }
  const page = new DOMParser().parseFromString(html, 'text/html');
  page.querySelectorAll('base').forEach(node => node.remove());
  const baseElement = page.createElement('base');
  baseElement.href = base;
  page.head.prepend(baseElement);
  // Section links should keep visitors at the root page, including query strings.
  page.querySelectorAll('a[href^="#"]').forEach(link => {
    link.setAttribute('href', new URL(link.getAttribute('href'), location.href).href);
  });
  const canonical = page.querySelector('link[rel="canonical"]') || page.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = location.origin + location.pathname;
  if (!canonical.parentNode) page.head.append(canonical);
  page.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical.href);
  document.open();
  document.write('<!doctype html>\n' + page.documentElement.outerHTML);
  document.close();
})();
