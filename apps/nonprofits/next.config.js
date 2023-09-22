/* eslint-disable @typescript-eslint/no-var-requires */
const getNextConfig = require('../../next.config');
const packageJson = require('./package.json');

module.exports = getNextConfig(
  {
    assetPrefix: '/nonprofits/',
    basePath: '/nonprofits',
    devIndicators: {
      buildActivity: false,
    },
    compiler: {
      // removeConsole: {
      //   exclude: ["error"],
      // },
      emotion: true,
    },
    // webpack: (config) => {
    //   config.module.rules.push({
    //     test: /\.svg$/i,
    //     issuer: /\.[jt]sx?$/,
    //     use: ['@svgr/webpack'],
    //   });

    //   return config;
    // },
  },
  packageJson,
);
