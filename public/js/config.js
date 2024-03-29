//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/',
		{
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})
		.when('/games',
		{
			templateUrl: 'views/games.html',
			controller: 'GameController',
			resolve: {
				loggedin: checkLoggedin
			}
		})
	.otherwise({redirectTo: '/'});
}]).factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
		return {
			response: function(response){
				if (response.status === 401) {
					console.log("Response 401");
				}
				return response || $q.when(response);
			},
			responseError: function(rejection) {
				if (rejection.status === 401) {
					console.log("Response Error 401",rejection);
					$location.path('/');
				}
				return $q.reject(rejection);
			}
		}
	}])
	.config(['$httpProvider',function($httpProvider) {
		//Http Intercpetor to check auth failures for xhr requests
		$httpProvider.interceptors.push('authHttpResponseInterceptor');
	}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, global){
	var deferred = $q.defer();
	$http.get('/loggedin').success( function(user) {
		if (user !== '0') {
			deferred.resolve();
			global.setUser(user);
		}
		else {
			$rootScope.message = 'You need to log in.';
			deferred.reject();
			$location.url('/login');
		}
	});
	return deferred.promise;
};