module.exports = function (app) {
    app.get('/bingo37', (request, response) => {
        console.log('bingo37');
        response.render('bingo37',{layout: 'main', page_title: 'Bingo37'});
    })
};