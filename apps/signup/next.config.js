/* eslint-disable @typescript-eslint/no-var-requires */
const getNextConfig = require('../../next.config');
const packageJson = require('./package.json');

module.exports = getNextConfig(
  {
    compiler: {
      emotion: true,
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: 'https://www.gated.com/',
          permanent: true,
        },
        {
          source: '/allow-list/:slug*',
          destination: '/app/allow-list/:slug*',
          permanent: true,
        },
        {
          source: '/accounts/:slug*',
          destination: '/app/accounts/:slug*',
          permanent: true,
        },
        {
          source: '/settings/:slug*',
          destination: '/app/settings/:slug*',
          permanent: true,
        },
        {
          source: '/dashboard/:slug*',
          destination: '/app/:slug*',
          permanent: true,
        },
      ];
    },
  },
  packageJson,
);
