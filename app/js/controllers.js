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
    controller('gtCtrl',['gtFactory','$scope', 'sharedProperties','$rootScope' , function(gtFactory, $scope, sharedProperties, $rootScope){
        gtFactory.getTasks().then(function(response){
            $scope.tasks = response.tasks;
            $scope.tags = response.tags;
            var tags = response.tags;
            sharedProperties.setTags(response.tags);
            $rootScope.$broadcast('tagsAdded', tags);
        });
    }]).
    //FIXME move to services.js
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
    controller('tagCtrl', function($scope, $http, sharedProperties, $rootScope) {
                $scope.$on('tagsAdded', function(event, tags) {
                    var tags = sharedProperties.getTags();
                    $scope.tags = sharedProperties.getTags();
                    console.log(sharedProperties.getTags().length);
                })
                $scope.loadTags = function(query) {
                     return $http.get('/tags?query=' + query);
                };
    }).
    // New Stories
    controller('ctCtrl',['ctFactory','$scope',function(nsFactory, $scope){
        nsFactory.getNewStories().then(function(response){
            $scope.nsitems = response; //Assign data received to $scope.data
        });
    }]);
})();
