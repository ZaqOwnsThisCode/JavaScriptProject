/* TODO

Dice Obj: 
-set dices value with Math.floor(Math.random() * 6) + 1 for random num from 1 to 6
-dice image
 */

const dicePath = `images/dice-six-faces-`;
const randNum1to6 = Math.floor(Math.random() * 6) + 1;

class Dice {
  constructor() {
    this.sideValue = randNum1to6;
  }

  rollDice() {
    let num = Math.floor(Math.random() * 6) + 1;
    this.imagePath = `${dicePath}${num}.png`;
    this.sideValue = num;
    return this.imagePath;
  }
}
