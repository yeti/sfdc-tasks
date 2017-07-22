const pkg = require('../package.json');

module.exports = (conf) => ({
	SF_APP_CLIENT_ID: conf.SF_APP_CLIENT_ID || '3MVG9szVa2RxsqBbGcsAwPW_45rQ2AWtTC54mIVr.i2svWHlh2adPMZrk40VoeMfjYq73uMXzbEo8xlzQeG0i',
	SF_APP_REDIRECT_URL: conf.SF_APP_REDIRECT_URL || 'https://localhost:8080',
	VERSION: pkg.version,
	RELEASE: Math.round((new Date()).getTime())
});
