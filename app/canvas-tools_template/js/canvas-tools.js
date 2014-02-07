var canvas-tools = (function() {

	'use strict';
	var privateVariable = 'canvas-tools app fired!',
		docElem = document.documentElement;

	return {
		publicFunction: function() {
			console.log(privateVariable);
		},
		userAgentInit: function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		}
	};

})();

(function() {

	'use strict';

	//foundation init
	$(document).foundation();

	canvas-tools.publicFunction();
	canvas-tools.userAgentInit();

})();