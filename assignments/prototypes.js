/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.
  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  
  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
function GameObject (obj)
{
  this.createdAt = obj.createdAt;
  this.myName = obj.name;
  this.dimensions = obj.dimensions;
  "use strict";
  
  this.destroy = function ()
  {
    return `\n ${this.myName} has Been Slain!`
  }
  return this;
}
/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
CharacterStats.prototype = Object.create(GameObject);
function CharacterStats(obj)
{
  GameObject.call(this, obj);
  this.healthPoints = obj.healthPoints;
  
  this.takeDamage = function(dam)
  {
    this.healthPoints -= dam;
    return `Hit: ${Math.floor(dam*100)/100} pts` + (this.healthPoints <= 0 ? this.destroy() : "");
  }
  this.destroy = function() 
  {
    this.takeDamage = function(dam){return `${this.myName} is dead. Don't beat a dead horse.`}
    return `\n ${this.myName} has Been Slain!`;
  }
  return this;
}


/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
 
/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:

Humanoid.prototype = Object.create(CharacterStats);
function Humanoid(obj)
{
  CharacterStats.call(this, obj);
  this.team = obj.team;
  this.weapons = obj.weapons;
  this.language = obj.language;
  this.greet = function()
  {
    return `<div class="greeting">${this.myName} offers a greeting in ${this.language}.</div>`
  };
  this.attack = function(weaponslot, victum)
  {
    if(victum.name !== "CharacterStats") { return `${this.myName} didnt know who to attack?`}; 
    //if(typeof this.weapons !== "array") return `${this.myName} has no weapon! ${this.weapons}`; //weapon undefined
    let wep = this.weapons[weaponslot < this.weapons.length ? weaponslot : 0]
    if(!wep) return `${this.name} has no weapon! ${wep}`; //weapon undefined
    if(wep.damage.length < 2) return  `${this.myName}'s '${wep.name}' is damaged. ${wep.damage.length}`;
    return `<div>${this.myName} uses ${wep.name} on ${victum.myName}!</div><div>${victum.takeDamage(parseFloat((Math.random()*wep.damage[1]) + wep.damage[0]))}</div>`;
  };
  this.destroy = function()
  {
    this.greet = function(){return `${this.myName} is dead! Deadmen tell not tales.`}
    this.takeDamage = function(dam){return `${this.myName} is dead. Don't beat a dead horse.`; this.healthPoints=0;}
    this.attack = function(){return `${this.myName} is dead and cannot attack.`;};
    this.healthPoints=0;
    return `<div>${this.myName} has Been Slain!</div>`;//couldnt call the parent function
  }
  return this;
}



var HomelessMan = new Humanoid({
  createdAt : "10",
  name : "Vilage Idiot",
  demensions : {width: 1, height: 2, depht:3},
  healthPoints : 100,
  team : "Evil",
  weapons : [{name : "Some Bath Salts", damage : [0,7]}, {name : "Old Box", damage : [3,6]},{name : "Shopping Cart", damage : [0,10]}],
  language : "Bat-Shit Crazy"
});

var GrandpaMoses = new Humanoid({
  createdAt : "10",
  name : "Grandpa Moses",
  demensions : {width: 1, height: 2, depht:3},
  healthPoints : 75,
  team : "Good",
  weapons : [{name : "Old Boring Stoy", damage : [0,10]}, {name : "Cane", damage : [3,8]},{name : "False Teeth", damage : [0,15]}],
  language : "Grampa"
});



function start(){
  document.write('<link rel="stylesheet" href="index.css"></link>');
  document.write(`<div class=head-container><h1>${HomelessMan.myName}</h1><h1>${GrandpaMoses.myName}</h1> </div>`)
  document.write(`<div class="greeting-container">${HomelessMan.greet()}  ${GrandpaMoses.greet()}</div>
  <div class="stats">
  <div class="stat-item"><p>Health: ${HomelessMan.healthPoints}</p><p>Health: ${GrandpaMoses.healthPoints}</p></div>
  <div class="stat-item"><p>Team: ${HomelessMan.team}</p><p>Team: ${GrandpaMoses.team}</p></div>
  </div> 
  `);
  function remove(name)
  {
    let a = document.getElementsByClassName(name);
    for(let j = 0; j < a.length; j++)
    {
      a[j].parentNode.removeChild(a[j]);
    }
  }
  function move() 
  {
    remove('Move-container');
    document.write(`
    <div class='Move-container'>
    <div class="stats">
    <div class="stat-item"><p>Health: ${Math.floor(HomelessMan.healthPoints*100)/100}</p><p>Health: ${Math.floor(GrandpaMoses.healthPoints*100)/100}</p></div>
    <div class="stat-item"><p>Team: ${HomelessMan.team}</p><p>Team: ${GrandpaMoses.team}</p></div>
    </div> 
    <div class="horizontal-line"></div>
    <div class="attack-container"><div class="attack">${HomelessMan.attack(Math.floor(Math.random()*HomelessMan.weapons.length),GrandpaMoses)}</div> <div class="attack">${GrandpaMoses.attack(Math.floor(Math.random()*GrandpaMoses.weapons.length),HomelessMan)}</div></div>
    </div>
    
    </div>`);
    setTimeout(move, 2000);
  }
  setTimeout(move, 2000);
  setTimeout(remove, 1999, 'greeting-container');
  setTimeout(remove, 1999, 'stats');
}



  /* const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Tongue',
  });
  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Tongue',
  });
  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });
  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.myName); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage(1)); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.
 */
  // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!