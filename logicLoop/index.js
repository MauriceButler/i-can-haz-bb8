var state = require('^state'),
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

function checkWall(){

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
        checkWall();
        checkNextLevel();
    }
};