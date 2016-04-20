import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import runSequence from 'run-sequence';
import gulpEslint from 'gulp-eslint';
import mocha from 'gulp-mocha';

var config = {
  paths: {
    js: {
      src: 'src/**/*.es6',
      dist: 'dist/'
    },
    test: {
      src: 'test/**/*.es6',
      dist: 'test-dist/'
    },
    tmpTest: {
      src: 'test-dist/person-test.js'
    }
  }
};

gulp.task('clean', () =>
  del(config.paths.js.dist)
);

gulp.task('babel', ['babel-src', 'babel-test']);

gulp.task('babel-src', ['lint-src'], () =>
  gulp.src(config.paths.js.src)
    .pipe(babel())
    .pipe(gulp.dest(config.paths.js.dist))
);

gulp.task('lint-src', () =>
  gulp.src(config.paths.js.src)
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
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

gulp.task('test', ['babel'], () =>
  gulp.src([config.paths.tmpTest.src])
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', err => console.log(err.stack))
);

// Default Task
gulp.task('default', () =>
  runSequence('clean', ['babel', 'test'])
);