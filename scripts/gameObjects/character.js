import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { Projectile } from "./projectile.js";

class Character extends BaseGameObject {
    // basic element properties
    name = "Player";
    xVelocity = 0;
    yVelocity = 0;
    
    
    // Game specific properties
    health = 100;
    movementSpeed = 100;
    damage = 10; 
    level = 1;
    experience = 0;
    movementFactor = 1.5;
    attackSpeed = 1.5;
    healthRegeneration = 0.1; // Health Regeneration per second
    weapons = []; //equipped weapons
    lastShotTime = 0;
    experienceForNextLevel;
    dmgModifier = 1.0;

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.weapons.push("pistol"); // every character will have a default weapon equipped
    }

    update = function(){
        if(this.health <= 0) {
            global.gameOver();
        }
        this.xVelocity = 0;
        this.yVelocity = 0;
        //Octagonal movement
        // Check for W, A, S, D key presses and set velocity accordingly
        if (global.keysPressed['w']) this.yVelocity = -this.movementSpeed * this.movementFactor; // Moving up
        if (global.keysPressed['s']) this.yVelocity = this.movementSpeed * this.movementFactor; // Moving down
        if (global.keysPressed['a']) this.xVelocity = -this.movementSpeed * this.movementFactor; // Moving left
        if (global.keysPressed['d']) this.xVelocity = this.movementSpeed * this.movementFactor; // Moving right

        // calculate the magnitude of the velocity vector
        const magnitude = Math.sqrt(this.xVelocity ** 2 + this.yVelocity ** 2);

        // normalize the velocity vector and multiply it by the speed
        if (magnitude > 0){
            this.xVelocity = (this.xVelocity / magnitude) * this.movementSpeed * this.movementFactor;
            this.yVelocity = (this.yVelocity / magnitude) * this.movementSpeed * this.movementFactor;
        }

        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        this.screenStop();
        this.attack();
        while (this.experience >= this.experienceForNextLevel){
            this.levelUp();
        }
    }


    levelUp = function(){
        this.level += 1;
        this.experience -= this.calculatedExperienceThreshold();
        this.experience < 0 ? this.experience = 0 : null;
        this.movementSpeed += 10;
        this.dmgModifier += 0.05;
        console.log(`Level up! You are now level ${this.level}`);
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
                new Projectile(this.x + this.width / 2, this.y + this.height / 2, 15, 15, 300, direction, this.dmgModifier);
            }
            else console.log("No weapon equipped");
            this.lastShotTime = currentTime;
        }
    }

    draw = function(){
        global.ctx.fillStyle = "blue";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);

        // Display level and experience
        // global.ctx.fillStyle = "black";
        // global.ctx.font = "16px Arial";
        // global.ctx.fillText(`Level: ${this.level}`, this.x, this.y - 20);
        // Health bar
        global.ctx.fillStyle = "darkred";
        global.ctx.fillRect(this.x, this.y + this.height + 10, this.width * (this.health / 100), 5);

    }
    calculatedExperienceThreshold = function(){
        return Math.floor(10 * Math.pow(1.5, this.level - 1));
    };
    
    reactToCollision = function(collidingObject){
        switch(collidingObject.name){
            case "enemy":
                this.health -= collidingObject.damage;
                break;
            case "ExpObject":
                collidingObject.active = false;
                this.experience += collidingObject.exp;
                this.experienceForNextLevel = this.calculatedExperienceThreshold();
                break;
            default:
                // do nothing
                break;
        }
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