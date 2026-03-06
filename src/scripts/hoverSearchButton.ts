import { animate, hover } from 'motion';

// Hover effect for the KV search button
hover('.js-hover-kv-search-button', (element) => {
  animate(element, { scale: 1.15 }, { type: 'spring', duration: 0.3, stiffness: 400, damping: 15 });

  return () => {
    animate(element, { scale: 1 }, { type: 'spring', duration: 0.3, stiffness: 300, damping: 20 });
  };
});

// Hover effect for the header search button
hover('.js-hover-header-search-button', (element) => {
  const bgElement = element.querySelector('span');
  const iconElement = element.querySelector('svg');

  animate(bgElement, { scale: 1 });
  if (iconElement) animate(iconElement, { color: '#fff' });

  return () => {
    animate(bgElement, { scale: 0 });
    if (iconElement) animate(iconElement, { color: 'currentColor' });
  };
});
