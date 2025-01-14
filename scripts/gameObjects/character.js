import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { Projectile } from "./projectile.js";

class Character extends BaseGameObject {
    // basic element properties
    name = "Jake";
    xVelocity = 0;
    yVelocity = 0;
    
    
    // Game specific properties
    health = 100;
    speed = 100;
    damage = 10;
    level = 1;
    experience = 0;
    movementSpeed = 1.0;
    attackSpeed = 1.0;
    healthRegeneration = 0.1; // Health Regeneration per second
    weapons = []; //equipped weapons
    lastShotTime = 0;

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.weapons.push("pistol"); // every character will have a default weapon equipped
    }

    update = function(){
        this.xVelocity = 0;
        this.yVelocity = 0;
        //Octagonal movement
        // Check for W, A, S, D key presses and set velocity accordingly
        if (global.keysPressed['w']) this.yVelocity = -this.speed * this.movementSpeed; // Moving up
        if (global.keysPressed['s']) this.yVelocity = this.speed * this.movementSpeed; // Moving down
        if (global.keysPressed['a']) this.xVelocity = -this.speed * this.movementSpeed; // Moving left
        if (global.keysPressed['d']) this.xVelocity = this.speed * this.movementSpeed; // Moving right

        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        this.screenStop();

        this.attack();
    }

    attack = function(){
        const currentTime = global.getTime();
        const attackRate = 1 / this.attackSpeed;
        if (currentTime - this.lastShotTime > attackRate) {
            let direction = Math.atan2(this.yVelocity, this.xVelocity);
            if(this.yVelocity === 0 && this.xVelocity === 0){
                direction = Math.random() * 2 * Math.PI;
            }
            if(this.weapons.includes("pistol")){
                new Projectile(this.x + this.width / 2, this.y + this.height / 2, 15, 15, 300, direction);
            }
            else console.log("No weapon equipped");
            this.lastShotTime = currentTime;
        }
    }

    draw = function(){
        global.ctx.fillStyle = "blue";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    

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

}

export { Character }