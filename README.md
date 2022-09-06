
   <h1 align ="center">Roguescape<h1>
<p align="center">
<img align="center" src="./client/src/images/game.png" width="150">
</p>
   <h2 align ="center">A roguelike dungeon crawler game built with React, Redux, and Node.js<h2>

   <h3 align ="center">Play the game <a href="https://roguescape.herokuapp.com/">here</a>!<h3>
<hr />

# Table of Contents
* [Description](#description)
* [Showcase](#showcase)
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Technologies](#technologies)
* [snippets](#snippets)
* [License](#license)
* [Contributions](#contributions)

## Description
A roguelike dungeon crawler game built with React, Redux, and Node.js. The game is a single-player game where the player must navigate through a dungeon and defeat monsters to reach the next floor. The game is built with a React frontend and a Node.js backend. The game is deployed on Heroku.



## Showcase

![showcase](./client/src/images/Roguescape.gif)
<br />

Homepage: 
![homepage](./client/src/images/homepage.png)

<br />

Login page: 
![login](./client/src/images/login.png)

## Installation
`git clone` this repository and run `npm install` to install all dependencies. Run `npm run develop` to start the Server, Client and navigate to `localhost:3001` to play the game.

## Usage
Navigate to the deployed link to play the game. Create an account on the Login page and start playing. Use the arrow keys to move around the map. Defeat monsters to gain experience and level up. Enter the pink portal to go to the next floor. The game is over when the player dies.

## Features

* User authentication
* User can create an account and login
* User can move around the map
* User can attack enemies
* User can level up
* User can spend coins to increase stats
* User can go to the next floor
* User can see their stats
* User can save their progress
* User can load their progress

## Technologies

<li>React</li>
<li>Javascript / JSX </li>
<li>Redux</li>
<li>Node.js</li>
<li>Express</li>
<li>JWT</li>
<li>MongoDB</li>
<li>Mongoose</li>
<li>nodemon</li>
<li>bcrypt</li>

[MaterialUi](https://mui.com) <br />
[tsParticles](https://particles.js.org) <br />
[lodash](https://lodash.com) <br />
[swipeable](https://www.npmjs.com/package/react-swipeable) <br />
[toastify](https://www.npmjs.com/package/react-toastify) <br />
[react-redux](https://react-redux.js.org) <br />
[rot-js](https://www.npmjs.com/package/rot-js) <br />

<br>  

## Snippets
### Player Movement
<details>
  <summary><b>Combat</b></summary>




```javascript

 case 'enemy': {
          const playerHealth = player.attributes.health;
          const playerDamage = player.attributes.damage + player.attributes.bonusDamage;
          const enemyHealth = newEntity.attributes.health;
          let enemyDamage = newEntity.attributes.damage - player.attributes.bonusArmor;
          if (enemyDamage < 0) { enemyDamage = 0; };
          dispatch({
            type: DAMAGE,
            payload: {
              entityName: newEntity.entityName,
              dmgValue: playerDamage
            }
          });
          addToLog(`Dealt ${playerDamage} damage to ${newEntity.entityName} (Current health: ${state.entities[newEntity.entityName].attributes.health})`);
          dispatch({
            type: DAMAGE,
            payload: {
              entityName: 'player',
              dmgValue: enemyDamage
            }
          });
          addToLog(`Recieved ${enemyDamage} damage from ${newEntity.entityName}`);
          // check if enemy lived
          if (enemyHealth > playerDamage) {
            // check if player died
            if (enemyDamage >= playerHealth) {
              toast.error("YOU DIED");
              reset();
              return;
            }
          } else {
            dispatch({
              type: MOVE,
              payload: {
                entity: player,
                vector: vector
              }
            });
            dispatch({
              type: REMOVE_ENTITY,
              payload: { entityName: newEntity.entityName }
            });
            const baseXP = Math.floor((5 * (state.floor) ** 2 + 5));
            const xpVariance = Math.floor(Math.random() * (baseXP / 5) - (baseXP / 10));
            dispatch({
              type: GAIN_XP,
              payload: { value: baseXP + xpVariance }
            });
            addToLog(`Gained ${baseXP + xpVariance} XP`);
            dispatch({
              type: LEVEL_UP,
              payload: {
                stats: calculateStats,
                level: calculateLevel
              }
            });
            const baseCoins = Math.floor((2 * (state.floor) ** 1.5 + 5));
            const coinVariance = Math.floor(Math.random() * (baseCoins / 5) - (baseCoins / 10));
            dispatch({
              type: GAIN_COINS,
              payload: { coins: baseCoins + coinVariance }
            });
            addToLog(`Gained ${baseCoins + coinVariance} coins`);
          }
          break;

```
### 

</details>

## License
![License](https://img.shields.io/badge/license-MIT-blue.svg)
<br>
This Project is licensed under the MIT license.

## Contributions
Yahir:[Github](https://github.com/Yahir-F) <br />
Sean:[Github](https://github.com/seannoh)







    