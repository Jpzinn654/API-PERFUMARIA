//Importa diretamente o sequelize
const Sequelize = require('sequelize');

/*  CRIA A CONEXÃO CON O BANCO DE DADOS
Linha nº 10 = Nome do banco
Linha nº 11 = Usuario do banco
Linha nº 12 = Senha do banco
*/
const connection = new Sequelize(
    'bd_perfumaria_api2', 
    'root',
    '',
    {
        host:'localhost',
        dialect:'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;