import { global } from "../../modules/global.js";
import { BaseGameObject } from "../baseGameObject.js";

class Magnet extends BaseGameObject 
{

    constructor(x, y, width, height){
        super(x, y, width, height);
        this.name = "Magnet";
        global.allGameObjects.push(this);
        this.loadImages(["../assets/sprites/magnet.png"]);
    }

    reactToCollision = function(collidedObject){
        if(collidedObject.name === "Player" && this.active){
            this.active;
            this.collectAllXP();
            global.magnetCount--;
        }
    }

    collectAllXP = function(){
        global.allGameObjects.forEach((object) => {
            if (object.name === "ExpObject") {
                object.magnetActive = true;
                object.chasePlayer();
            }
        });
        this.active = false;
    }
}
export { Magnet }