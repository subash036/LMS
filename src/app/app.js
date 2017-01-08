var ng = require('../node_modules/angular/angular');
var ngRoute = require('../node_modules/angular-route/angular-route');
var controllers = require('../app/controllers/controllers')
var myService = require('./services/factory')
var myApp = angular.module('ngclient', ['ngRoute']);
myApp.controller(controllers.HomeCtrl);
myApp.controller("HeaderCtrl", function ($scope) {
    $scope.showMenu = true;
})
myApp.controller(controllers.registerCtrl);
myApp.factory(myService);
myApp.config(function ($routeProvider, $locationProvider) {
    //	$httpProvider.interceptors.push('TokenInterceptor');
    $routeProvider.when('/', {
        templateUrl: './app/views/home.html'
        , controller: controllers.HomeCtrl
    }).when('/home', {
        templateUrl: './app/views/home.html'
        , controller: controllers.HomeCtrl
    }).when('/register', {
        templateUrl: './app/views/register.html'
        , controller: controllers.registerCtrl
    }).when('/login', {
        templateUrl: './app/views/login.html'
        , controller: controllers.loginCtrl
    });
    //	$locationProvider.html5Mode(true);
});
module.exports = myApp;