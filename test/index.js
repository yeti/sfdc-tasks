const src = require.context("../src", true, /.(js|jsx)$/);

// load all of our code (excpet for your app index);
src.keys().filter(function(i) { return i !== './index.jsx' }).forEach(src);
