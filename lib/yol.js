'use strict';

var os = require('os');
var path = require('path');

var actions = {

	'init': {
		'description': 'Init project with npm and bower.',
		'method': 'init'
	},
	'help': {
		'description': 'Show help text.',
		'method': 'showHelpText'
	}
};

exports.init = function () {

	console.log('Now start init project...');

	// npm init
	
	

	// bower init
	

	// copy templates
};

exports.showHelpText = function() {

	var msg = os.EOL + 'yol version: ' + (getVersion() || 'Unknown') + '.'+ os.EOL +'Available actons:' + os.EOL;

	for (var key in actions) {

		var meta = actions[key];
		msg += ( '    ' + key + ': ' + (meta.description || '') + os.EOL );
	}

	// remove final EOL
	msg = msg.substring(0, msg.length-os.EOL.length);

	console.log(msg);
};

exports.getActions = function() {

	return actions;
};

function getVersion() {

	var pkg = require(path.join(__dirname, '../package.json'));

	if(pkg) return pkg.version;
}