'use strict';
const vis = require('vis');

const template = `
  <div class="slds-page-header">
    <p class="slds-text-heading--large">Timeseries</p>

    <div class="slds-grid">
      <div class="slds-col">
        <div class="slds-form-element">
          <label class="slds-form-element__label" for="start">Start</label>
          <div class="slds-form-element__control">
            <input class="slds-input" name="start" ng-model="start" type="date">
          </div>
        </div>

        <div class="slds-form-element">
          <label class="slds-form-element__label" for="end">End</label>
          <div class="slds-form-element__control">
            <input class="slds-input" name="end" ng-model="end" type="date">
          </div>
        </div>
      </div>

      <div class="slds-col">
        <div class="slds-form-element slds-p-around--small">
          <span class="slds-form-element__label" aria-label="select-1">Datasets</span>
          <div class="slds-picklist slds-picklist--multi">
            <ul class="slds-picklist__options slds-picklist__options--multi shown">
              <li ng-click="toggle(model)" ng-repeat="model in models" class="slds-picklist__item" aria-selected="{{selected(model)}}">
                <span class="slds-truncate">
                  <span>{{model}}</span>
                </span>
              </li>
            </ul>
          </div>
      </div>

    </div>
  </div>

  <time-series 
    ng-repeat="m in visualizations"
    start="start"
    end="end"
    model="m"></time-series>
`;

const ctrl = function($scope, models, $stateParams) {
  $scope.models = models;
  $scope.visualizations = [];
  $scope.start = new Date(Date.now() - 1000*60*60*24);
  $scope.end = new Date();

  $scope.selected = m => $scope.visualizations.indexOf(m) !== -1

  $scope.toggle = m => {
    if(!$scope.selected(m)) { $scope.add(m); }
    else { $scope.remove(m); }
  };

  $scope.add = m => {
    $scope.visualizations.push(m);
  };

  $scope.remove = m => {
    const idx = $scope.visualizations.indexOf(m);
    if(idx === -1) { return; }
    console.log(idx)
    $scope.visualizations.splice(idx, 1);
    console.log($scope.visualizations)
  };

}

angular.module('VisApp')
  .config(function($stateProvider) {
    $stateProvider.state('timeseries', {
      url: '/timeseries?start&stop',
      controller: ctrl,
      template: template,
      resolve: {
        models: function(Timeseries) { return Timeseries.list(); }
      }
    })
  });