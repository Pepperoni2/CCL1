import { global } from "./global.js";
import { Character } from "../gameObjects/character.js";
import { move } from "./input.js";

function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

    for(let i = 0; i< global.allGameObjects.length; i++){
        if(global.allGameObjects[i].active){
            global.allGameObjects[i].update();
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].draw();
        }
    }
    move();
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    global.playerObject = new Character(640, 340, 60, 60);
    //new BlockObject(300, 400, 50, 50);
    // setup your game here - means: Create instances of the GameObjects that belong to your game.
    // e.g.: 
    /*    
                global.playerObject = new PacMan(200, 300, 60, 60);
                new Wall(0, 0, 100, 100);
                new Candy(100, 100, 100, 100);
    }*/
   
}

setupGame();
requestAnimationFrame(gameLoop);


/* this is a fix that makes your game still runable after you left the tab/browser for some time: */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      global.deltaTime = performance.now();
    } 
});


