import { global } from "./global.js";
let progressBar = null;
const upgrades = [
    // Weapons
    {
        title: "Electric Field",
        description:[
            "An Electric Field appears around you - duration = 0.5s, cooldown = 5s",
            "Increase Radius of Elecric Field - duration = 1s",
            "Increase Radius of Elecric Field - cooldown reduced to 4.5s - baseDamage +10%",
            "Increase Radius  of Elecric Field - Basedamage +10%, - cooldown reduced to 3s",
            "Cooldown reduced to 2s",
            "The Electric Field is constantly active! - Basedamage +30%",
        ],
        progress: 0,
        maxProgress: 5,
        imagePath: "../assets/images/electricField.png",
        equipWeapon: function(){
            global.playerObject.weapons.push({
                name: "ElectricField",
                baseDamage: 50,
                radius: 100,
                duration: 1,
                cooldown: 5, 
            })
            global.applyFieldUpgrade = true
        },
        upgrade: function(){

            if(this.progress == 0){
                this.equipWeapon();
                this.progress++;
            }
            else{
                const index = Object.keys(global.playerObject.weapons).find(key => global.playerObject.weapons[key].name === "ElectricField");
                switch (this.progress) {
                    case 1:
                        // Increase the radius by 20 px
                        global.playerObject.weapons[index].radius += 20; // increase radius
                        global.playerObject.weapons[index].duration = 1.0; // increase duration to 1 second
                        break;
                    case 2:
                        // Increase the radius by 20 px
                        global.playerObject.weapons[index].radius += 20;
                        global.playerObject.weapons[index].cooldown = 4.5;
                        // Increase baseDamage by 10%
                        global.playerObject.weapons[index].baseDamage += global.playerObject.weapons[index].baseDamage * 0.1;
                        break;
                    case 3:
                        // Increase the radius by 20 px
                        global.playerObject.weapons[index].radius += 20;
                        // Increase baseDamage by 10%
                        global.playerObject.weapons[index].baseDamage += global.playerObject.weapons[index].baseDamage * 0.1;
                        // Cooldown reduced to
                        global.playerObject.weapons[index].cooldown = 3.0;
                        break;
                    case 4: 
                        global.playerObject.weapons[index].cooldown = 2.0;
                        break;
                    case 5:
                        global.playerObject.weapons[index].baseDamage += global.playerObject.weapons[index].baseDamage * 0.3;
                        global.playerObject.weapons[index].duration = 0;
                        global.playerObject.weapons[index].cooldown = 0;
                        break;
                    default:
                        // do nothing
                        break;
                }
                this.progress++;
                global.applyFieldUpgrade = true;
            }
        }
    },
    {
        title: "Pistol",
        description: [
            "",
            "Increase Base damage by 10%",
            "Increase Base damage by 10% - Projectile + 1",
            "Increase Base damage by 10%",
            "Projectile + 1",
        ],
        progress: 1,  // progress 1 because the player starts with the pistol, currently there is no plan on choosing which weapon you can equip from the start so this should be fine
        maxProgress: 4,
        imagePath: ["../assets/images/pistol_upgrade_1.png","../assets/images/pistol_upgrade_2.png"],
        upgrade: function(){
            const index = Object.keys(global.playerObject.weapons).find(key => global.playerObject.weapons[key].name === "pistol");
            this.progress++;
            switch(this.progress){
                case 2: 
                    global.playerObject.weapons[index].baseDamage += global.playerObject.weapons[index].baseDamage * 0.1; // increase Base damage by 10%
                    break;
                case 3:
                    global.playerObject.weapons[index].baseDamage += global.playerObject.weapons[index].baseDamage * 0.1; // increase Base damage by 20%
                    global.playerObject.weapons[index].projectileCount += 1;
                    break;
                case 4:
                    global.playerObject.weapons[index].baseDamage += global.playerObject.weapons[index].baseDamage * 0.1; // increase Base damage by 30%
                    break;
                case 5:
                    global.playerObject.weapons[index].projectileCount += 1;
                    break;
                default:
                    // do nothing
                    break;
            }
        }
    },
    {
        title: "Movement Boost",
        description: [
            "Increase the Movement speed of the player by 15%",
            "Increase the Movement speed of the player by 15%",
            "Increase the Movement speed of the player by 15%",
            "Increase the Movement speed of the player by 15%",
        ],
        progress: 0,
        maxProgress: 3,
        imagePath: "../assets/images/movement_speed.png",
        upgrade: function(){
            this.progress++;
            global.playerObject.movementSpeed += global.playerObject.movementSpeed * 0.15; // increase movementSpeed by 15%
        }
    },
    {
        title: "Damage Boost",
        description: [
            "Increases the damage of the player by 20%",
            "Increases the damage of the player by 20%",
            "Increases the damage of the player by 20%",
            "Increases the damage of the player by 30%",
            "Increases the damage of the player by 50%",
        ],
        progress: 0,    
        maxProgress: 4,
        imagePath: "../assets/images/damage_boost.png",
        upgrade: function(){
            switch(this.progress){
                case 0:
                    global.playerObject.dmgModifier += 0.2;  // increase damage by 20%
                    break;
                case 1:
                    global.playerObject.dmgModifier += 0.2;  // increase damage by 20%
                    break;
                case 2:
                    global.playerObject.dmgModifier += 0.2;  // increase damage by 20%
                    break;
                case 3:
                    global.playerObject.dmgModifier += 0.3;  // increase damage by 30%
                    break;
                case 4:
                    global.playerObject.dmgModifier += 0.5;  // increase damage by 50%
                    break;
            }
            this.progress++;
             
        }
    },
    {
        title: "Health Regeneration",
        description:[
            "Increases your health regeneration by 1.0 per second", 
            "Increases your health regeneration by 1.0 per second",
            "Increases your health regeneration by 1.0 per second",
            "Increases your health regeneration by 1.0 per second",
            "Increases your health regeneration by 1.0 per second",
            "Increases your health regeneration by 1.0 per second",
        ],
        progress: 0,
        maxProgress: 5,
        imagePath: "../assets/images/HealthRegeneration.png",
        upgrade: function(){
            this.progress++;
            global.playerObject.healthRegeneration += 1; // increase health regeneration by 1
        }
    },
    

];

