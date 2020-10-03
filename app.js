const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const http = require('http');
const https = require('https');
const fs = require('fs');
//const socketIoSessions = require("socket-io.sessions");

//bingoAdmin
//WXvqJm5P7QpQgaz8



//const uri = "mongodb+srv://bingoAdmin:WXvqJm5P7QpQgaz8@cluster0.vbegg.mongodb.net/test?retryWrites=true&w=majority";
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://bingoAdmin:WXvqJm5P7QpQgaz8@cluster0.vbegg.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
     useUnifiedTopology: true
  });

async function run() {
  try {
    await client.connect();

    //const database = client.db('sample_airbnb');
    db = client.db('sample_airbnb');
    //await db.myNewCollection2.insertOne( { x: 1 } )
    db.collection('products').insertOne({ item: "card", qty: 15 }, function(error, doc) {
        if(error) {
           console.log(error);
        } else {
           console.log('success');
        }
    }); 
    console.log('good');
    //const collection = database.collection('listingsAndReviews');

    // Query for a movie that has the title 'Back to the Future'
   /* const query = { beds: 5 };
    const movie = await collection.find(query);
    await movie.forEach(doc => console.log(doc.name));*/

    //console.log(movie);
  } finally {
  }
}
run().catch(console.dir);




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



const redis = require('redis')
 
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()


let session_redis_store = new RedisStore({ client: redisClient });


const sessionMiddleware = session({ 
  store: session_redis_store,
  secret: 'QqvEmHZybdss432hCbP84MK2nsdaoNeH3prdso',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 14 * 24 * 60 * 60 * 1000 }});

app.use(sessionMiddleware);



// connect socket.io
var io = require('socket.io')(httpsServer);

// register middleware in Socket.IO
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});






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

app.use('/public', express.static(__dirname + '/public'))
app.use('/out', express.static(__dirname + '/out'))

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
require('./api')(app, io);

console.log('Started');