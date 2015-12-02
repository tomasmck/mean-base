window.angular.module('reflex.services.global', [])
  .factory('global', function() {
  	var current_user = window.user;
    return {
      getUser: function() {
        return current_user;
      },
      isSignedIn: function() {
        return !!current_user;
      },
      setUser: function($user) {
        current_user = $user;
      }
    };
  });