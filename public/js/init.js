window.bootstrap = function () {
    angular.bootstrap(document, ['reflex']);
};

window.init = function () {
    window.bootstrap();
};

$(document).ready(function () {
	if (window.location.hash == "#_=_") window.location.hash = "";
    window.init();
});