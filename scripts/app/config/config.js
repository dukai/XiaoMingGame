seajs.config({
	plugins: ['shim'],
	alias: {
		'jquery': {
			src: '/scripts/library/jquery-1.9.1.min.js',
			exports: 'jQuery'
		},
		
		'kinetic': {
			src: '/scripts/library/kinetic-v4.7.1.min.js',
			exports: 'Kinetic'
		},
	},
	
	paths: {
		'app': '/scripts/app',
		'xiaoming': '/scripts/library/xiaoming'
	}
});