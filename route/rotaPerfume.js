//Importa o pacote do express
const express = require('express');

// Importa as tabelas do Model Perfume
const modelPerfume = require('../model/modelPerfume');

/*GERENCIADOR DE ROTAS DO EXPRESS*/
const router = express.Router();

//Rota para cadastrar perfume
router.post('/cadastrarPerfume', (req, res)=>{
    console.log(req.body);
    let {nome_perfume,preco_perfume,marca_perfume,modelo_perfume} = req.body;
    modelPerfume.create(
        // Dados de inserção
        {nome_perfume,preco_perfume,marca_perfume,modelo_perfume}
    ).then(
        ()=>{
            return res.status(201).json({
                erroStatus:false,
                mensagemStatus:"PERFUME INSERIDO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO CADASTRAR O PERFUME.",
                errorObject:error
            });
        }
    );
})

//Rota para listar perfumes
router.get('/listarPerfume', (req, res)=>{

    // Código necessário para resposta no postman na hora de listar o Perfume
    modelPerfume.findAll()
        .then(
            (response)=>{
                //console.log(response);
                return res.status(200).json({
                    erroStatus:false,
                    mensagemStatus:"TODOS OS PERUFMES LISTADOS COM SUCESSO.",
                    data:response
                })
            }
        ).catch(
            (error)=>{
                return res.status(400).json({
                    erroStatus:true,
                    mensagemStatus:"ERRO AO LISTAR OS PERFUMES.",
                    errorObject:error
                });
            }
        );
})

router.get('/listarPerfumePK/:cod_perfume', (req, res)=>{

    let {cod_perfume} = req.params;

    //AÇÃO DE SELEÇÃO DE DADOS DO SEQUELIZE
    modelPerfume.findByPk(cod_perfume)
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"PERFUME RECUPERADO COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO RECUPERAR O PERFUME.",
                errorObject:error
            });
        }
    )

});

// Rota para listar perfume por nome
router.get('/listarPerfumeNOME/:nome_perfume', (req, res)=>{

    let {nome_perfume} = req.params;

    modelPerfume.findOne({attributes:['nome_perfume','preco_perfume','marca_perfume','modelo_perfume'],
    where:{nome_perfume}})
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"PERFUMES LISTADO PELO NOME COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO LISTAR PERFUMES.",
                errorObject:error
            });
        }
    )

});

// Rota para listar perfumes por marca
router.get('/listarPerfumeMARCA/:marca_perfume', (req, res)=>{

    let {marca_perfume} = req.params;

    modelPerfume.findOne({attributes:['nome_perfume','preco_perfume','marca_perfume','modelo_perfume'],where:{marca_perfume}})
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"MARCAS DE PERFUMES LISTADAS COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO LISTAR AS MARCAS DE PERFUMES.",
                errorObject:error
            });
        }
    )

});

//Rota para alterar perfumes
router.put('/alterarPerfume', (req, res)=>{

    const {cod_perfume, nome_perfume} = req.body;

    modelPerfume.update(
        {nome_perfume},
        {where:{cod_perfume}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"PERFUME ALTERADO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO ALTERAR O PERFUME.",
                errorObject:error
            });
        }
    );
})

//Rota para deletar perfumes
router.delete('/deletarPerfume/:cod_perfume', (req, res)=>{
    
    // Declarar e receber o dado do código de clientes
    console.log(req.params);

    let {cod_perfume} = req.params

    modelPerfume.destroy(
        {where:{cod_perfume}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"PERFUME EXCLUIDO DA LISTA COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO EXCLUIR O PERFUME.",
                errorObject:error
            });
        }
    );
})


module.exports = router;
