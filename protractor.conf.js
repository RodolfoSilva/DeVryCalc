// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: ['--window-size=422,857']
    },
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/?ionicplatform=android',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: () => { }
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: () => {
    require('ts-node').register({
      project: 'e2e'
    });

    require('connect')().use(require('serve-static')('www')).listen(4200);
  },
  plugins: [{
    package: 'protractor-screenshoter-plugin',
    screenshotPath: './REPORTS/e2e',
    screenshotOnExpect: 'failure+success',
    screenshotOnSpec: 'none',
    withLogs: 'true',
    writeReportFreq: 'asap',
    imageToAscii: 'failure',
    clearFoldersBeforeTest: true
  }],
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    // returning the promise makes protractor wait for the reporter config before executing tests
    return browser.getProcessedConfig();
  }
};
