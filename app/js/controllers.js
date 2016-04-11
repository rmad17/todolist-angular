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
            var tasks = response.tags;
            sharedProperties.setTags(response.tags);
            $rootScope.$broadcast('tagsAdded', tags);
            sharedProperties.setTasks(response.tasks);
            $rootScope.$broadcast('tasksAdded', tasks);
        });
    }]).
    //FIXME move to services.js
    service('sharedProperties', function () {
        var tags = [];
        var tasks = [];
        return {
            getTags: function () {
                return tags;
            },
            setTags: function(value) {
                tags = value;
            },
            getTasks: function () {
                return tasks;
            },
            setTasks: function(value) {
                tasks = value;
            }
        };
    }).
    // Tags
    controller('tagCtrl', function($scope, $http, sharedProperties, $rootScope) {
                $scope.$on('tagsAdded', function(event, tags) {
                    var tags = sharedProperties.getTags();
                    $scope.tags = sharedProperties.getTags();
                })
                $scope.loadTags = function(query) {
                     return $http.get('/tags?query=' + query);
                };
    }).
    // New Task
    controller('ctCtrl',['ctFactory','$scope',function(ctFactory, $scope){
        var task_description = "";
        $scope.addItem = function() {
            task_description = this.description;
            var tags = this.tasktags;
            var data = {'description': task_description, 'tags': tags};
            ctFactory.createTask(data).then(function(response){
                $scope.status = response.status; //Assign data received to $scope.data
            });
        };
    }]).
    controller('sCtrl',function($scope, sharedProperties){
        var tasks = [];
        $scope.$on('tasksAdded', function(event, tasks) {
            var tasks = sharedProperties.getTasks();
            console.log(tasks.length);
            $scope.tasks = sharedProperties.getTasks();
            console.log(search_string);
        })
            var tags = this.tasktags;
            var search_string = this.search_string;
    });
})();
