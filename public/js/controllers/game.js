window.angular.module('reflex.controllers.game', [])
    .controller('GameController', ['$scope', '$routeParams', '$location', 'global',
        function ($scope, $routeParams, $location, global) {
            $scope.user = global.getUser();

            $scope.initGamePage = function() {

                // Get list of Game Pools
            };

            $scope.joinGamePool = function() {
                $scope.gameJoined = true;

                // Add current user to Gamepool.players

                // If Gamepool.players.count % 2 === 0
                // Then pop random player
                // And pop current user
                // PLING
                $scope.showSuccessfulMatch = true
            };





}]);
