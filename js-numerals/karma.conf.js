module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['ChromeHeadless'],
    singleRun: false,
    files: [
      { pattern: 'test/*.spec.ts', watched: false }
    ],
    preprocessors: {
      'test/*.spec.ts': [ 'webpack' ]
    },
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      stats: 'errors-only'
    }
  })
}
