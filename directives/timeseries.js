'use strict';

angular.module('VisApp')
  .directive('timeSeries', (Timeseries, vis) => {
    return {
      restrict: 'E',
      scope: {
        start: '=',
        end: '=',
        model: '='
      },
      link: (scope, element, attrs) => {
        let visInstance;
        const fetch = () => {
          if(visInstance) {
            visInstance.destroy();
            element.html('');
          }
          return Timeseries.series(scope.model, scope.start, scope.end)
            .then(data => {
              visInstance = new vis.Graph2d(element[0], data, {
                drawPoints: false,
                start: scope.start,
                zoomable: false,
                moveable: false,
                end: scope.end
              });
              return vis;
            });
        };

        scope.$watch('start', (old, newV) => fetch() )
        scope.$watch('end', (old, newV) => fetch() )

      }
    }
  })