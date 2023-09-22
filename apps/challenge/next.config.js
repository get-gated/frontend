/* eslint-disable @typescript-eslint/no-var-requires */
const packageJson = require('./package.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require('../../next.config')(
  {
    basePath: '/challenge',
    assetPrefix: '/challenge/',
    async redirects() {
      return [
        // {
        //   source: '/:token/:action*',
        //   destination: '/:token?action=:action*',
        //   permanent: false,
        // },
      ];
    },
  },
  packageJson,
);
