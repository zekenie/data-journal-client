'use strict';
angular.module('VisApp')
  .factory('Timeseries', function($http) {
    const baseUrl = 'https://api.codetutor.me';
    const pullResp = res => res.data;
    return {
      list: () => $http.get(baseUrl+'/timeseries').then(pullResp),

      series: (model, start, end) => $http.get(`${baseUrl}/timeseries/${model}`, {
        params: { start, end }
      })
      .then(pullResp)
      .then(data => {
        return data.map( reading => {
          reading.x = reading.__date;
          reading.y = reading.value;
          return reading;
        });
      })
    };
  });