/**
 * Sticky Sidebar
 *
 * Implements a bidirectional sticky sidebar
 * Adapts behavior based on whether the sidebar content is taller or shorter
 * than the viewport.
 *
 * Uses a five-state machine:
 *   - `static`           → default / below breakpoint
 *   - `fixed-top`        → pinned to viewport top
 *   - `fixed-bottom`     → pinned to viewport bottom
 *   - `translate`        → parked between fixed positions via translateY
 *   - `container-bottom` → reached the container's bottom edge
 *
 * Short sidebar (fits in viewport): fixed-top until container ends.
 * Tall sidebar: bidirectional — sticks to bottom when scrolling down,
 * to top when scrolling up, with translate states in between.
 *
 * Required attributes:
 *   - `data-js-sticky-sidebar`       → sidebar wrapper (provides bounds)
 *   - `data-js-sticky-sidebar-inner` → inner element that gets positioned
 *
 * Disabled below the `xl` breakpoint (1200px).
 * Reinitializes on Swup page transitions.
 */
let controller: AbortController | null = null;
let resizeObserver: ResizeObserver | null = null;

const LG_BREAKPOINT = 1200;

type State = 'static' | 'fixed-top' | 'fixed-bottom' | 'translate' | 'container-bottom';

function init(): void {
  controller?.abort();
  resizeObserver?.disconnect();

  const sidebar = document.querySelector<HTMLElement>('[data-js-sticky-sidebar]');
  const inner = document.querySelector<HTMLElement>('[data-js-sticky-sidebar-inner]');
  if (!sidebar || !inner) return;

  inner.style.cssText = '';
  sidebar.removeAttribute('data-sidebar-short');
  sidebar.removeAttribute('data-sidebar-tall');

  controller = new AbortController();
  const { signal } = controller;

  const headerEl = document.getElementById('js-header');

  let prevScrollY = window.scrollY;
  let state: State = 'static';
  let currentTranslateY = 0;
  let contentHeight = 0;
  let topOffset = 0;

  const HEADER_GAP = 0;

  function measure(): void {
    topOffset = headerEl ? headerEl.offsetHeight + HEADER_GAP : 0;
    contentHeight = inner!.offsetHeight;
  }

  function update(): void {
    if (window.innerWidth < LG_BREAKPOINT) {
      inner!.style.cssText = '';
      sidebar!.removeAttribute('data-sidebar-short');
      sidebar!.removeAttribute('data-sidebar-tall');
      state = 'static';
      prevScrollY = window.scrollY;
      return;
    }

    const scrollY = window.scrollY;
    const delta = scrollY - prevScrollY;
    const vh = window.innerHeight;
    const availableHeight = vh - topOffset;
    const sidebarRect = sidebar!.getBoundingClientRect();
    const containerTop = scrollY + sidebarRect.top;
    const containerHeight = sidebar!.offsetHeight;
    const maxTranslateY = Math.max(0, containerHeight - contentHeight);
    const w = sidebarRect.width;
    const left = sidebarRect.left;

    const isShort = contentHeight <= availableHeight;
    const isTallSidebar = containerHeight >= vh;
    sidebar!.toggleAttribute('data-sidebar-short', !isTallSidebar);
    sidebar!.toggleAttribute('data-sidebar-tall', isTallSidebar);
    const effectiveHeight = Math.min(availableHeight, containerHeight);

    if (isShort) {
      // --- 短いサイドバー ---
      const containerBottom = containerTop + containerHeight;
      const fixedBottomEdge = scrollY + topOffset + contentHeight;

      if (containerBottom <= fixedBottomEdge) {
        // コンテナ下端に到達
        state = 'container-bottom';
        // コンテナがヘッダーの裏から始まる場合、translateY にオフセットを加算
        const headerGap = Math.max(0, topOffset - containerTop - scrollY);
        currentTranslateY = Math.max(headerGap, maxTranslateY);
        const clampedHeight = Math.min(effectiveHeight, containerHeight - currentTranslateY);
        inner!.style.cssText = `transform:translateY(${currentTranslateY}px);width:${w}px;height:${clampedHeight}px;`;
      } else if (scrollY + topOffset >= containerTop) {
        // スティッキー範囲内
        state = 'fixed-top';
        inner!.style.cssText = `position:fixed;top:${topOffset}px;left:${left}px;width:${w}px;height:${effectiveHeight}px;`;
      } else {
        // コンテナより上
        state = 'static';
        inner!.style.cssText = '';
      }
    } else {
      // --- 長いサイドバー ---
      const containerBottom = containerTop + containerHeight;
      const viewportBottom = scrollY + vh;

      // コンテナ下端チェック（どの方向でも優先）
      if (viewportBottom >= containerBottom) {
        state = 'container-bottom';
        currentTranslateY = maxTranslateY;
        inner!.style.cssText = `transform:translateY(${maxTranslateY}px);width:${w}px;`;
        prevScrollY = scrollY;
        return;
      }

      // コンテナより上にいる場合
      if (scrollY + topOffset < containerTop) {
        state = 'static';
        currentTranslateY = 0;
        inner!.style.cssText = '';
        prevScrollY = scrollY;
        return;
      }

      if (delta > 0) {
        // 下スクロール
        switch (state) {
          case 'static':
          case 'fixed-top':
            // 固定を解除して現在位置で一時停止
            currentTranslateY = scrollY + topOffset - containerTop;
            currentTranslateY = Math.max(0, Math.min(currentTranslateY, maxTranslateY));
            state = 'translate';
            break;
          case 'translate': {
            // 下端がビューポート下端に到達したら固定
            const innerBottom = containerTop + currentTranslateY + contentHeight;
            if (innerBottom <= viewportBottom) {
              state = 'fixed-bottom';
            }
            break;
          }
          case 'container-bottom':
            // すでにコンテナ下端チェックで処理済み
            break;
        }
      } else if (delta < 0) {
        // 上スクロール
        switch (state) {
          case 'fixed-bottom':
            // 固定を解除して現在位置で一時停止
            currentTranslateY = viewportBottom - contentHeight - containerTop;
            currentTranslateY = Math.max(0, Math.min(currentTranslateY, maxTranslateY));
            state = 'translate';
            break;
          case 'translate': {
            // 上端がビューポート上端 + topOffset に到達したら固定
            const innerTop = containerTop + currentTranslateY;
            if (innerTop >= scrollY + topOffset) {
              state = 'fixed-top';
            }
            break;
          }
          case 'container-bottom':
            // コンテナ下端から離れた → translate に遷移
            currentTranslateY = viewportBottom - contentHeight - containerTop;
            currentTranslateY = Math.max(0, Math.min(currentTranslateY, maxTranslateY));
            state = 'translate';
            break;
        }
      } else {
        // delta === 0（初期ロード時）: 現在のスクロール位置から正しい状態を決定
        if (state === 'static') {
          const idealTranslateY = scrollY + topOffset - containerTop;
          if (idealTranslateY <= 0) {
            state = 'fixed-top';
          } else {
            const innerBottom = containerTop + idealTranslateY + contentHeight;
            if (innerBottom <= viewportBottom) {
              state = 'fixed-bottom';
            } else {
              currentTranslateY = Math.max(0, Math.min(idealTranslateY, maxTranslateY));
              state = 'translate';
            }
          }
        }
      }

      // スタイル適用
      switch (state) {
        case 'static':
          inner!.style.cssText = '';
          break;
        case 'fixed-top':
          inner!.style.cssText = `position:fixed;top:${topOffset}px;left:${left}px;width:${w}px;`;
          break;
        case 'fixed-bottom':
          inner!.style.cssText = `position:fixed;bottom:0;left:${left}px;width:${w}px;`;
          break;
        case 'translate':
          inner!.style.cssText = `transform:translateY(${currentTranslateY}px);width:${w}px;`;
          break;
        case 'container-bottom':
          inner!.style.cssText = `transform:translateY(${maxTranslateY}px);width:${w}px;`;
          break;
      }
    }

    prevScrollY = scrollY;
  }

  function reset(): void {
    measure();
    state = 'static';
    currentTranslateY = 0;
    update();
  }

  measure();

  resizeObserver = new ResizeObserver(reset);
  resizeObserver.observe(sidebar);

  window.addEventListener('scroll', update, { signal, passive: true });
  window.addEventListener('resize', reset, { signal });

  update();
}

init();
