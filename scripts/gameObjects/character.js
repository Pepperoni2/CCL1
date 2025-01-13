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
        this.screenStop();
    }

    draw(){
        global.ctx.fillStyle = "red";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    getBoxBounds = function () {
        let box = {
            "left": this.x,
            "right": this.x + this.width,
            "top": this.y,
            "bottom": this.y + this.height,
        };
        return box;
    };

    // character stops at the edge of the canvas
    screenStop = function(){
        let canvasBox = global.getCanvasBounds();
        let characterBox = this.getBoxBounds();

        // if the character is outside the canvas, set it to the edge of the canvas

        if (characterBox.left <= canvasBox.left) {
            this.x = canvasBox.left;
        }
        if (characterBox.right >= canvasBox.right) {
            this.x = canvasBox.right - this.width;
        }
        if (characterBox.top <= canvasBox.top) {
            this.y = canvasBox.top;
        }
        if (characterBox.bottom >= canvasBox.bottom) {
            this.y = canvasBox.bottom - this.height;
        }
        
    }

    storePositionOfPreviousFrame(){
        this.prevX = this.x;
        this.prevY = this.y;
    }
}

export { Character }