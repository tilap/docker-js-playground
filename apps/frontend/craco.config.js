/* eslint-disable filenames/match-exported */
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const { ESLINT_MODES } = require('@craco/craco');

module.exports = function craco({ env }) {
  return {
    webpack: {
      plugins: [
        env === 'development' && new WebpackBar({ profile: true }),
        ...(env === 'development' ? [new BundleAnalyzerPlugin({ openAnalyzer: false })] : []),
      ].filter(v => !!v),

      configure: config => {
        // Automatically resolve relative to src root path
        config.resolve.modules = [...config.resolve.modules, path.resolve('src')];
        return config;
      },
    },
    eslint: {
      mode: ESLINT_MODES.file,
    },
  };
};
