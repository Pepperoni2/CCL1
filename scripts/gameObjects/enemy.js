import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { ExpObject } from "./collectables/expObject.js";

class Enemy extends BaseGameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.name = "Enemy";
        this.health = 10;
        this.damage = 100;
        this.speed = 30;
        global.allGameObjects.push(this)
    }
    update = function(){
        const player = global.playerObject;
        // Stop if player is not active
        if(!player || !player.active) return;

        // Calculate the direction vector of the player
        const dx = player.x - this.x;
        const dy = player.y - this.y;

        // Calculate the distance of the player
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize the direction vector (make it unit length)
        const dirX = dx / distance;
        const dirY = dy / distance;

        // Update position based on speed and deltaTime
        this.x += dirX * this.speed * global.deltaTime;
        this.y += dirY * this.speed * global.deltaTime;

    }
    draw = function(){
        global.ctx.fillStyle = "red";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    reactToCollision = function(collidedObject){
        switch (collidedObject.name) {
            case "Projectile":
                collidedObject.active = false;
                this.health -= collidedObject.damage;
                if(this.health <= 0){
                    this.active = false;
                    Math.random() > 0.2 ? new ExpObject(this.x + this.width / 2, this.y + this.height / 2, 15, 15) : null;  
                }
                break;
            case "Player":
                collidedObject.health -= this.damage * global.deltaTime;
                break;
            default:
                // do nothing
                break;
        }

    }
}

export { Enemy }