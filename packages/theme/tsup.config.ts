import { defineConfig } from 'tsup';

export default defineConfig({
  loader: {
    '.jpg': 'base64',
    '.woff': 'file',
    '.woff2': 'file',
  },
});
