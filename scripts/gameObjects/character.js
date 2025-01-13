import { global } from "../modules/global.js";

class Character {
    x;
    y;
    xVelocity = 0;
    yVelocity = 0;
    width;
    height;
    speed;
    prevX;
    prevY;
    name = "Jake";
    active = true;

    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        global.allGameObjects.push(this);
    }

    update(){
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
    }

    draw(){
        global.ctx.fillStyle = "red";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    // resets the position of the character to the opposite side of the screen
    // screenWrap = function(){
    //     let canvasBox = global.getCanvasBounds();
    // }

    storePositionOfPreviousFrame(){
        this.prevX = this.x;
        this.prevY = this.y;
    }
}

export { Character }