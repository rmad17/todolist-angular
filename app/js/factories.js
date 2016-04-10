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
        var ids = [];
        var nsList = [];
        return {
            createTasks : function(){
                return  $http.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty').then(function(response){ //wrap it inside another promise using then
                            ids = response.data;
                            var getStoryDetails = function(id){
                                var u1 = 'https://hacker-news.firebaseio.com/v0/item/';
                                var u2 = id.toString();
                                var u3 = '.json?print=pretty';
                                var url = u1 + u2 + u3;
                                return  $http.get(url).then(function(response) { //wrap it inside another promise using then
                                        nsList.push(response.data);
                                        return response.data;  //only return friends
                                });
                            };
                            for(var i = 0; i < 20; i++){
                                getStoryDetails(ids[i]);
                            }
                            return nsList;
                });
        }}}])
})();
