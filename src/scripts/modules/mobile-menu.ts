import { minWidthQuery } from '@utils/breakpoints';

const root = document.getElementById('js-mobile-menu-root');
const trigger = document.getElementById('js-mobile-menu-trigger');
const panel = document.getElementById('js-mobile-menu');
const backdrop = document.getElementById('js-mobile-menu-backdrop');

if (root && trigger && panel && backdrop) {
  const lgQuery = window.matchMedia(minWidthQuery('lg'));

  const setOpen = (open: boolean) => {
    root.dataset.open = open ? 'true' : 'false';
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    trigger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
    // html に overflow-x-clip が付いているため body の overflow: hidden は
    // ビューポートへ伝播せず、body 自身がスクロールコンテナ化して
    // ヘッダーの sticky 基準が壊れる。ロックは html 側に掛ける。
    document.documentElement.style.overflow = open ? 'hidden' : '';
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
