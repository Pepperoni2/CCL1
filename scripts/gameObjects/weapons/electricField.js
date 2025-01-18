import { global } from "../../modules/global.js";
import { BaseGameObject } from "../baseGameObject.js";

class ElectricField extends BaseGameObject{
    name = "ElectricField"
    radius = 50;              // Radius of the AOE attack
    damage = 50;              // Base damage dealt to enemies
    duration = 0.5;           // Duration of the AOE in seconds
    cooldown = 1;             // Cooldown time in seconds
    isAvailable = true;       // Whether the AOE is ready to use
    lastActivationTime = 0;    // Timestamp of the last activation
    isActive = false;

    constructor(x, y, radius, damage, duration, cooldown){
        super(x, y, radius * 2, radius * 2); // AOE bounds (circle within a box)
        this.radius = radius;          // Radius of the AOE
        this.damage = damage;          // Damage dealt to enemies
        this.duration = duration;      // Duration of the AOE effect (in seconds)
        this.cooldown = cooldown;      // Cooldown time (in seconds)
        global.allGameObjects.push(this);
    }

    update = function(){
        this.x = global.playerObject.x + global.playerObject.width / 2;
        this.y = global.playerObject.y + global.playerObject.height / 2;

        const currentTime = global.getTime();
        if(!this.isActive && this.isAvailable && currentTime - this.lastActivationTime >= this.cooldown){
            this.activate()
        }
    }

    activate = function(){
        if(!this.isAvailable || this.isActive) return;

        this.isAvailable = false;
        this.isActive = true;
        this.lastActivationTime = global.getTime();

        setTimeout(() => {
            this.isActive = false;
        }, this.duration * 1000)

        setTimeout(() => {
            this.isAvailable = true;
        }, this.cooldown * 1000);
    }

    draw = function(){
        if (!this.isActive) return;
        global.ctx.beginPath();
        global.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        global.ctx.fillStyle =  "rgba(9, 222, 218, 0.5)"
        global.ctx.fill();
        global.ctx.closePath();    
    }

}

export { ElectricField }