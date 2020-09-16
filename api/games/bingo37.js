/**
* Bingo37 backend
* @module
*/
module.exports = function (app, io) {
    /**
    * SOCKET IO is waiting for connection with frontend
    * @function "socket on conntection"
    * @returns {void}
    */
    io.of('/bingo37').on('connection', function(socket) {
        /**
        * This function generate random number between min and max
        * @function between
        * @returns {void}
        */
    	function between(min, max) {  
		  return Math.floor(
		    Math.random() * (max - min) + min
		  )
		}
    	/**
		* SOCKET IO is waiting for sending bets from frontend
		* @function "socket on send bets"
		* @returns {void}
    	*/
    	socket.on('send bets', (data) => {
    		console.log('It is new bets', data);
    		socket.emit('get results', {number: between(1, 36), win: "200"})
    	})
    })
};