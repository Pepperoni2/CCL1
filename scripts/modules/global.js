import { Enemy } from "../gameObjects/enemy.js";

const global = {};

global.canvas = document.querySelector("#gameCanvas");
global.ctx = global.canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.score = 0;
global.gameTime = 0;
global.gameOver = false;
global.keysPressed = {};

global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = 0; i < global.allGameObjects.length; i++) {
        let collided = false;
        if(global.allGameObjects[i].name != "ExpObject" && givenObject.name != "Enemy"){
            collided = this.detectBoxCollision(givenObject, global.allGameObjects[i]);
        }
        if (collided) {
            global.playerObject.reactToCollision(this.allGameObjects[i]);
            if (givenObject.active) global.allGameObjects[i].reactToCollision(givenObject);

            // log which objects collided
            // console.log(global.allGameObjects[i].name + " collided with " + givenObject.name);
            // global.allGameObjects[i].reactToCollision(global.playerObject);
            // if (givenObject.name === "ExpObject" && global.allGameObjects[i].name === "Enemy") {
            //     global.playerObject.reactToCollision(this.allGameObjects[i]);
            // }
            // else {

            //     if (givenObject.active) {
            //         global.allGameObjects[i].reactToCollision(givenObject);
            //     }
            // }
        }

    }
}


global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}

global.gameOver = function(){
    console.log("Game Over");
    global.playerObject.active = false;
}

global.startTime = Date.now();
global.getTime = function(){
    return (Date.now() - global.startTime) / 1000; // Elapsed time in seconds
}

global.spawnEnemy = function(){
    let edge = Math.floor(Math.random() * 4);
    let randomX, randomY;
    switch(edge){
        case 0: //left edge
            randomX = -60;
            randomY = Math.random() * global.canvas.height;
            break;
        case 1: //top
            randomX = Math.random() * global.canvas.width;
            randomY = -60;
            break;
        case 2: //right edge
            randomX = global.canvas.width + 60;
            randomY = Math.random() * global.canvas.height;
            break;
        case 3: //bottom edge
            randomX = Math.random() * global.canvas.width;
            randomY = global.canvas.height + 60;
            break;

    }

    new Enemy(randomX, randomY, 60, 60);
}

global.updateUI = function(){
    global.updateExperienceBar();
    global.updateTime();
    
}
global.updateTime = function(){
    document.querySelector("#time").innerHTML = global.formatTime(global.getTime());
}

global.updateExperienceBar = function(){
    const experienceBar = document.querySelector("#experienceBarFill");
    experienceBar.style.width = `${(global.playerObject.experience / global.playerObject.experienceForNextLevel) * 100}%`;
    const levelNumber = document.querySelector("#levelNumber");
    levelNumber.innerHTML = global.playerObject.level;
}
global.formatTime = function(seconds){
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    
    return `${minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
}

export { global }