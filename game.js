/* TODO

Game obj: 
-Players
-Dice
-roll calc (if a 1 is rolled score == 0,
    if rolls a pair of x's then score equals (x+x)*2, 
    if not a pair or a 1 then score is the sum of the rolled numbers x+y=z)
-make dice spin = animation: rotation 2s linear;
*/

/* let $startRound = $("#buttonHolder button"); */
const roundStart = document.getElementById("roll");
const newGameButton = document.getElementById("newGameButton");

const player1ScoreThisRound = document.querySelector("#p1Score span");
const player2ScoreThisRound = document.querySelector("#p2Score span");

const player1TotalScore = document.querySelector("#p1Total p");
const player2TotalScore = document.querySelector("#p2Total p");

const player1Heading = document.querySelector("#player1 h2");
const player2Heading = document.querySelector("#player2 h2");

const player1WinLoss = document.querySelector("#p1Total, #player1");
const player2WinLoss = document.querySelector("#p2Total, #player2");

const $allDice = $(".dice");

//dice image html
const dice1 = document.getElementById("d1");
const dice2 = document.getElementById("d2");
const dice3 = document.getElementById("d3");
const dice4 = document.getElementById("d4");

let intervalId;
const intervalSeconds = 2000;

class Game {
  static maxRolls = 3;
  currentRoll = 0;

  static player1CurrentScore = 0;
  static player1Total = 0;

  static player2CurrentScore = 0;
  static player2Total = 0;

  constructor(d1, d2, d3, d4) {
    this.d1 = d1;
    this.d2 = d2;
    this.d3 = d3;
    this.d4 = d4;
  }

  //Function that Game will call to begin
  startRound() {
    this.newGame();
    roundStart.addEventListener("click", function () {
      //disable roll dice and new game
      roundStart.disabled = true;
      newGameButton.disabled = true;
      Game.currentRoll++;

      //spin the dice
      $allDice.css({
        animation: "rotation 2s linear",
      });
      //allow 2 seconds to pass before changing dice image
      setTimeout(() => {
        if (Game.currentRoll != Game.maxRolls) {
          
          let d1Image = d1.rollDice();
          dice1.src = d1Image;

          let d2Image = d2.rollDice();
          dice2.src = d2Image;

          //player 2 rolls
          let d3Image = d3.rollDice();
          dice3.src = d3Image;

          let d4Image = d4.rollDice();
          dice4.src = d4Image;
          //revert dice animation to a static image
          $allDice.css({
            animation: "",
          });
          //calc p1 score
          let d1Val = d1.sideValue;
          let d2Val = d2.sideValue;
          if (d1Val == 1 || d2Val == 1) {
            Game.player1CurrentScore = 0;
          } else if (d1Val == d2Val) {
            Game.player1CurrentScore = (d1Val + d1Val) * 2;
            Game.player1Total += Game.player1CurrentScore;
          } else {
            Game.player1CurrentScore = d1Val + d2Val;
            Game.player1Total += Game.player1CurrentScore;
          }

          player1ScoreThisRound.innerHTML = Game.player1CurrentScore;
          player1TotalScore.innerHTML = Game.player1Total;

          //calc p2 score
          let d3Val = d3.sideValue;
          let d4Val = d4.sideValue;
          if (d3Val == 1 || d4Val == 1) {
            Game.player2CurrentScore = 0;
          } else if (d3Val == d4Val) {
            Game.player2CurrentScore = (d3Val + d3Val) * 2;
            Game.player2Total += Game.player2CurrentScore;
          } else {
            Game.player2CurrentScore = d3Val + d4Val;
            Game.player2Total += Game.player2CurrentScore;
          }
          player2ScoreThisRound.innerHTML = Game.player2CurrentScore;
          player2TotalScore.innerHTML = Game.player2Total;

          //check to see if 3 rounds have been played and display outcome if true
        } else {
          roundStart.disabled = true;
          roundStart.style.display = 'none';
          if (Game.player1Total == Game.player2Total) {
            player1Heading.innerHTML = "Tie";
            player2Heading.innerHTML = "Tie";
          } else if (Game.player1Total > Game.player2Total) {
            player1Heading.innerHTML = "Player 1 wins!";
            player2Heading.innerHTML = "Player 2 loses";
          } else if (Game.player1Total < Game.player2Total) {
            player1Heading.innerHTML = "Player 1 loses";
            player2Heading.innerHTML = "Player 2 wins!";
          }
        }
        //re-enable the roll dice button and new game
        roundStart.disabled = false;
        newGameButton.disabled = false;
        
      }, intervalSeconds);
    });
  }

  //this will reset everything to default values
  newGame() {
    newGameButton.addEventListener("click", function () {
      $allDice.css({
        animation: "",
      });
      Game.player1CurrentScore = 0;
      Game.player1Total = 0;
      Game.player2CurrentScore = 0;
      Game.player2Total = 0;
      Game.currentRoll = 0;
      roundStart.style.display = 'block';
      player1Heading.innerHTML = "Player 1";
      player2Heading.innerHTML = "Player 2";
      player2ScoreThisRound.innerHTML = "";
      player2TotalScore.innerHTML = "";
      player1ScoreThisRound.innerHTML = "";
      player1TotalScore.innerHTML = "";
      roundStart.disabled = false;
      roundStart.style.opacity = 1;
    });
  }

  //I didn't want to need setters but I couldn't get passing default values to work
  setMaxRolls(num = 3) {
    Game.maxRollsPlus1 = num;
    return num;
  }

  setCurrentRoll(num = 0) {
    Game.currentRoll = num;
    return num;
  }
}
