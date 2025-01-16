import { global } from "./global.js";

const upgrades = [
    {
        title: "Movement Boost",
        description: "Increaes the Movement speed of the player by 15%",
        progress: 0,
        maxProgress: 3,
        imagePath: "../images/level-up.png",
        upgrade: function(){
            this.progress++;
            global.playerObject.movementSpeed += global.playerObject.movementSpeed * 0.15; // increase movementSpeed by 15%
        }
    },
    {
        title: "Damage Boost",
        description: "Increases the damage of the player by 10%",
        progress: 0,    
        maxProgress: 3,
        imagePath: "../images/level-up.png",
        upgrade: function(){
            this.progress++;
            global.playerObject.damage += global.playerObject.damage * 0.1; // increase damage by 10%
        }
    },
    {
        title: "Health Regeneration",
        description: "Increases your health regeneration by 1.0 per second",
        progress: 0,
        maxProgress: 5,
        imagePath: "../images/level-up.png",
        upgrade: function(){
            this.progress++;
            global.playerObject.healthRegeneration += 1; // increase health regeneration by 1
        }
    }
];

function displayUpgradeCards(){
    document.querySelector('#upgradeScreen').style.display = "block";
    console.log("Displaying upgrade cards");
    const cards = document.querySelector("#cards");
    cards.innerHTML = "";

    const chosenUpgrades = getRandompgrades(2);

    chosenUpgrades.forEach(upgrade => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="upperContainer">
            <div class="cardImage"><img src="${upgrade.imagePath}" alt="Upgrade Image"></div>
            <div class="titleProgressContainer">
            <h3 class="cardTitle">${upgrade.title}</h3>
            <p>Progress: ${upgrade.progress} ${upgrade.maxProgress}</p>
            </div>
            </div>
            <p class="cardDescription">${upgrade.description}</p>
            
        `;
        card.addEventListener("click", () => selectUpgrade(upgrade));
        cards.appendChild(card);
    });
    global.IsupgradeSceneActive = true;
}

function getRandompgrades(count){
    const shuffled = upgrades.sort(() => 0.5 - Math.random());
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

export { displayUpgradeCards }