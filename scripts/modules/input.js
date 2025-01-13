import { global } from "./global.js";

// const velocityStep = 500;

// function move() {
//     resetVelocity();
//     //Octagonal movement
//     // Check for W, A, S, D key presses and set velocity accordingly
//     if (keysPressed['w']) global.playerObject.yVelocity = -velocityStep * global.playerObject.movementSpeed; // Moving up
//     if (keysPressed['s']) global.playerObject.yVelocity = velocityStep * global.playerObject.movementSpeed; // Moving down
//     if (keysPressed['a']) global.playerObject.xVelocity = -velocityStep * global.playerObject.movementSpeed; // Moving left
//     if (keysPressed['d']) global.playerObject.xVelocity = velocityStep * global.playerObject.movementSpeed; // Moving right
// }
// function resetVelocity() {
//     global.playerObject.xVelocity = 0;
//     global.playerObject.yVelocity = 0;
// }
function checkKeys(event){
    if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd') {
        global.keysPressed[event.key] = true;
    }
}

function stopKeys(event){
    if (event.key === 'w' || event.key === 'a' || event.key === 's' || event.key === 'd') {
        global.keysPressed[event.key] = false;
    }
}

document.addEventListener("keydown", checkKeys);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stopKeys);
