//Importa o pacote do sequelize
const  Sequelize  = require('sequelize');

//IMPORTAÇÃO DO ARQUIVO DE CONEXÃO COM O BANCO DE DADOS
const connection = require('../database/database');

// Tabelas
const modelPerfume = connection.define(
    'tbl_Perfumes',
    {
        cod_perfume:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nome_perfume:{
            type: Sequelize.STRING(80),
            
        },
        preco_perfume:{
            type: Sequelize.STRING(10),
           
        },
        marca_perfume:{
            type: Sequelize.STRING(45),
            
        },
        modelo_perfume:{
            type: Sequelize.STRING(100),
            
        }
    }
)

//modelPerfume.sync({force:true});

module.exports = modelPerfume;