var keypress = require('keypress'),
    state = require('^state'),
    ctx = require('axel');

function left(movement){
    movement.x = -1;
}

function right(movement){
    movement.x = 1;
}

function up(movement){
    movement.y = -1;
}

function down(movement){
    movement.y = 1;
}

var move = {
    a: left,
    d: right,
    w: up,
    s: down
};

function moveBB8(key){
    move[key] && move[key](state.movement);
}

function keyBindings(key){
    if(state.mode === 'play'){
        moveBB8(key);
        return;
    }
}

function bindKeyboard(){
    keypress(process.stdin);

    process.stdin.on('keypress', function (ch, key) {
        if (key){
            if (key.ctrl && key.name === 'c') {
                ctx.bg(0,0,0);
                ctx.cursor.restore();
                process.exit();
            }
        }

        keyBindings(ch);
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
}

module.exports = {
    bindKeyboard: bindKeyboard
};