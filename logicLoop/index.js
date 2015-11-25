var state = require('^state'),
    levels = require('^levels'),
    imageMaps = require('^imageMaps');

function setOrientation(){
    if(state.lastPositionX < state.position.x){
        state.orientation = 1;
    }

    if(state.lastPositionX > state.position.x){
        state.orientation = -1;
    }

    if(state.lastPositionX === state.position.x){
        state.orientation = 0;
    }

    state.lastPositionX = state.position.x;
}

function checkForPickup(){
    state.sabers.forEach(function(saber, index){
        var x = state.position.x + imageMaps.bb8[0][0].length / 2,
            y = state.position.y + imageMaps.bb8[0].length / 2;

        if(saber.x <= x &&
            saber.x + imageMaps.lightSaber[0][0].length >= x &&
            saber.y <= y &&
            saber.y + imageMaps.lightSaber[0].length >= y
            ){
            state.sabers.splice(index, 1);
        }
    });
}

function checkCanMove(position){
    var level = levels.layouts[state.currentLevel];

    var x = position.x + imageMaps.bb8[0][0].length / 2,
        y = position.y + imageMaps.bb8[0].length / 2;

    return !level.some(function(row, rowIndex){
        return row.some(function(cell, columnIndex){
            if(
                cell === 1 &&
                y > (rowIndex * 5) && y < (rowIndex * 5 + 8) &&
                x > (columnIndex * 10) && x < (columnIndex * 10 + 11)
            ){
                return true;
            }
        });
    });
}

function moveBB8(){
    var newPosition = {
        x: state.position.x + state.movement.x * 6,
        y: state.position.y + state.movement.y * 3
    };

    if(checkCanMove(newPosition)){
        state.position.x = newPosition.x;
        state.position.y = newPosition.y;
    }

    state.movement = {x:0,y:0};
}

function checkNextLevel(){
    if(!state.sabers.length){
        state.currentLevel++;
    }
}

module.exports = function(){
    if(state.mode === 'play' && state.loaded[state.currentLevel]){
        setOrientation();
        checkForPickup();
        moveBB8();
        checkNextLevel();
    }
};