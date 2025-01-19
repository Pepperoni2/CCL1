import { global } from "../../modules/global.js";
import { BaseGameObject } from "../baseGameObject.js";

class ExpObject extends BaseGameObject{
    constructor(x, y, width, height, exp){
        super(x, y, width, height);
        this.name = "ExpObject";
        this.exp = exp;
        global.allGameObjects.push(this);   
        this.loadImages(["../assets/sprites/EXP_Orb.png"])
    }

    // draw = function(){
    //     global.ctx.fillStyle = "violet";
    //     global.ctx.fillRect(this.x, this.y, this.width, this.height);
    // }
}

export { ExpObject }