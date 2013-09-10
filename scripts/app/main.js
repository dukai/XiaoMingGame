define(function(require){
	var Application = require('xiaoming/application');
	var app = new Application({
		defaultController: 'GameBeginController'
	});
	app.run();
});