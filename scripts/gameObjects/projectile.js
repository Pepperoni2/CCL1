import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Projectile extends BaseGameObject {

    name = "Projectile";
    xVelocity = 0;
    yVelocity = 0;
    movementSpeed = 1.5;
    damage = 5;
    dmgModifier = 1.0;


    constructor (x,y, width, height, speed, direction, dmgModifier){ // 15x15
        super(x,y,width,height);
        this.speed = speed;
        this.direction = direction;
        this.damage = this.damage * dmgModifier;
    }

    update = function(){
        this.x = Math.cos(this.direction) * this.speed * global.deltaTime + this.x;
        this.y = Math.sin(this.direction) * this.speed * global.deltaTime + this.y;
        this.checkCanvasEdge();
    }

    draw = function(){
        global.ctx.fillStyle = "orange";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function(){
    }

    // sets state of projectile to false when canvas edge has been reached
    checkCanvasEdge = function(){
        let canvasBox = global.getCanvasBounds();
        let projectileBox = this.getBoxBounds();
        if (projectileBox.left <= canvasBox.left || projectileBox.right >= canvasBox.right || projectileBox.top <= canvasBox.top || projectileBox.bottom >= canvasBox.bottom) {
            this.active = false;
        }
    }
}

export { Projectile }