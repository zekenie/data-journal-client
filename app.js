'use strict';

const app = module.exports = angular.module('VisApp', ['ui.router']);

app
  .value('dateformat', require('dateformat'))
  .value('vis', require('vis'))
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('test', {
        url: '/test',
        template: 'yay'
      });


    $urlRouterProvider.when('', '/timeseries');
  });

require('./interceptors');
require('./timeseries');
require('./states');
require('./directives/timeseries');