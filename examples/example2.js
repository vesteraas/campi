var Campi = require('../index');

var campi = new Campi();

campi.getImageAsFile({
    width: 640,
    height: 480,
    nopreview: true,
    timeout: 1,
    hflip: true,
    vflip: true
}, './output.jpg', function (err) {
    if (err) {
        throw err;
    }
    console.log('Image captured');
});
