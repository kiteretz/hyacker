const header = document.getElementById('js-header');
if (header) {
  const setHeight = (h: number) => {
    const rounded = Math.round(h * 1000) / 1000;
    document.documentElement.style.setProperty('--header-height', `${rounded}px`);
  };
  setHeight(header.getBoundingClientRect().height);
  const observer = new ResizeObserver(([entry]) => {
    setHeight(entry.borderBoxSize[0].blockSize);
  });
  observer.observe(header);
}
