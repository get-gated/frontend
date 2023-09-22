/* eslint-disable @typescript-eslint/no-var-requires */
const getNextConfig = require('../../next.config');
const packageJson = require('./package.json');

module.exports = getNextConfig(
  {
    basePath: '/admin-new',
    assetPrefix: '/admin-new/',
  },
  packageJson,
);
