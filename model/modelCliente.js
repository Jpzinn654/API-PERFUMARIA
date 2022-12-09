//Importa o pacote do sequelize
const  Sequelize  = require('sequelize');

//IMPORTAÇÃO DO ARQUIVO DE CONEXÃO COM O BANCO DE DADOS
const connection = require('../database/database');

// Tabelas
const modelCliente = connection.define(
    'tbl_clientes',
    {
        cod_cliente:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nome_cliente:{
            type: Sequelize.STRING(80),
            allowNull: false
        },
        cpf_cliente:{
            type: Sequelize.STRING(12),
            allowNull: false
        },
        data_cliente:{
            type: Sequelize.DATE(6),
            allowNull: false
        },
        email_cliente:{
            type: Sequelize.STRING(80),
            allowNull: false
        }
    }
)

//modelCliente.sync({force:true});


module.exports = modelCliente;