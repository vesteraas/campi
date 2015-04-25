var Options = require('../options');
var assert = require('assert');

var options = new Options();

var optstr = options.process({
    'width': 640,
    'height': 320,
    'vf': true,
    'hf': true,
    'n': true
});

assert.equal(JSON.stringify(optstr), '["-w",640,"-h",320,"-vf","-hf","-n"]');

optstr = options.process({
    'width': 640,
    'height': 320,
    'vf': true,
    'hf': true,
    'n': true
});

assert.equal(JSON.stringify(optstr), '["-w",640,"-h",320,"-vf","-hf","-n"]');

optstr = options.process({
    'width': 640,
    'height': 320,
    'vf': false,
    'hf': false,
    'n': false
});

assert.equal(JSON.stringify(optstr), '["-w",640,"-h",320]');

