import { DEFAULT_THEME_PREFERENCE, isThemePreference, THEME_STORAGE_KEY } from '@libs/theme';

import type { ThemePreference } from '@libs/theme';

const root = document.documentElement;
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-js-theme-button]');

const readStoredPreference = (): ThemePreference => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : DEFAULT_THEME_PREFERENCE;
  } catch {
    return DEFAULT_THEME_PREFERENCE;
  }
};

const storePreference = (preference: ThemePreference) => {
  try {
    // 既定値は保存しない（未設定 = システムに従う）
    if (preference === DEFAULT_THEME_PREFERENCE) {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  } catch {
    // 保存できなくても、このページ内の切り替えは有効にする
  }
};

// 初回描画前の適用は @components/ThemeInit.astro のインラインスクリプトが行う。ロジックを揃えること。
const applyPreference = (preference: ThemePreference) => {
  const isDark = preference === 'dark' || (preference === 'system' && darkQuery.matches);
  root.dataset.theme = isDark ? 'dark' : 'light';
  root.dataset.themePreference = preference;
  // current の見た目は <html data-theme-preference> を見る CSS が担う。ここは支援技術向けの状態のみ
  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', button.dataset.themeValue === preference ? 'true' : 'false');
  });
};

const currentPreference = (): ThemePreference => {
  const preference = root.dataset.themePreference;
  return isThemePreference(preference) ? preference : DEFAULT_THEME_PREFERENCE;
};

applyPreference(currentPreference());

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const preference = button.dataset.themeValue;
    if (!isThemePreference(preference)) return;
    storePreference(preference);
    applyPreference(preference);
  });
});

// 「システム」選択中は OS 側の切り替えに追従する
darkQuery.addEventListener('change', () => {
  if (currentPreference() === 'system') applyPreference('system');
});

// 別タブでの変更を反映する
window.addEventListener('storage', (event) => {
  if (event.key === THEME_STORAGE_KEY || event.key === null) applyPreference(readStoredPreference());
});
