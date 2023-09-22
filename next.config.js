/* eslint-disable @typescript-eslint/no-var-requires */
const transpileModules = require('next-transpile-modules');

function getPackages(packageJson = {}) {
  return Object.keys(packageJson.dependencies).filter((packageName) =>
    packageName.startsWith('@gated/'),
  );
}

const defaultConfig = {
  reactStrictMode: true,
  swcMinify: true,
};
/**  @param  {import('next').NextConfig} config */
function nextjsConfig(config = {}, packageJson = {}) {
  const withTM = transpileModules(getPackages(packageJson));
  return withTM(Object.assign({}, defaultConfig, config));
}
module.exports = nextjsConfig;
