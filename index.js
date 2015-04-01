var spawn = require('child_process').spawn,
    Stream = require('stream'),
    fs = require('fs'),
    Options = require('./options');

function Camera() {
}

var opts = new Options();

Camera.prototype.getImageAsStream = function (options, callback) {
    try {
        if (typeof options !== 'object') {
            callback('Option property should be an object, or null');
        }

        var args = opts.process(options);

        var child = spawn('raspistill', args.concat(['-n', '-t', 1, '-o',  '-']));

        var stream = new Stream();

        child.stderr.on('data', stream.emit.bind(stream, 'error'));
        child.stdout.on('data', stream.emit.bind(stream, 'data'));
        child.stdout.on('end', stream.emit.bind(stream, 'end'));
        child.on('error', stream.emit.bind(stream, 'error'));

        callback(null, stream);
    } catch (error) {
        callback(error);
    }
}

Camera.prototype.getImageAsFile = function (options, filename, callback) {
    try {
        if (typeof options !== 'object') {
            callback('Option property should be an object, or null');
        }

        if (typeof filename !== 'string') {
            callback('filename property should be a string');
        }

        var args = opts.process(options);

        var child = spawn('raspistill', args.concat(['-o', '-']));

        var stream = new Stream();

        child.stderr.on('data', stream.emit.bind(stream, 'error'));
        child.stdout.on('data', stream.emit.bind(stream, 'data'));
        child.stdout.on('end', stream.emit.bind(stream, 'end'));
        child.on('error', stream.emit.bind(stream, 'error'));

        var pipe = stream.pipe(fs.createWriteStream(filename));

        pipe.on('finish', function() {
            callback(null);
        });
    } catch (error) {
        callback(error);
    }
}

module.exports = Camera;