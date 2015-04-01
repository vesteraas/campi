var Camera = require('../index');

var camera = new Camera();

camera.getImageAsFile({
    width: 640,
    height: 480,
    hflip: true,
    vflip: true
}, './output.jpg', function (err) {
    if (err) {
        throw err;
    }
    console.log('Image captured');
});
