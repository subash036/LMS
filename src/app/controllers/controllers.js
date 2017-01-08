//import myApp from '../app.js'
//console.log(myApp);
//myApp.controller("HomeCtrl", ['$scope', function ($scope) {
//		$scope.name = "Home Controller";
//  }
//]);
var myService = require('../services/factory')
console.log(myService);
module.exports = {
    HomeCtrl: function ($scope) {
        console.log($scope);
    }
    , registerCtrl: function ($scope, $http) {
        console.log($scope);
        $scope.user = {};
        //		$scope.status = myService.register($scope.user, $http);
        $scope.register = function () {
            myService.register($scope.user, $http).then(function (result) {
                console.log(result.data)
            }).catch(function (err) {
                console.log(err)
            })
        }
    }
    , loginCtrl: function ($scope, $http) {
        console.log($scope);
        $scope.user = {};
        //        $scope.status = myService.register($scope.user, $http);
        $scope.login = function () {
            myService.login($scope.user, $http).then(function (result) {
                console.log(result)
            }).catch(function (err) {
                console.log(err)
            })
        }
    }
}