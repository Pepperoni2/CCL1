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


    constructor(x, y, radius, damage, duration, cooldown){
        super(x, y, radius * 2, radius * 2); // AOE bounds (circle within a box)
        this.radius = radius;          // Radius of the AOE
        this.damage = damage;          // Damage dealt to enemies
        this.duration = duration;      // Duration of the AOE effect (in seconds)
        this.cooldown = cooldown;      // Cooldown time (in seconds)
        global.allGameObjects.push(this);
        global.isActive = false;
    }

    update = function(){
        this.x = global.playerObject.x + global.playerObject.width / 2;
        this.y = global.playerObject.y + global.playerObject.height / 2;

        const currentTime = global.getTime();
        if(!global.isActive && this.isAvailable && currentTime - this.lastActivationTime >= this.cooldown){
            if(this.cooldown == 0 || this.duration == 0){
                global.isActive = true;
                this.isAvailable = true;
            }
            else{
                this.activate()
            }
        }
    }

    activate = function(){
        if(!this.isAvailable || global.isActive) return;

        this.isAvailable = false;
        this.lastActivationTime = global.getTime();
        global.isActive = true;
        const cycle = () => {
            // Activate for 2 seconds
            global.isActive = true;
            setTimeout(() => {
                global.isActive = false; // Deactivate
                this.isAvailable = false;
                setTimeout(() => {
                    // After 5 seconds cooldown, rinse and repeat
                    global.isActive = true
                    this.isAvailable = true
                    cycle();
                }, this.cooldown * 1000);
            }, this.duration * 1000);
        }

        cycle();
        // setTimeout(() => {
        //     this.isActive = true;
        //     this.isAvailable = false;
        // }, this.duration * 1000)

        // setTimeout(() => {
        //     this.isAvailable = true;
        //     this.isActive = false;
        // }, this.cooldown * 1000);
    }

    draw = function(){
        if (!global.isActive) return;
        global.ctx.beginPath();
        global.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        global.ctx.fillStyle =  "rgba(9, 222, 218, 0.2)"
        global.ctx.fill();
        global.ctx.closePath();    
    }

}

export { ElectricField }