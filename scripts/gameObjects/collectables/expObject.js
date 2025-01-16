import { global } from "../../modules/global.js";
import { BaseGameObject } from "../baseGameObject.js";

class ExpObject extends BaseGameObject{
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.name = "ExpObject";
        this.exp = 2;
        global.allGameObjects.push(this);   
    }

    // update = function(){

    // }

    draw = function(){
        global.ctx.fillStyle = "violet";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function(){
        // if(collidedObject.name === "Player"){
        //     collidedObject.experience += this.exp;
        //     this.active = false;
        // }
    }
}

export { ExpObject }