function displayUpgradeCards(){
    const chosenUpgrades = getRandompgrades(2);

    // Check if there are still upgrades avaiable 
    if (chosenUpgrades.length != 0) { 
        let counter = 0;
        document.querySelector('#upgradeScreen').style.display = "block";
        const cards = document.querySelector("#cards");
        cards.innerHTML = "";
        chosenUpgrades.forEach(upgrade => {
            counter++;
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
            <div class="upperContainer">
            <div class="cardImage"><img src="${upgrade.title === 'Pistol' && upgrade.progress >= 2 ? upgrade.imagePath[1] : upgrade.title === 'Pistol' && upgrade.progress < 2 ? upgrade.imagePath[0] : upgrade.imagePath}" alt="Upgrade Image"></div>
            <div class="titleProgressContainer">
            <h3 class="cardTitle">${upgrade.title}</h3>
            <div class="progress-bar-${counter}"></div>
            </div>
            </div>
            <p class="cardDescription">${upgrade.description[upgrade.progress]}</p>
        `;
            card.addEventListener("click", () => selectUpgrade(upgrade));
            cards.appendChild(card);
            initializeProgressBar(counter, upgrade.progress, upgrade.maxProgress);
        });
        global.IsupgradeSceneActive = true;
    }
    
}

function initializeProgressBar(id, progress, maxProgress){
    progressBar = document.querySelector(`.progress-bar-${id}`)
    progressBar.innerHTML = "";
    const lvlStat = document.createElement("div");
    lvlStat.classList.add("lvl");
    progressBar.appendChild(lvlStat);
    lvlStat.innerHTML = `Lvl.${progress} => ${(progress) == maxProgress ? 'MAX': progress + 1}`;
    // Create blocks for the progress bar
    for(let i = 0; i < maxProgress; i++){
        const block = document.createElement("div");
        block.className = "block"; //default block style
        progressBar.appendChild(block)
    }
    updateProgressBar(progress);
}
function updateProgressBar(progress){
    const blocks = progressBar.querySelectorAll(".block");

    //Fill blocks up to the current progress
    blocks.forEach((block, index) => {
        if (index < progress){
            block.classList.add("filled");
        }
    })
}

function getRandompgrades(count){
    const avaiableUpgrades = upgrades.filter(obj => obj.progress <= obj.maxProgress);
    const shuffled = avaiableUpgrades.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function selectUpgrade(upgrade){
    //Apply the upgrade to the player  
    upgrade.upgrade();
    // console.log("Upgrade applied: ", upgrade);
    // set display of upgradeScreen to none
    document.querySelector("#upgradeScreen").style.display = "none";
    global.IsupgradeSceneActive = false;
}

export {upgrades, displayUpgradeCards }