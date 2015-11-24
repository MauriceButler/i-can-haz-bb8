var ctx = require('axel');

module.exports = {
    logicFrameRate: 100,
    renderFrameRate: 100,
    boardWidth: ctx.cols,
    boardHeight: ctx.rows,
    margin: 3,
    colours: [
        null,
        {r: 255, g: 0, b: 0},
        {r: 255, g: 150, b: 13},
        {r: 130, g: 130, b: 130},
        {r: 0, g: 0, b: 0},
        {r: 150, g: 90, b: 10},
        {r: 0, g: 50, b: 250},
        {r: 40, g: 255, b: 0},
        {r: 255, g: 0, b: 255},
        {r: 0, g: 35, b: 160},
        {r: 0, g: 204, b: 204},
        {r: 0, g: 10, b: 80},
    ]
};