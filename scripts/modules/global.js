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
        let collided = this.detectBoxCollision(givenObject, global.allGameObjects[i]);
        if (collided) {
            global.playerObject.reactToCollision(this.allGameObjects[i]);
            // log which objects collided
            // console.log(global.allGameObjects[i].name + " collided with " + givenObject.name);
            // global.allGameObjects[i].reactToCollision(global.playerObject);
            if(givenObject.active) global.allGameObjects[i].reactToCollision(givenObject);
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


export { global }