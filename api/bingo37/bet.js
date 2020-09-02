module.exports = function (app) {
    app.get('/bingo37/api/bet', (request, response) => {
        console.log('bingo37 bet api');
        response.send({status: '3009'});
    })
};