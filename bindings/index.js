var keypress = require('keypress'),
    state = require('^state'),
    ctx = require('axel');

function playBindings(key){
    switch (key) {
        case 'a':
            state.position.x -= 3;
        break;
        case 'd':
            state.position.x += 3;
        break;
        case 'w':
            state.position.y -= 3;
        break;
        case 's':
            state.position.y += 3;
        break;
    }
}

function keyBindings(key){
    if(state.mode === 'play'){
        playBindings(key);
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