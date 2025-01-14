import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Enemy extends BaseGameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.name = "Enemy";
        this.health = 100;
        this.damage = 10;
        this.speed = 90;
        global.allGameObjects.push(this)
    }
    update = function(){
        // this.x += this.xVelocity * global.deltaTime;
        // this.y += this.yVelocity * global.deltaTime;
    }
    draw = function(){
        global.ctx.fillStyle = "red";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    reactToCollision = function(collidedObject){
        switch (collidedObject.name) {
            case "Projectile":
                console.log("Enemy hit by projectile");
                collidedObject.active = false;
                // this.health -= collidedObject.damage;
                // if(this.health <= 0){
                //     this.active = false;
                //     global.score += 10;
                // }
                break;
            case "Player":
                console.log("Enemy hit player");
                break;
            default:
                console.log("Unknown collision");
                break;
        }

    }
}

export { Enemy }