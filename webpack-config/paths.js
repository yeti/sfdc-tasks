const path = require('path');

const dir = path.dirname(__dirname);

module.exports = {
  src: path.join(dir, 'src'),
  build: path.join(dir, 'build'),
  package: path.join(dir, 'package'),
  node_modules: path.join(dir, 'node_modules'),
  test: path.join(dir, 'test'),
  package: path.join(dir, 'package')
};
