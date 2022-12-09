//Importa o pacote do express
const express = require('express');
const modelCliente = require('../model/modelCliente');

// Gerenciado de rotas do express
const router = express.Router();

// Rota para cadastrar cliente
router.post('/cadastrarCliente', (req, res)=>{
    console.log(req.body);
    let {nome_cliente,email_cliente,cpf_cliente,data_cliente} = req.body;
    modelCliente.create(
        // Dados de inserção
        {nome_cliente,email_cliente,cpf_cliente,data_cliente}
    ).then(
        ()=>{
            return res.status(201).json({
                erroStatus:false,
                mensagemStatus:"CLIENTE INSERIDO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO CADASTRAR O CLIENTE.",
                errorObject:error
            });
        }
    );
})


//Rota para listar cliente
router.get('/listarCliente', (req, res)=>{

    // Código necessário para resposta no postman na hora de listar o Cliente
    modelCliente.findAll()
        .then(
            (response)=>{
                //console.log(response);
                return res.status(200).json({
                    erroStatus:false,
                    mensagemStatus:"TODOS OS CLIENTES LISTADOS COM SUCESSO.",
                    data:response
                })
            }
        ).catch(
            (error)=>{
                return res.status(400).json({
                    erroStatus:true,
                    mensagemStatus:"ERRO AO LISTAR OS CLIENTES.",
                    errorObject:error
                });
            }
        );
})

// Rota para listar cliente por nome
router.get('/listarClienteNOME/:nome_cliente', (req, res)=>{

    let {nome_cliente} = req.params;

    modelCliente.findOne({attributes:['cod_cliente', 'nome_cliente', 'cpf_cliente', 'data_cliente', 'email_cliente'],where:{nome_cliente}})
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CLIENTES LISTADO COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO LISTAR CLIENTES.",
                errorObject:error
            });
        }
    )
});

// Rota para alterar cliente
router.put('/alterarCliente', (req, res)=>{

    const {cod_Cliente, nome_Cliente} = req.body;

    modelCliente.update(
        {nome_Cliente},
        {where:{cod_Cliente}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CLIENTE ALTERADO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO ALTERAR O CLIENTE.",
                errorObject:error
            });
        }
    );
})


// Rota para deletar cliente
router.delete('/deletarCliente/:cod_Cliente', (req, res)=>{

    // Declarar e receber o dado do código de clientes
    console.log(req.params);

    let {cod_Cliente} = req.params

    modelCliente.destroy(
        {where:{cod_Cliente}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CLIENTE EXCLUIDO DA LISTA COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO EXCLUIR O CLIENTE.",
                errorObject:error
            });
        }
    );
});


// Rota de listagem de cliente por cod_Cliente
router.get('/listarClientePK/:cod_cliente', (req, res)=>{

    // Declarar e receber o dado do código de clientes
    let {cod_cliente} = req.params;

    // Ação de seleção do sql
    modelCliente.findByPk(cod_cliente)
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"CÓDIGO DE CLIENTE LISTADO COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO LISTAR O CLIENTE CATEGORIA.",
                errorObject:error
            });
        }
    )

});

module.exports = router;