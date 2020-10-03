// import Bingo37 class
import {Bingo37} from "./bingo37_GameClass.js";

// init game Bingo37
let game = new Bingo37("#game-container", {
  win: document.querySelector('[data-win]'),
  step: document.querySelector('[data-step]'),
  time: document.querySelector('[data-time]'),
  currentNumber: document.querySelector('[data-fell-out-current]'),
  lastNumbers: document.querySelector('[data-fell-out-last]')
});
game.load();

// update sum of bets info
game.on('clicked', function(sum) {
  document.querySelector('[data-bet]').innerHTML = sum;
})