import { global } from "../../modules/global.js";
import { BaseGameObject } from "../baseGameObject.js";

class ExpObject extends BaseGameObject{
    constructor(x, y, width, height, exp){
        super(x, y, width, height);
        this.outsideOfCanvas();
        this.name = "ExpObject";
        this.exp = exp;
        global.allGameObjects.push(this);   
        this.loadImages(["../assets/sprites/EXP_Orb.png"]);
        this.magnetActive = false;

    }
    update = function(){
        if(this.magnetActive) this.chasePlayer();
    }
    // chasePlayer will be executed in the Magnet class
    chasePlayer = function(){
        if(!global.playerObject.active) return;
        const player = global.playerObject;
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const dirX = dx / distance;
        const dirY = dy / distance;
        this.x += dirX * 300 * global.deltaTime;
        this.y += dirY * 300 * global.deltaTime;
    }

    // check if canvas can be collected else do nothing
    outsideOfCanvas = function(){
        if(this.x < 0 || this.x > global.canvas.width || this.y < 0 || this.y > global.canvas.height) this.active = false;
    }
}

export { ExpObject }