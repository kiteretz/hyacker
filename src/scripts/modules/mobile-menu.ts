const root = document.getElementById('js-mobile-menu-root');
const trigger = document.getElementById('js-mobile-menu-trigger');
const panel = document.getElementById('js-mobile-menu');
const backdrop = document.getElementById('js-mobile-menu-backdrop');

if (root && trigger && panel && backdrop) {
  const lgQuery = window.matchMedia('(min-width: 60rem)');

  const setOpen = (open: boolean) => {
    root.dataset.open = open ? 'true' : 'false';
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    trigger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  trigger.addEventListener('click', () => {
    const isOpen = root.dataset.open === 'true';
    setOpen(!isOpen);
  });

  backdrop.addEventListener('click', () => {
    setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root.dataset.open === 'true') {
      setOpen(false);
    }
  });

  lgQuery.addEventListener('change', (event) => {
    if (event.matches && root.dataset.open === 'true') {
      setOpen(false);
    }
  });
}
