import {global} from "../modules/global.js";

class BaseGameObject {
    active = true;
    name; 
    x = 0;
    y = 0;
    prevX;
    prevY;
    width = 50;
    height = 50;

    // Game specific properties
    health = 100;
    damage = 10;

    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.prevX = x;
        this.prevY = y;
        global.allGameObjects.push(this);
    }

    storePositionOfPreviousFrame(){
        this.prevX = this.x;
        this.prevY = this.y;
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

    update = function () {
        // empty function to be overwritten by child classes
    }
    draw = function () {
        // empty function will later be replaced with getNextSprite function
    }

    getNextSprite = function(){
        // empty function will later be added
    }

    loadImages = function(){
        // empty function will later be added
    }

    loadImagesFromSpriteSheet = function(){
        // empty function will later be added
    }

    reactToCollision = function(collidedObject){
        // empty function to be overwritten by child classes
    }
}

export {BaseGameObject}