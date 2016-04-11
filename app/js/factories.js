/*
 * factory.js
 * Copyright (C) 2016 rmad <rmad@Vostro-3446>
 *
 * Distributed under terms of the MIT license.
 */
(function(){
  'use strict';

    var app = angular.module('myApp');

    app
    // getTasks
    .factory('gtFactory',['$http',function($http){
        var url = "http://localhost:8000/tasks/get_tasks/";
        return {
            getTasks : function(){
                return  $http.get(url).then(function(response){ //wrap it inside another promise using then
                    return response.data;
                });
        }}}])

    // New Stories
    .factory('ctFactory',['$http',function($http){
        var url = "http://localhost:8000/tasks/task/";
        return {
            createTask : function(){
                return  $http.post(url).then(function(response){ //wrap it inside another promise using then
                            return response;
                });
        }}}])
})();
