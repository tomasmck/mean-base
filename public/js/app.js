window.app = angular.module('reflex', ['ngResource', 'ngRoute', 'reflex.controllers', 'reflex.services']);

// bundling dependencies
window.angular.module('reflex.controllers', ['reflex.controllers.home', 'reflex.controllers.game']);
window.angular.module('reflex.services', ['reflex.services.global']);