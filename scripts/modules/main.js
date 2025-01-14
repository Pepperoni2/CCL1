import { global } from "./global.js";
import { Character } from "../gameObjects/character.js";

function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

    global.allGameObjects = global.allGameObjects.filter(obj => obj.active); // Deletes all objects that are not active

    global.allGameObjects.forEach(obj => obj.update()); // Update all game objects
    global.allGameObjects.forEach(obj => obj.draw()); // Draw all game objects
    global.allGameObjects.forEach(obj => global.checkCollisionWithAnyOther(obj)); // Check for collisions between all game objects
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    global.playerObject = new Character(640, 340, 60, 60);
}

setupGame();
requestAnimationFrame(gameLoop);


/* this is a fix that makes your game still runable after you left the tab/browser for some time: */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      global.deltaTime = performance.now();
    } 
});


