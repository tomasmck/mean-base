app.directive('resize', function ($window) {
    return function (scope, element) {
        var headerHeight = 160;
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return { 'h': w.height(), 'w': w.width() };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - headerHeight) + 'px',
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
})