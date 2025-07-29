'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';
import { useSelector } from 'src/redux';

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import CssBaseline from '@mui/material/CssBaseline';

// Emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// Stylis
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// Custom theme
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shape from './shape';
import shadows, { customShadows } from './shadows';
import componentsOverride from './overrides';

ThemeRegistry.propTypes = {
  children: PropTypes.node.isRequired,
};

const Localization = (lang) => {
  switch (lang) {
    case 'ar':
      return 'arEG';
    case 'fr':
      return 'frFR';
    case 'en':
      return 'enUS';
    default:
      return 'enUS';
  }
};

export default function ThemeRegistry({ children }) {
  const { themeMode } = useSelector((state) => state.settings);

  const pathName = usePathname();
  const segments = pathName?.split('/');
  const lang = segments?.[1] || 'en';
  const locale = Localization(lang);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const styleCache = React.useMemo(
    () =>
      createCache({
        key: dir === 'rtl' ? 'muirtl' : 'css',
        stylisPlugins: dir === 'rtl' ? [prefixer, rtlPlugin] : [],
      }),
    [dir]
  );

  const theme = React.useMemo(() => {
    const baseTheme = createTheme(
      {
        palette: themeMode === 'dark' ? { ...palette.dark, mode: 'dark' } : { ...palette.light, mode: 'light' },
        direction: dir,
        typography,
        shape,
        shadows: themeMode === 'dark' ? shadows.dark : shadows.light,
        breakpoints,
        customShadows: themeMode === 'dark' ? customShadows.light : customShadows.dark,
        components: {
          MuiUseMediaQuery: {
            defaultProps: {
              ssrMatchMedia: (query) => ({
                matches: typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
              }),
            },
          },
        },
      },
      locales[locale]
    );

    baseTheme.components = {
      ...baseTheme.components,
      ...componentsOverride(baseTheme),
    };

    return baseTheme;
  }, [themeMode, dir, locale]);

  return (
    <CacheProvider value={styleCache}>
      <ThemeProvider theme={theme}>
        <main dir={dir}>
          <CssBaseline />
          {children}
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
}