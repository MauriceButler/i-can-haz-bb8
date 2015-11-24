var ctx = require('axel'),
    settings = require('^settings'),
    state = require('^state'),
    levels = require('^levels'),
    imageMaps = require('^imageMaps');

function renderImageMap(x, y, map){
    function drawRow(rowNumber, rowData){
        for (var i = 0; i < rowData.length; i++) {
            if(rowData[i]){
                var colour = settings.colours[rowData[i]] || settings.colours[1];

                ctx.bg(colour.r, colour.g, colour.b);
                ctx.point(x + i, y + rowNumber);
            }
        }
    }

    for (var i = 0; i < map.length; i++) {
        drawRow(i, map[i]);
    }
}

function drawBb8(){
    renderImageMap(
        state.position.x,
        state.position.y,
        imageMaps.bb8[state.orientation]
    );
}

function drawSabers(){
    for (var i = 0; i < state.sabers.length; i++) {
        renderImageMap(
            state.sabers[i].x,
            state.sabers[i].y,
            imageMaps.lightSaber[state.sabers[i].type]
        );
    }
}

function drawLevelRow(rowData, rowIndex){
    for (var i = 0; i < rowData.length; i++) {
        if(rowData[i] === 1){
            renderImageMap(
                i * 10 + settings.margin,
                rowIndex * 5 + settings.margin,
                levels.mappings[rowData[i]]
            );
        }

        if(!state.loaded[state.currentLevel]){
            if(rowData[i] === 2){
                state.position.x = i * 10 + settings.margin;
                state.position.y = rowIndex * 5 + settings.margin;
            }

            if(rowData[i] > 2){
                state.sabers.push(
                    {
                        x: i * 10 + settings.margin,
                        y: rowIndex * 5 + settings.margin,
                        type: rowData[i] - 3
                    }
                );
            }
        }
    }
}

function drawLevel(levelIndex){
    var level = levels.layouts[levelIndex];

    for (var i = 0; i < level.length; i++) {
        drawLevelRow(level[i], i);
    }

    state.loaded[state.currentLevel] = true;
}

module.exports = function(){
    ctx.clear();

    if(state.mode === 'play'){
        drawLevel(state.currentLevel);
        drawSabers();
        drawBb8();
    }

    ctx.bg(0, 255, 0);
    ctx.fg(0, 0, 0);

    ctx.text(settings.boardWidth / 2 - 20 , settings.boardHeight - 2, '' + state.debugText);

    ctx.cursor.restore();
};

module.exports.ctx = ctx;