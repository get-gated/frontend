/* eslint-disable @typescript-eslint/no-var-requires */
const packageJson = require('./package.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('../../next.config')(
  {
    basePath: '/u',
    assetPrefix: '/u/',
    async redirects() {
      return [];
    },
  },
  packageJson,
);
