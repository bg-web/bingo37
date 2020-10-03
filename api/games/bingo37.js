/**
 * Bingo37 API G
 * @namespace Bingo37_API_G
 */
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://bingoAdmin:WXvqJm5P7QpQgaz8@cluster0.vbegg.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useUnifiedTopology: true, poolSize: 10});

const CronJob = require('cron').CronJob;

/**
* This function generate random string
* @memberof Bingo37_API_G
* @function generateRandomString
* @param {Number} length - length of string
* @returns {void}
*/
function generateRandomString(length) {
   let result = '';
   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


/**
* This function generate random number between min and max
* @memberof Bingo37_API_G
* @function between
* @param {Number} min - minimum
* @param {Number} max - maximum
* @returns {void}
*/
function between(min, max) {  
    return Math.floor(
        Math.random() * (max - min) + min
        )
}


/**
* This function calculating winning
* @memberof Bingo37_API_G
* @function calculateWinning
* @param {Array} userBets - array of objects with user bets
* @param {Number} number - the number that fell out
* @returns {void}
*/
function calculateWinning(userBets, number) {
    let coef1 = 36;
    let coef2 = 18;
    let coef3 = 9;
    let coef4 = 3;
    let coef5 = 2;

    console.log('userBets', userBets);
    let arr = userBets;

    let win = 0;

    for(let i = 0; i < arr.length; i++) {
        let bet = arr[i]["bet"];
        let money = arr[i]["money"];
        // finding the length of the "bet" array to select the desired coefficient
        let betLength = bet.length; 
        let sumMoney = 0;
        let searchNumberInBet = false;

        for (let n = 0; n < betLength; n++){
            // search in the "bet" array for a value corresponding to a randomly generated value
            if (bet[n] == number) searchNumberInBet = true;
        }

        // finding the sum of the "money" array
        for (let l = 0; l < money.length; l++) {
            sumMoney += money[l];
        }

        if (searchNumberInBet) {
            // finding the desired coefficient and finding the product of the coefficient and the win.
            if (betLength == 1) win += sumMoney*coef1;
            if (betLength == 2) win += sumMoney*coef2;
            if (betLength == 4) win += sumMoney*coef3;
            if (betLength == 12) win += sumMoney*coef4;
            if (betLength == 18) win += sumMoney*coef5;
        }
    }

    return win;
}



/**
* Bingo37 backend
* @module Bingo37_API
*/
module.exports = function (app, io) {
    client.connect((err, client)=> {
        let globalBets = [];

        /**
        * This async function write in DB
        * @function DBwrite
        * @param {String} databaseName - name of mongodb database
        * @param {String} collectionName - name of mongodb collection
        * @param {Object} insertData - insert data
        * @returns {String} inseted id
        */
        async function DBwrite(databaseName, collectionName, insertData = {}) {
            db = client.db(databaseName);
            let promise = new Promise((resolve, reject) => {
                db.collection(collectionName).insertOne(insertData, (error, doc) => {
                    if(error) console.log('ERROR DB INSERT: ', error);
                    else console.log('successfully inserted');
                    resolve(doc.ops[0]._id)
                });
            });
            let result = await promise;
            return result;
        }


        /**
        * This function update document in DB
        * @function DBupdate
        * @param {String} databaseName - name of mongodb database
        * @param {String} collectionName - name of mongodb collection
        * @param {Object} whereData - where insert
        * @param {Object} newData - what to insert
        * @returns {void}
        */
        function DBupdate(databaseName, collectionName, whereData, newData) {
            db = client.db(databaseName);
            db.collection(collectionName).findOneAndUpdate(whereData, { $set: newData}, {upsert: true}, function(error, doc) {
                if(error) console.log('ERROR DB UPDATE: ', error);
                else console.log('successfully updated');
            });
        }


        /**
        * This async function read document in DB
        * @function DBread
        * @param {String} databaseName - name of mongodb database
        * @param {String} collectionName - name of mongodb collection
        * @param {Object} query - search query
        * @param {Object} sort - sort by
        * @param {Number} limit - number of elements
        * @returns {Array} document/documents in array
        */
        async function DBread(databaseName, collectionName, query, sort = {}, limit = 1) {
            db = client.db(databaseName);
            let result;
            if(query == '') {
                result = await db.collection(collectionName).find().sort(sort).limit(limit).toArray();
            } else {
                result = await db.collection(collectionName).find(query).sort(sort).limit(limit).toArray();
            }
            return result;
        }


        let stepLimits = [
        {
            step: 0,
            stepLimit: 45
        },
        {
            step: 1,
            stepLimit: 35
        }
        ];

        let seconds, currentStep, currentRoundID;

        // get last round or start new
        DBread('jenis', 'rounds', '', {_id:-1}, 1).then(function(round) {
            console.log('round[0]', round[0]);
            if(round.length == 0){
                // no rounds yet
                seconds = 0;
                currentStep = 0;

                DBwrite('jenis', 'rounds', {step: 0}).then((insertedDocID) => {
                    currentRoundID = insertedDocID;
                });
            } else if(round[0].step == 2) {
                // last round completed
                seconds = 0;
                currentStep = 0;

                DBwrite('jenis', 'rounds', {step: 0}).then((insertedDocID) => {
                    currentRoundID = insertedDocID;
                });
                
            } else {
                // we have uncompleted round
                seconds = 0;
                currentStep = round[0].step;
                currentRoundID = round[0]._id;
            }
        })


        /*
        * It's a CRON JOB every 5 seconds
        */
        let job = new CronJob('*/5 * * * * *', function() {
            console.log('currentRoundID', currentRoundID);
            console.log('currentStep', currentStep);
            console.log('stepLimits[0].stepLimit', stepLimits[0].stepLimit);


            if(currentStep == 1 && seconds == stepLimits[1].stepLimit) {
                // RAFFLE IS COMPLETED
                let num = between(1, 36);
                DBupdate('jenis', 'rounds', {_id: currentRoundID}, {step: 2, num: num});
                io.of('/bingo37').emit('bingo37_Game raffle-is-completed', {timeLeft: stepLimits[1].stepLimit-seconds, text: "Выпало число "+num, num: num})

                // iterate through all bids
                console.log('num', num);
                DBread('jenis', 'rounds', '', {_id:-1}, 1).then(function(round) {
                    if(round[0].hasOwnProperty('bets')) {
                        for (var i = 0; i < round[0].bets.length; i++) {
                            let win = calculateWinning(round[0].bets[i].bets, num);
                            let userID = round[0].bets[i].userID;
                            DBread('jenis', 'bingo37', {userID: userID}).then(function(user) {
                                console.log('user.socketID ',user[0].socketID);
                                io.of('/bingo37').to(user[0].socketID).emit('bingo37_Game your-win', {win: win})
                            })
                            console.log('win',win);
                        }
                    }

                })

                currentStep = 2;
                seconds = -5;
            } else if(currentStep == 1 && seconds < stepLimits[1].stepLimit) {
                // RAFFLE IN PROCESS
                io.of('/bingo37').emit('bingo37_Game raffle-in-process', {timeLeft: stepLimits[1].stepLimit-seconds, text: "Идёт розыгрыш"})
            }


            if(currentStep == 0 && seconds == stepLimits[0].stepLimit) {
                // ACCEPTING BIDS IS OVER -> RAFFLE STARTS
                io.of('/bingo37').emit('bingo37_Game raffle-starts', {timeLeft: stepLimits[1].stepLimit, text: "Розыгрыш начался"})
                DBupdate('jenis', 'rounds', {_id: currentRoundID}, {step: 1});

                currentStep = 1;
                seconds = 0;
            } else if(currentStep == 0 && seconds == 0) {
                // ACCEPTING BIDS STARTED
                io.of('/bingo37').emit('bingo37_Game accepting-bids-starts', {timeLeft: stepLimits[0].stepLimit, text: "Начался приём ставок"})
            } else if(currentStep == 0 && seconds >= stepLimits[0].stepLimit-10 && seconds < stepLimits[0].stepLimit) {
                // ACCEPTING BIDS ENDS
                io.of('/bingo37').emit('bingo37_Game accepting-bids-ends', {timeLeft: stepLimits[0].stepLimit-seconds, text: "Заканчивается приём ставок"})
            } else if(currentStep == 0 && seconds < stepLimits[0].stepLimit) {
                // ACCEPTING BIDS
                io.of('/bingo37').emit('bingo37_Game accepting-bids', {timeLeft: stepLimits[0].stepLimit-seconds, text: "Приём ставок"})
            }

            if(currentStep == 2) {
                // CREATE NEW ROUND
                globalBets = [];
                DBwrite('jenis', 'rounds', {step: 0}).then((insertedDocID) => {
                    currentRoundID = insertedDocID;
                });
                currentStep = 0;
            }

            seconds += 5;
            console.log(seconds);
        },
        null,
        true,
        'America/Los_Angeles'
        );



        /**
        * SOCKET IO is waiting for connection with frontend
        * @function "socket on conntection"
        * @returns {void}
        */
        io.of('/bingo37').on('connection', function(socket) {
            const session = socket.request.session;
            let userID = session.userID;
            console.log('userID', userID);

            socket.on('setSocketId', (data) => {
                console.log('It is new socket id', data);
                if(userID) {
                    // user already have
                    DBupdate('jenis', 'bingo37', {userID: userID}, {socketID: data.socketID});
                } else {
                    // new user
                    session.userID = generateRandomString(60)
                    session.save();
                    data.userID = socket.request.session.userID;
                    DBwrite('jenis', 'bingo37', data);
                }

                DBread('jenis', 'rounds', '', {_id:-1}, 24).then(function(round) {
                    nums = [];
                    for (let i = 0; i < round.length; i++) {
                        if(round[i].num) nums.push(round[i].num);
                    }
                    io.of('/bingo37').to(data.socketID).emit('bingo37_Game fell-out-last', {nums: nums})
                });

                /*
                SEND CURRENT MOMENT OF GAME
                */
                if(currentStep == 1 && seconds < 5) {
                    // ACCEPTING BIDS IS OVER -> RAFFLE STARTS
                    io.of('/bingo37').emit('bingo37_Game raffle-starts', {timeLeft: stepLimits[1].stepLimit, text: "Розыгрыш начался"})
                } else if(currentStep == 1 && seconds < stepLimits[1].stepLimit) {
                    // RAFFLE IN PROCESS
                    io.of('/bingo37').emit('bingo37_Game raffle-in-process', {timeLeft: stepLimits[1].stepLimit-seconds, text: "Идёт розыгрыш"})
                } else if(currentStep == 0 && seconds < 5) {
                    // ACCEPTING BIDS STARTED
                    io.of('/bingo37').emit('bingo37_Game accepting-bids-starts', {timeLeft: stepLimits[0].stepLimit, text: "Начался приём ставок"})
                } else if(currentStep == 0 && seconds >= stepLimits[0].stepLimit-10 && seconds < stepLimits[0].stepLimit) {
                    // ACCEPTING BIDS ENDS
                    io.of('/bingo37').emit('bingo37_Game accepting-bids-ends', {timeLeft: stepLimits[0].stepLimit-seconds, text: "Заканчивается приём ставок"})
                } else if(currentStep == 0 && seconds < stepLimits[0].stepLimit) {
                    // ACCEPTING BIDS
                    io.of('/bingo37').emit('bingo37_Game accepting-bids', {timeLeft: stepLimits[0].stepLimit-seconds, text: "Приём ставок"})
                }
            })

            /**
        	* SOCKET IO is waiting for sending bets from frontend
        	* @function "bingo37_Game send-bets"
        	* @returns {void}
            */
            socket.on('bingo37_Game send-bets', (data) => {
                console.log('It is new bets', data);
                let session = socket.request.session;
                let userID = session.userID;

                globalBets.push({userID: userID, bets: data});
                console.log('globalBets',globalBets);
                DBupdate('jenis', 'rounds', {_id: currentRoundID}, {bets: globalBets});
            })
        })
    })
};