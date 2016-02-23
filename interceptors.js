'use strict';

angular.module('VisApp')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function() {

    return {
      request: function(config) {
        if(!config.url.match(/^(https?:\/\/)api\.codetutor\.me/).length) { return config; }
        config.headers = config.headers || {};
        config.headers.Authentication = process.env.HTTP_PASSWORD;
        return config;
      }
    };
  });