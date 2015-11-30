window.angular.module('reflex.controllers.home', [])
    .controller('HomeController', ['$scope', '$routeParams', '$location', 'global',
        function ($scope, $routeParams, $location, Global) {

            $scope.homeText = "TOMTOM";


}]);
