var _ = require('underscore');

var o = {
    'w': ['numeric', '-w', ['>= 0']],
    'width': 'w',
    'h': ['numeric', '-h', ['>= 0']],
    'height': 'h',
    'sh': ['numeric', '-ss', ['>= 0', '<= 6000000']],
    'shutter': 'sh',
    'n': ['boolean', '-n'],
    'nopreview': 'n',
    'op': ['numeric', '-n', ['>= 0', '<= 255']],
    'opacity': 'op',
    'ifx': ['choice', '-ifx', ["none", "negative", "solarise", "posterise", "whiteboard", "blackboard", "sketch", "denoise", "emboss", "oilpaint", "hatch", "gpen", "pastel", "watercolour", "film", "blur", "saturation"]],
    'imxfx': 'ifx',
    'mm': ['choice', '-mm', ["average", "spot", "backlit", "matrix"]],
    'metering': 'mm',
    'q': ['numeric', '-q', ['>= 0', '<= 100']],
    'quality': 'q',
    't': ['numeric', '-t', ['>= 0']],
    'timeout': 't',
    'hf': ['state', '-hf'],
    'hflip': 'hf',
    'vf': ['state', '-vf'],
    'vflip': 'vf'
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = function() {
    return {
        process: function(options) {
            var result = [];

            for (var i in options) {
                var option = typeof o[i] !== 'object' ? o[o[i]] : o[i];

                if (option[0] === 'numeric') {
                    if (!isNumeric(options[i])) {
                        throw 'property ' + i + ' is not a number';
                    }

                    _.each(option[2], function(check) {
                        if (!eval(options[i] + check)) {
                           throw 'property \'' + i + '\' should be ' + check;
                        }
                    });

                    result.push(option[1]);
                    result.push(options[i]);
                } else if (option[0] === 'choice') {
                    if (option[2].indexOf(options[i]) == -1) {
                        throw 'property \'' + i + '\' should be one of ' + option[2];
                    }

                    result.push(option[1]);
                    result.push(options[i]);
                } else if (option[0] === 'state') {
                    console.log(option);
                    result.push(option[1]);
                }
            }

            return result;
        }
    }
}