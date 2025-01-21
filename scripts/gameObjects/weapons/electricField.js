import { global } from "../../modules/global.js";
import { BaseGameObject } from "../baseGameObject.js";

class ElectricField extends BaseGameObject{
    name = "ElectricField"
    radius = 50;              // Radius of the AOE attack
    damage = 30;              // Base damage dealt to enemies
    duration = 0.5;           // Duration of the AOE in seconds
    cooldown = 1;             // Cooldown time in seconds
    isAvailable = true;       // Whether the AOE is ready to use
    lastActivationTime = 0;    // Timestamp of the last activation
    isActive = false;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 2,
        "currentSpriteIndex": 0
    };


    constructor(x, y, radius, damage, duration, cooldown){
        super(x, y, radius * 2, radius * 2); // AOE bounds (circle within a box)
        this.radius = radius;          // Radius of the AOE
        this.damage = damage;          // Damage dealt to enemies
        this.duration = duration;      // Duration of the AOE effect (in seconds)
        this.cooldown = cooldown;      // Cooldown time (in seconds)
        global.allGameObjects.push(this);
    }

    update = function(){
        this.x = global.playerObject.x + global.playerObject.width / 2 - this.radius;
        this.y = global.playerObject.y + global.playerObject.height / 2 - this.radius;

        const currentTime = global.getTime();
        if(!this.isActive && this.isAvailable && currentTime - this.lastActivationTime >= this.cooldown){
            if(this.cooldown == 0 || this.duration == 0){
                this.isActive = true;
                this.isAvailable = true;
            }
            else{
                this.activate()
            }
        }

        //😀 Check collisions with enemies
        if (this.isActive) {
            global.allGameObjects.forEach((object) => {
                if (object.name === "Enemy" && this.isCollidingWith(object)) {
                    object.reactToCollision(this); // Pass this ElectricField instance to the enemy //😀
                }
            });
        }
    }

    activate = function(){
        if(!this.isAvailable || this.isActive) return;

        this.isAvailable = false;
        this.lastActivationTime = global.getTime();
        this.isActive = true;
        const cycle = () => {
            // Activate for 2 seconds
            this.isActive = true;
            setTimeout(() => {
                this.isActive = false; // Deactivate
                this.isAvailable = false;
                setTimeout(() => {
                    // After 5 seconds cooldown, rinse and repeat
                    this.isAvailable = true
                    cycle();
                }, this.cooldown * 1000);
            }, this.duration * 1000);
        }

        cycle();
    }

    draw = function () {
        if (!this.isActive) return;
        this.loadImages(["../assets/sprites/ElectricField_1.png", "../assets/sprites/ElectricField_2.png", "../assets/sprites/ElectricField_3.png"])
        // this.loadImagesFromSpritesheet("../assets/sprites/ElectricField-sheet.png", 3, 1);
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.radius * 2, this.radius * 2);
        // global.ctx.fillStyle = "orange";
        // global.ctx.fillRect(this.x, this.y, this.width, this.height);
        // global.ctx.beginPath();
        // global.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // global.ctx.fillStyle =  "rgba(9, 222, 218, 0.2)"
        // global.ctx.fill();
        // global.ctx.closePath();    
    }

    //😀 New method for circular collision detection
    isCollidingWith(object){
        const dx = this.x + this.radius - (object.x + object.width / 2);
        const dy = this.y + this.radius - (object.y + object.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + Math.max(object.width, object.height) / 2 + 10;
    }

}

export { ElectricField }