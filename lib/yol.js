'use strict';

var os = require('os'),
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird');

// promisification
Promise.promisifyAll(fs);

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

    // copy templates
    var templateDir = path.join(__dirname, '../templates');
    var pkgPath = path.join(process.cwd(), 'package.json');

    fs.readdirAsync(templateDir)
        // get templates
        .then(function(files) {

            files.forEach(function(file) {

                var target = path.join(process.cwd(), file);
                if(!fs.existsSync(target)) {

                    // copy if not exist
                    var writable = fs.createWriteStream(target);
                    fs.createReadStream(path.join(templateDir, file)).pipe(writable);
                }
            });
        })
        // add devDependencies to package.json
        .then(function() {

            if(fs.existsSync(pkgPath)) {

                return fs.readFileAsync(pkgPath);
            }
        })
        .then(function(data) {

            if(data) {
                var defaultDev = {
                    "del": "^1.1.1",
                    "gulp": "^3.8.10",
                    "gulp-autoprefixer": "^2.1.0",
                    "gulp-concat": "^2.4.3",
                    "gulp-jshint": "^1.9.2",
                    "gulp-livereload": "^3.5.0",
                    "gulp-minify-css": "^0.4.2",
                    "gulp-nodemon": "^1.0.5",
                    "gulp-rename": "^1.2.0",
                    "gulp-uglify": "^1.1.0",
                    "jshint-stylish": "^1.0.0"
                };
                try{
                    var content = JSON.parse(data);
                    content.devDependencies = defaultDev;

                    return fs.writeFileAsync(pkgPath, JSON.stringify(content));
                }
                catch(ex) {
                    console.log('Failed to append devDependencies');
                }
            }
        })
        .catch(function(err) {

            console.log('Init failed: ' + err.message || 'Unknown error');
        });
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