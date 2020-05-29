const express = require('express');
const cors = require('cors');
const listaRutas = require('express-list-endpoints');

const path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync(path.join(__dirname, 'sslcert/privkey.pem'), 'utf8');

var certificate = fs.readFileSync(path.join(__dirname, 'sslcert/cert.pem'), 'utf8');

var credentials = {key: privateKey, cert: certificate};

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));

const routes = require('./routes/index');

app.use(routes);


// app.listen('3000', () =>{
//     console.log(listaRutas(app));
//     console.log('Server on port 3000');
// })

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);