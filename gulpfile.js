const gulp = require('gulp');
const plato = require('es6-plato');
const lintRules = require('./.eslintrc');

const appSrc = './src/**';

const outputDir = './artifacts';

const complexityRules = {};

const platoArgs = {
    title: 'Indaba-Client',
    eslint: lintRules,
    complexity: complexityRules,
};

function analysis() {
    plato.inspect(appSrc, outputDir, platoArgs);
}

gulp.task('analysis', analysis);
