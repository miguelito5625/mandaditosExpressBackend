const express = require('express');
const cors = require('cors');
const listaRutas = require('express-list-endpoints');


const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));

const routes = require('./routes/index');

app.use(routes);


app.listen('3000', () =>{
    console.log(listaRutas(app));
    console.log('Server on port 3000');
})