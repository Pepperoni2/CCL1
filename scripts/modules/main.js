import { global } from "./global.js";
import { Character } from "../gameObjects/character.js";
import { upgrades } from "./upgradeManager.js";

let animationFrameId;

function gameLoop(totalRunningTime) { 
    // Stop the game loop if the player is dead
    if (!global.playerObject.active){
        cancelAnimationFrame(animationFrameId);
        return;
    } 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    if(!global.IsupgradeSceneActive){
        global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

        global.allGameObjects = global.allGameObjects.filter(obj => obj.active); // 
        // Deletes all objects that are not active
        global.allGameObjects.forEach(obj => obj.update()); // Update all game objects
        global.allGameObjects.forEach(obj => obj.draw()); // Draw all game objects
        global.allGameObjects.forEach(obj => global.checkCollisionWithAnyOther(obj)); // Check for collisions between all game objects
    }
    global.updateUI(); // Update the experience bar of the player
    animationFrameId = requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely

}

function setupGame() {
    document.querySelector("#gameOverScreen").style.display = "none";
    document.querySelector("#experienceBarFill").style.width = "0%";
    for (let i = 0; i < upgrades.length; i++) {
         // sets progress to 1 
        if(upgrades[i].title === "Pistol") upgrades[i].progress = 1;
        else upgrades[i].progress = 0;
    }
    global.allGameObjects = [];
    global.score = 0;
    global.gameOver = false;
    global.startTime = Date.now();
    global.playerObject = new Character(640, 340, 60, 60);
    const spawnRate = 2000; // 2 seconds
    const enemyInterval = setInterval(() => {
        // Stop spawning enemies if player is dead
        if(!global.playerObject.active){ 
            clearInterval(enemyInterval);
         }
        else{
            if(!global.IsupgradeSceneActive) global.spawnEnemy();
        }

    }, spawnRate);
    animationFrameId = requestAnimationFrame(gameLoop);
}
setupGame();
animationFrameId = requestAnimationFrame(gameLoop);
/* this is a fix that makes your game still runable after you left the tab/browser for some time: */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      global.deltaTime = performance.now();
    } 
});

document.addEventListener("keydown", (event) => {
    if(!global.playerObject.active && event.key === "Enter"){
        setupGame();
    }
});


