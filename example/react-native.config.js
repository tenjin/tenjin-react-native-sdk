const path = require('path');
const pkg = require('../package.json');

module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
    android: {
      packageName: 'tenjin.example',
      sourceDir: '../android',
    },
  },
  dependencies: {
    [pkg.name]: {
      root: path.join(__dirname, '..'),
    },
  },
};
