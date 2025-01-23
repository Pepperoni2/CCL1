13.01.2025: 
Added canvas, added playerObject, and smooth movement
implemented baseGameObject
Tomorrow: enemies, projectiles

14.01.2025:
Added projectiles, enemyObjects and chase Player behaviour,
EnemySpawner implemented
EXP points added, when enemy is killed

Tomorrow: leveling system, basic UI, passive stat upgrades

15.01.2025
Basic level up system
exp-object has been added, can only be collected by the player. exp = 2, can be changed in the expobject class, should be later made dynamically.

Bandaid fix in global in checkCollisionWithAnyOther
to avoid enemy "colliding" with ExpObjects
Experience Bar, Timer added
experienceBar styled, and timer implemented,

global.gameOver function added
Game Over screen implemented
added GameOver screen

and canceledAnimationFrame
added animationFrameId

Tomorrow: startScreen, upgrade cards, gameloop optimiziation

16.01.2025
adjusted experience bar
added visual reset for expbar when Restarting the game

New Font, actionPause, upgrade
added asset folder, upgradeManager.js
added some basic styling for the upgradeMenu

added new flag for pausing game in global

Update main.js
global.updateUI() runs even after game is in upgradeScreen
resetting Upgrade progress
resetting upgrade progress when gameOver

17.01.2025
tweaked Upgrades
upgrades now disappear, when progress has been exceded
upgrade menu styling
added blocks to represent upgrade progress

implemented upgrades
upgrades now affect the player stats

starting to implement new weapons
added weapons object array
implemented upgrade path for pistol

18.01.2025
Implemented electric field weapon, damage numbers
dynamic enemy scaling, upgrademenu styling, remade timer;

19.01.2025
adjusted enemy scaling and spawn rate
added new sprites and loading sprites into game


21.01.2025
added circular hit detection to the electric field
balancing enemy stats, added some new backgrounds and music
new phase 4 enemy added
Tomorrow: add new upgrades, start to draw playable character

22.01.2025:
game balancing, implemented character sprite, added new collectable (the magnet)
planning to add one last collectable (the medkit)
Tomorrow: add basic sounds and title screen for the final touch

23.01.2025
added healthkit, added basic soundeffects title screen added, and adjusted late game enemy scaling
 
