import { global } from "../../modules/global.js";
import { BaseGameObject } from "../baseGameObject.js";

class HealthKit extends BaseGameObject {
    constructor(x, y, width, height, spritePath) {
        super(x, y, width, height);
        this.name = "HealthKit";
        global.allGameObjects.push(this);
        this.loadImages([spritePath]);
    }

    reactToCollision = function(collidedObject){
        if(collidedObject.name === "Player" && this.active){
            this.active = false;
            collidedObject.health += 50;
            global.healthKitCount--;
            if(collidedObject.health > 100) collidedObject.health = 100;
        }
    }
}

export { HealthKit }