//Importa o pacote do express
const express = require('express');
const routesPerfumes = require('./route/rotaPerfume')
const routesCliente = require('./route/rotaCliente')

//Torna os express executável
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Torna as rotas executável
app.use('/', routesPerfumes);
app.use('/', routesCliente);

// Cria um webserver para receber as requisições em HTTP
app.listen(3000, ()=>{
    console.log('SERVIDOR - http://localhost:3000');
});