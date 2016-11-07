import ngModule from './index.js';

require('angular-mocks/angular-mocks');
require('./directives/kcd-hello.test.js').default(ngModule);