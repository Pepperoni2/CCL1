import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { Projectile } from "./projectile.js";
import { displayUpgradeCards } from "../modules/upgradeManager.js";
import { ElectricField } from "./weapons/electricField.js";

class Character extends BaseGameObject {
    // basic element properties
    name = "Player";
    xVelocity = 0;
    yVelocity = 0;

    // Game specific properties
    maxHealth = 100;
    health = 0;
    movementSpeed = 100;
    level = 1;
    experience = 0;
    movementFactor = 1.5;
    attackSpeed = 1.5;
    healthRegeneration = 1; // Health Regeneration per second
    weapons = []; //equipped weapons
    electricField = {};
    lastShotTime = 0;
    experienceForNextLevel;
    dmgModifier = 1.0; // Damage modifier on every equipped weapon
    expModifier = 1.0; // Experience modifier

    animationData = {
        "animationSprites": [], 
        "timePerSprite": 1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 1,
        "currentSpriteIndex": 0
    };

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.health = this.maxHealth;
        this.loadImages(["../assets/sprites/character_1.png", "../assets/sprites/character_2.png"]);
        this.weapons.push({
            name: "pistol",
            baseDamage: 5,
            projectileCount: 1,
        }) 
        this.healthRegenIntervall = setInterval(() => {
            if(!global.IsupgradeSceneActive){
                if (this.health >= this.maxHealth) this.health = this.maxHealth;
                else this.health += this.healthRegeneration;
            }
        }, 1000);
    }
    update = function () {
        if (this.health <= 0) {
            clearInterval(this.healthRegenIntervall);
            this.health = 0;
            global.ShowGameOverScreen();
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
        if (magnitude > 0) {
            this.xVelocity = (this.xVelocity / magnitude) * this.movementSpeed * this.movementFactor;
            this.yVelocity = (this.yVelocity / magnitude) * this.movementSpeed * this.movementFactor;
        }

        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;

        this.screenStop();
        this.attack();
        while (this.experience >= this.experienceForNextLevel) {
            this.levelUp();
        }
    }

    levelUp = function () {
        this.level += 1;
        this.experience -= this.calculatedExperienceThreshold();
        this.experience < 0 ? this.experience = 0 : null;
        displayUpgradeCards();
    }

    attack = function () {
        const currentTime = global.getTime();
        const attackRate = 1 / this.attackSpeed;
        if (currentTime - this.lastShotTime > attackRate) {
            let direction = Math.atan2(this.yVelocity, this.xVelocity);
            if (this.yVelocity === 0 && this.xVelocity === 0) {
                direction = Math.random() * 2 * Math.PI;
            }
            this.weapons.forEach(weapon => {
                switch(weapon.name){
                    case "pistol":
                        let offsetY = 0,
                            offsetX = 0;          
                        for (let i = 0; i < weapon.projectileCount; i++) {
                            new Projectile(this.x + (this.width / 2) + offsetX, this.y + (this.height / 2) + offsetY, 16, 16, 500, direction, this.dmgModifier, weapon.baseDamage);
                            offsetY += 20;
                            offsetX += 20;
                        }
                        break;
                    case "ElectricField":
                        if (global.applyFieldUpgrade) {
                            global.allGameObjects = global.allGameObjects.filter(obj => obj.name !== "ElectricField");
                            new ElectricField(this.x + this.width / 2, this.y + (this.height / 2), weapon.radius, weapon.baseDamage * this.dmgModifier, weapon.duration, weapon.cooldown) 
                            global.applyFieldUpgrade = false;
                        }   
                        break;
                }
            });
            this.lastShotTime = currentTime;
        }
    }

    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        // global.ctx.fillStyle = "blue";
        // global.ctx.fillRect(this.x, this.y, this.width, this.height);
        // Health bar
        global.ctx.fillStyle = "darkred";
        global.ctx.fillRect(this.x, this.y + this.height + 10, this.width * (this.health / 100), 5);

    }
    calculatedExperienceThreshold = function () {
        return Math.floor(20 * Math.pow(1.5, this.level - 1));
    };

    reactToCollision = function (collidingObject) {
        switch (collidingObject.name) {
            case "ExpObject":
                if (collidingObject.active) {
                    collidingObject.active = false;
                    this.experience += collidingObject.exp * global.playerObject.expModifier;
                    this.experienceForNextLevel = this.calculatedExperienceThreshold();
                }
                break;
            default:
                // do nothing
                break;
        }
    }
    // character stops at the edge of the canvas
    screenStop = function () {
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