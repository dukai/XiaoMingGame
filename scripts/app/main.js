define(function(require){
	var Application = require('xiaoming/application');
	var app = new Application({
		defaultController: 'GameBeginController',
		canvas: 'canvas',
		div: 'box'
	});
	app.run();
});