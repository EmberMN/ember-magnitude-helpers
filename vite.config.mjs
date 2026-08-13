import { defineConfig } from 'vite';
import { extensions, ember, classicEmberSupport } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

// For scenario testing
const isCompat = Boolean(process.env.ENABLE_COMPAT_BUILD);

// When building the demo app for deployment (e.g. GitHub Pages) we want the
// default `index.html` entry instead of the test harness, and a base path that
// matches where the app is served from.
const isDemo = Boolean(process.env.BUILD_DEMO);

export default defineConfig({
  base: isDemo ? (process.env.BASE_PATH ?? '/') : '/',
  plugins: [
    ...(isCompat ? [classicEmberSupport()] : []),
    ember(),
    babel({
      babelHelpers: 'inline',
      extensions,
    }),
  ],
  build: {
    rollupOptions: {
      input: isDemo
        ? { app: 'index.html' }
        : {
            tests: 'tests/index.html',
          },
    },
  },
});
