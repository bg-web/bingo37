const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
var http = require('http');
var https = require('https');
var fs = require('fs');

const app = express()
app.use(express.json());

// ssl cert
let privateKey  = fs.readFileSync('sslcert/private.key', 'utf8');
let certificate = fs.readFileSync('sslcert/certificate.crt', 'utf8');
let ca = fs.readFileSync('sslcert/ca_bundle.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate, ca: ca};

// start https server
let httpsServer = https.createServer(credentials, app);
httpsServer.listen(9999, '213.139.208.31');


/*
// ssl cert install
app.use('/.well-known', express.static('.well-known'))
const server = http.createServer(app)
server.listen(80, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
})
*/

//let db = require('./modules/db')();

app.use('/public', express.static(__dirname + '/public'))

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    times: function (n, block) { var accum = '';
    for(var i = 0; i < n; ++i)
      accum += block.fn(i);
    return accum; }
  }
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))



require('./routes')(app);
require('./api')(app);

console.log('Started');