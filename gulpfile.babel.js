import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import runSequence from 'run-sequence';

var config = {
  paths: {
    js: {
      src: 'src/**/*.es6',
      dist: 'dist/'
    },
    test: {
      src: 'test/**/*.es6',
      dist: 'test-dist/'
    }
  }
};

gulp.task('clean', () =>
  del(config.paths.js.dist)
);

gulp.task('babel', ['babel-src', 'babel-test']);

gulp.task('babel-src', () =>
  gulp.src(config.paths.js.src)
    .pipe(babel())
    .pipe(gulp.dest(config.paths.js.dist))
);

gulp.task('babel-test', () =>
  gulp.src(config.paths.test.src)
    .pipe(babel())
    .pipe(gulp.dest(config.paths.test.dist))
);

gulp.task('watch', () => {
  gulp.watch(config.paths.js.src, ['babel-src']);
  gulp.watch(config.paths.test.src, ['babel-test']);
});

// Default Task
gulp.task('default', () =>
  runSequence('clean', ['babel'])
);