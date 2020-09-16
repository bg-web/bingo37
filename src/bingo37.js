//import "babel-polyfill";
import io from "socket.io-client/dist/socket.io.js"

// import Bingo37 class
import {Bingo37} from "./bingo37_GameClass.js";

// init game Bingo37
let game = new Bingo37("#game-container");
game.load();

// send button on click
send.onclick = function() {
	let socket = io('/bingo37');
	// send socket to backend with user bets
	socket.emit('send bets', game.getBets);
	// on get results socket from backend show results
	socket.on('get results', function(msg) {
		console.log(msg);
		results.innerHTML = 'Выпало число: <b>'+ msg.number +'</b><br> Ваш выигрыш: <b>'+ msg.win +'</b>';
	})
	sended.innerHTML = 'Было отправлено на сервер: <br>'+JSON.stringify(game.getBets);
}
