require('rooty')('./');

var logicLoop = require('^logicLoop'),
    renderLoop = require('^renderLoop'),
    bindings = require('^bindings'),
    settings = require('^settings');

bindings.bindKeyboard();

setInterval(logicLoop, settings.logicFrameRate);
setInterval(renderLoop, settings.renderFrameRate);
