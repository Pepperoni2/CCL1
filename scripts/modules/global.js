import { Enemy } from "../gameObjects/enemy.js";
import { SoundManager } from "./soundManager.js";

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
global.IsupgradeSceneActive = false;
global.applyFieldUpgrade = false;
global.gameIsPaused = false;
global.seconds = 0;
global.spawnRate = 2000;
global.newSpawnRate = false;
global.music = new SoundManager();
global.newMusic = false;
global.lastDamageTime = 0;
global.magnetCount = 0;
global.healthKitCount = 0;

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

global.ShowGameOverScreen = function(){
    global.music.stopMusic();
    global.playerObject.active = false;
    // hide upgrade screen if it is open
    document.querySelector("#upgradeScreen").style.display = "none";
    // display gameOver Screen
    document.querySelector("#gameOverScreen").style.display = "flex";
    document.querySelector("#finalScore").innerHTML = global.score;
}

global.startTime = Date.now();
global.getTime = function(){
    return (Date.now() - global.startTime) / 1000; // Elapsed time in seconds
}

global.adjustSpawnRate = function(){
    if(global.seconds <= 60){
        global.spawnRate = 2000; // 2 seconds
    }
    else if (global.seconds >= 60 && global.spawnRate > 1500) {
        global.spawnRate -= 200; // Faster scaling after 1 minute
    } else if (global.seconds >= 300 && global.spawnRate > 1000) {
        global.spawnRate -= 150; // Further decrease after 5 minutes
    } else if (global.spawnRate > 500) {
        global.spawnRate -= 100; // Gradual scaling otherwise
    }
    else {      // minimum 500 miliseconds spawnrate
        global.spawnRate = 500;
    }

    //Clear and reset interval
    clearInterval(global.enemyInterval);
    global.enemyInterval = setInterval(() => {
        if(!global.gameIsPaused){
            if(!global.playerObject.active){ 
                clearInterval(global.enemyInterval);
            }
            else{
                // Stop spawning enemies if upgrade Screen is active
                if(!global.IsupgradeSceneActive) global.spawnEnemy();
            }
        }
    }, global.spawnRate);
}

global.spawnRateAdjuster = setInterval(() => {
    global.adjustSpawnRate();
}, 30000); // Adjust every 30 seconds

global.spawnEnemy = function(){
    let edge = Math.floor(Math.random() * 4);
    let randomX, randomY;
    switch(edge){
        case 0: //left edge
            randomX = -60;
            randomY = Math.random() * global.canvas.height;
            break;
        case 1: //top edge
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
    if(global.seconds < 60){
        new Enemy(randomX, randomY, 60, 60, 10, 30, 10, "../assets/sprites/Enemy.png");
        console.log("Enemy spawned");
    }
    else if(global.seconds >= 60 && global.seconds <= 120){ // 1-2 minutes
        new Enemy(randomX, randomY, 60, 60, 10, 30, 15, "../assets/sprites/Enemy.png");
    }
    else if(global.seconds >= 120 && global.seconds <= 240){ // 2-4 min
        new Enemy(randomX, randomY, 60, 60, 15, 30, 20, "../assets/sprites/Enemy_2.png");
    }
    else if(global.seconds >= 240 && global.seconds <= 300){ // 4-5 min
        if(!global.newMusic){
            document.querySelector('#gameCanvas').style.backgroundImage = "url('../assets/images/Background_2.png'"; 
            global.music.stopMusic();
            global.music.backgroundMusic = null;
            global.music.loadSound("phase2", "../assets/sounds/MOL_HighAlert.mp3", true);
            global.music.playMusic();
            global.newMusic = true;
        }
        new Enemy(randomX, randomY, 60, 60, 15, 35, 35, "../assets/sprites/Enemy_2.png");
    }
    else if(global.seconds >= 300 && global.seconds <= 420){ // 5-7 min
        new Enemy(randomX, randomY, 60, 60, 20, 35, 50, "../assets/sprites/Enemy_2.png");
    }
    else if(global.seconds >= 420 && global.seconds <= 480){ // 7-8 min
        if(global.newMusic){
            document.querySelector('#gameCanvas').style.backgroundImage = "url('../assets/images/Background_3.png'"; 
            global.newMusic = false;
        }
        new Enemy(randomX, randomY, 60, 60, 30, 35, 60, "../assets/sprites/Enemy_3.png");
    }
    else if(global.seconds >= 480 && global.seconds <= 600){ // 8-10 min
        if(!global.newMusic){
            document.querySelector('#gameCanvas').style.backgroundImage = "url('../assets/images/Background_4.png'"; 
            global.newMusic = true;
        }
        new Enemy(randomX, randomY, 60, 60, 40, 40, 80, "../assets/sprites/Enemy_3.png");
    } 
    else if(global.seconds > 600 && global.seconds <= 900){       // 10-15 min
        if(global.newMusic){
            document.querySelector('#gameCanvas').style.backgroundImage = "url('../assets/images/Chalamity.png'"; 
            global.music.stopMusic();
            global.music.backgroundMusic = null;
            global.music.loadSound("phase2", "../assets/sounds/TheMistyEye_OtherwordlyChalamity.mp3", true);
            global.music.playMusic();
            global.newMusic = false;
        }
        new Enemy(randomX, randomY, 60, 60, 100, 40, 100, "../assets/sprites/Enemy_4.png");
    }
    else{ // 15+ min 
        new Enemy(randomX, randomY, 60, 60, 200, 50, 200, "../assets/sprites/Enemy_4.png");
    }
    
}
global.updateUI = function(){
    document.querySelector("#killCount").innerText = global.score;
    global.updateExperienceBar();
}
global.updateTime = function(){
    global.seconds++;
    document.querySelector("#time").innerHTML = global.formatTime(global.seconds);
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