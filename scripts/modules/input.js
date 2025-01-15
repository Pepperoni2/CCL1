import { global } from "./global.js";

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
