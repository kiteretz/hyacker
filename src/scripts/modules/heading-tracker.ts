function headingTracker() {
  const contentBody = document.querySelector('[data-pagefind-body]');
  const currentDisplay = document.querySelector('[data-section-current]');
  if (!contentBody) return;

  const allHeadings = Array.from(contentBody.querySelectorAll<HTMLElement>('h2, h3'));
  if (!allHeadings.length) return;

  const h3IndexMap = new Map<Element, string>();
  let h3Count = 0;
  allHeadings.forEach((el) => {
    if (el.tagName === 'H3') {
      h3Count++;
      h3IndexMap.set(el, String(h3Count).padStart(2, '0'));
    }
  });

  const toc = document.querySelector('[data-js-toc]');
  const linkByHeading = new Map<Element, HTMLAnchorElement>();
  if (toc) {
    const linkByHref = new Map<string, HTMLAnchorElement>();
    toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      const href = a.getAttribute('href');
      if (href) linkByHref.set(href.slice(1), a);
    });
    allHeadings.forEach((heading) => {
      const link = linkByHref.get(heading.id);
      if (link) linkByHeading.set(heading, link);
    });
  }

  const currentLinks = new Set<HTMLAnchorElement>();
  const applyHighlight = (next: Set<HTMLAnchorElement>) => {
    currentLinks.forEach((link) => {
      if (!next.has(link)) link.removeAttribute('data-is-current');
    });
    next.forEach((link) => {
      if (!currentLinks.has(link)) link.setAttribute('data-is-current', '');
    });
    currentLinks.clear();
    next.forEach((link) => currentLinks.add(link));
  };

  const recompute = () => {
    const rootStyle = getComputedStyle(document.documentElement);
    const headerH = parseFloat(rootStyle.getPropertyValue('--header-height')) || 0;
    const rootFontSize = parseFloat(rootStyle.fontSize) || 16;
    const threshold = headerH + rootFontSize + 1;
    let currentH2: Element | null = null;
    let currentH3: Element | null = null;
    for (const heading of allHeadings) {
      if (heading.getBoundingClientRect().top > threshold) break;
      if (heading.tagName === 'H2') {
        currentH2 = heading;
        currentH3 = null;
      } else if (heading.tagName === 'H3') {
        currentH3 = heading;
      }
    }

    if (currentH3 && currentDisplay) {
      const idx = h3IndexMap.get(currentH3);
      if (idx) currentDisplay.textContent = idx;
    }

    const next = new Set<HTMLAnchorElement>();
    if (currentH2) {
      const link = linkByHeading.get(currentH2);
      if (link) next.add(link);
    }
    if (currentH3) {
      const link = linkByHeading.get(currentH3);
      if (link) next.add(link);
    }
    applyHighlight(next);
  };

  recompute();

  let scheduled = false;
  const scheduleRecompute = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      recompute();
    });
  };
  window.addEventListener('scroll', scheduleRecompute, { passive: true });
  window.addEventListener('resize', scheduleRecompute, { passive: true });
}

headingTracker();
