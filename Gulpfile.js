var gulp = require('gulp');
var zip = require('gulp-zip');
var forceDeploy = require('gulp-jsforce-deploy');

gulp.task('deploy', function() {
  gulp.src('./package/**/*', { base: "." })
    .pipe(zip('pkg.zip'))
    .pipe(forceDeploy({
      username: process.env.SF_USERNAME,
      password: process.env.SF_PASSWORD,
      loginUrl: process.env.SF_URL,
      pollTimeout: 120*1000,
      pollInterval: 10*1000,
      version: '33.0',
    }));
});

gulp.task('default', ['deploy']);
