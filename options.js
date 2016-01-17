var _ = require('underscore');

var opts = {
    'w': ['numeric', '-w', ['>= 0']],
    'width': 'w',
    'h': ['numeric', '-h', ['>= 0']],
    'height': 'h',
    'e': ['choice', '-e', ['jpg', 'bmp', 'gif', 'png']],
    'encoding': 'e',
    'sh': ['numeric', '-ss', ['>= 0', '<= 6000000']],
    'shutter': 'sh',
    'n': ['boolean', '-n'],
    'nopreview': 'n',
    'op': ['numeric', '-n', ['>= 0', '<= 255']],
    'opacity': 'op',
    'ifx': ['choice', '-ifx', ['none', 'negative', 'solarise', 'posterise', 'whiteboard', 'blackboard', 'sketch', 'denoise', 'emboss', 'oilpaint', 'hatch', 'gpen', 'pastel', 'watercolour', 'film', 'blur', 'saturation']],
    'imxfx': 'ifx',
    'mm': ['choice', '-mm', ['average', 'spot', 'backlit', 'matrix']],
    'metering': 'mm',
    'q': ['numeric', '-q', ['>= 0', '<= 100']],
    'quality': 'q',
    't': ['numeric', '-t', ['>= 0']],
    'timeout': 't',
    'hf': ['boolean', '-hf'],
    'hflip': 'hf',
    'vf': ['boolean', '-vf'],
    'vflip': 'vf',
    'rot': ['numeric', '-rot'],
    'rotation': 'rot',
    'p': ['choice', '-p', ['0,0,1920,1080','0,0,1080,1920','0,608,1080,608']],
    'preview': 'p'
};

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isString(s) {
    return (typeof s == 'string' || s instanceof String);
}

module.exports = function() {
    return {
        process: function(options) {
            var result = [];

            for (var i in options) {
                var option = typeof opts[i] !== 'object' ? opts[opts[i]] : opts[i];

                if (option[0] === 'numeric') {
                    if (!isNumeric(options[i])) {
                        throw 'property ' + i + ' is not a number';
                    }

                    _.each(option[2], function(check) {
                        if (!eval(options[i] + check)) {
                           throw 'property \'' + i + '\' should be ' + check;
                        }
                    });

                    if (result.indexOf(option[1]) === -1) {
                        result.push(option[1]);
                        result.push(options[i]);
                    }
                } else if (option[0] === 'choice') {
                    if (option[2].indexOf(options[i]) == -1) {
                        throw 'property \'' + i + '\' should be one of ' + option[2];
                    }

                    if (result.indexOf(option[1]) === -1) {
                        result.push(option[1]);
                        result.push(options[i]);
                    }
                } else if (option[0] === 'boolean') {
                    if ((isString(options[i]) && options[i].toLowerCase() === 'true') || options[i] === true) {
                        if (result.indexOf(option[1]) === -1) {
                            result.push(option[1]);
                        }
                    } else if ((isString(options[i]) && options[i].toLowerCase() === 'false')  || options[i] === false) {

                    } else {
                        throw 'property \'' + i + '\' should be true or false';
                    }
                }
            }

            return result;
        }
    };
};
