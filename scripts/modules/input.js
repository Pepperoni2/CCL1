import { global } from "./global.js";

const velocityStep = 500;

let keysPressed = {};

function move() {
    resetVelocity();
    
    //Octagonal movement
    switch(keysPressed){}
    // Check for W, A, S, D key presses and set velocity accordingly
    if (keysPressed['w']) global.playerObject.yVelocity = -velocityStep; // Moving up
    if (keysPressed['s']) global.playerObject.yVelocity = velocityStep; // Moving down
    if (keysPressed['a']) global.playerObject.xVelocity = -velocityStep; // Moving left
    if (keysPressed['d']) global.playerObject.xVelocity = velocityStep; // Moving right
}
function resetVelocity() {
    global.playerObject.xVelocity = 0;
    global.playerObject.yVelocity = 0;
}
function checkKeys(event){
    if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd') {
        keysPressed[event.key] = true;
    }
}

function stop() {
    global.playerObject.xVelocity = 0;
    global.playerObject.yVelocity = 0; 
}

function stopKeys(event){
    if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd') {
        keysPressed[event.key] = false;
    }
}

document.addEventListener("keydown", checkKeys);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stopKeys);

export { move, stop }