// from https://github.com/maximegris Maxime GRIS
// allow angular using electron module (native node modules)

/*
const fs = require('fs');
const f_angular =
	'apps/gauzy/node_modules/@angular-devkit/build-angular/src/webpack/configs/browser.js';

fs.readFile(f_angular, 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	var result = data
		.replace(/target: "electron-renderer",/g, '')
		.replace(/target: "web",/g, '')
		.replace(/return \{/g, 'return {target: "electron-renderer",');

	fs.writeFile(f_angular, result, 'utf8', function (error) {
		if (error) return console.log(error);
	});
});
*/