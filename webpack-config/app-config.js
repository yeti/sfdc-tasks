const pkg = require('../package.json');

module.exports = () => ({
  VERSION: pkg.version,
  RELEASE: Math.round((new Date()).getTime())
});
