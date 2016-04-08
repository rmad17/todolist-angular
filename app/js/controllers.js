/*
 * controller.js
 * Copyright (C) 2016 rmad <rmad@Vostro-3446>
 *
 * Distributed under terms of the MIT license.
 */
(function(){
  'use strict';

    var app = angular.module('myApp');

    app.
    //define controller and inject webServices service as dependency.
    // Top Stories
    controller('gtCtrl',['gtFactory','$scope',function(tsFactory, $scope){
        tsFactory.getTopStories().then(function(response){
            $scope.tsitems = response; //Assign data received to $scope.data
        });
    }]).
    // New Stories
    controller('ctCtrl',['ctFactory','$scope',function(nsFactory, $scope){
        nsFactory.getNewStories().then(function(response){
            $scope.nsitems = response; //Assign data received to $scope.data
        });
    }]);
})();
