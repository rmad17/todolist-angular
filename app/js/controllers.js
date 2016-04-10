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
    controller('gtCtrl',['gtFactory','$scope', 'sharedProperties', function(gtFactory, $scope, sharedProperties){
        gtFactory.getTasks().then(function(response){
            $scope.tasks = response.tasks;
            $scope.tags = response.tags;
            sharedProperties.setTags(response.tags)
            console.log(sharedProperties.getTags.length)
        });
    }]).
    //FIXME
    service('sharedProperties', function () {
        var tags = [];

        return {
            getTags: function () {
                return tags;
            },
            setTags: function(value) {
                tags = value;
            }
        };
    }).
    // Tags
    controller('tagCtrl', ['$scope', 'sharedProperties', function($scope, sharedProperties, $http) {
                $scope.tags = sharedProperties.getTags;
                $scope.loadTags = function(query) {
                     return $http.get('/tags?query=' + query);
                };
    }]).
    // New Stories
    controller('ctCtrl',['ctFactory','$scope',function(nsFactory, $scope){
        nsFactory.getNewStories().then(function(response){
            $scope.nsitems = response; //Assign data received to $scope.data
        });
    }]);
})();
