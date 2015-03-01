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

                if(file !== 'package.json') {

                    var target = path.join(process.cwd(), file);
                    if(!fs.existsSync(target)) {

                        // copy if not exist
                        var writable = fs.createWriteStream(target);
                        fs.createReadStream(path.join(templateDir, file)).pipe(writable);
                    }
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

                fs.readFileAsync(path.join(templateDir, 'package.json'))
                    .then(function (template) {

                        try{
                            var content = JSON.parse(data), templateContent = JSON.parse(template);

                            content.devDependencies = templateContent.devDependencies;

                            return fs.writeFileAsync(pkgPath, JSON.stringify(content, null, 2));
                        }
                        catch(ex) {
                            console.log('Failed to append devDependencies');
                        }
                    });
            }
        })
        .catch(function(err) {

            console.log('Init failed: ' + err.message || 'Unknown error');
        })
        .finally(function () {

            console.log('yol init over.');
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