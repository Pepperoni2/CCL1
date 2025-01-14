import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Projectile extends BaseGameObject {

    name = "Projectile";
    xVelocity = 0;
    yVelocity = 0;
    movementSpeed = 1.5;


    constructor (x,y, width, height, speed, direction){ // 15x15
        super(x,y,width,height);
        this.speed = speed;
        this.direction = direction;
    }

    update = function(){
        this.x = Math.cos(this.direction) * this.speed * global.deltaTime + this.x;
        this.y = Math.sin(this.direction) * this.speed * global.deltaTime + this.y;
        this.reactToCollision();
    }

    draw = function(){
        global.ctx.fillStyle = "orange";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function(){

        let canvasBox = global.getCanvasBounds();
        let projectileBox = this.getBoxBounds();
        if (projectileBox.left <= canvasBox.left || projectileBox.right >= canvasBox.right || projectileBox.top <= canvasBox.top || projectileBox.bottom >= canvasBox.bottom) {
            console.log('projectile collided');
            this.active = false;
        }
    }
}

export { Projectile }