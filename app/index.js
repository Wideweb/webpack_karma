import directives from './directives';
import angular from 'angular';

const ngModule = angular.module('app', []);

directives(ngModule);

export default ngModule;