/* eslint-disable @typescript-eslint/no-var-requires */
const getNextConfig = require('../../next.config');
const packageJson = require('./package.json');

module.exports = getNextConfig(
  {
    basePath: '/app',
    assetPrefix: '/app/',
    async redirects() {
      return [
        {
          source: '/accounts',
          destination: '/',
          permanent: true,
        },
        {
          source: '/accounts/:slug',
          destination: '/',
          permanent: true,
        },
      ];
    },
  },
  packageJson,
);
