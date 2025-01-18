import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { ExpObject } from "./collectables/expObject.js";

class Enemy extends BaseGameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.name = "Enemy";
        this.health = 10;
        this.damage = 50;
        this.speed = 30;
        this.damageNumbers = []; // Array to store damage numbers
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

        // Update damage numbers
        this.damageNumbers = this.damageNumbers.filter(dn => dn.time > 0);
        for(let dn of this.damageNumbers){
            dn.y -= 30 * global.deltaTime; // Move the number upwards
            dn.time -= global.deltaTime; // Decrease its visibility duration
        }

        if(this.health <= 0){
            global.score += 1;
            this.active = false;
            Math.random() > 0.2 ? new ExpObject(this.x + this.width / 2, this.y + this.height / 2, 15, 15) : null;  
        }
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
                
                break;
            case "Player":
                collidedObject.health -= this.damage * global.deltaTime;
                break;
            case "ElectricField":
                if (collidedObject.isActive){
                    const distance = Math.sqrt(
                        (this.x - collidedObject.x) ** 2 + (this.y - collidedObject.y) ** 2
                    );
                    if (distance <= collidedObject.radius) {
                        this.health -= collidedObject.damage * global.deltaTime;
                        // console.log(
                        //     `Enemy at (${this.x}, ${this.y}) took ${collidedObject.damage} damage! Remaining health: ${this.health}`
                        // );
                    }
                }
                break;
            default:
                // do nothing
                break;
        }

    }
}

export { Enemy }