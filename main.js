//Run game here

const d1 = new Dice();
const d2 = new Dice();
const d3 = new Dice();
const d4 = new Dice();

let game = new Game(d1, d2, d3, d4);
game.setMaxRolls();
game.setCurrentRoll();
game.startRound();
