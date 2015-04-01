var express = require('express'),
    Camera = require('../index');

var camera = new Camera();

var app = express();

app.get('/:width/:height/:shutter', function (req, res) {
        camera.getImageAsStream({
            width: req.params.width,
            height: req.params.height,
            shutter: req.params.shutter,
            nopreview: true,
            timeout: 1
        }, function (err, stream) {
            if (err) {
                throw err;
            }
            stream.pipe(res);
        });
    }
);

app.listen(3000, '0.0.0.0');
