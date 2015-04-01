var Camera = require('../index');

var camera = new Camera();

camera.getImageAsFile({
    width: 640,
    height: 480,
    hflip: true,
    vflip: true
}, './output.jpg', function (err, stream) {
    if (err) {
        throw err;
    }
});
