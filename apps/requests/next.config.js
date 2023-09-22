/* eslint-disable @typescript-eslint/no-var-requires */
const getNextConfig = require('../../next.config');
const packageJson = require('./package.json');

module.exports = getNextConfig(
  {
    basePath: '/requests',
    assetPrefix: '/requests/',
    async redirects() {
      return [];
    },
  },
  packageJson,
);
