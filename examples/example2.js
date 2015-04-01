var Camera = require('../index');

var camera = new Camera();

camera.getImageAsFile({
    width: req.params.width,
    height: req.params.height,
    shutter: req.params.shutter
}, './output.jpg', function (err, stream) {
    if (err) {
        throw err;
    }
});
