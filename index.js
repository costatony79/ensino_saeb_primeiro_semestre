const express = require("express");
const app = express();
const notifier = require('node-notifier');

//definição do bodyParser
const bodyParser = require("body-parser");

//conexão com o banco de dados
const connection = require("./database/database");

//model do BD para receber as respostas do gabarito do D4 de LP
const Lpd4 = require("./database/Lpd4");

//model do BD para receber as respostas do gabarito do D6 de LP
const Lpd6 = require("./database/Lpd6");

//model do BD para receber as respostas do gabarito do D1 de Matemática
const Md1 = require("./database/Md1");

//model do BD para receber as respostas do gabarito do D5 de LP
const Lpd5 = require("./database/Lpd5");

//model do BD para receber as respostas do gabarito do D9 de LP
const Lpd9 = require("./database/Lpd9");

//model do BD para receber as respostas do gabarito do D9 de LP
const Md13 = require("./database/Md13");

//model do BD para receber as respostas do gabarito do D9 de LP
const Md14 = require("./database/Md14");

//model do BD para receber as respostas do gabarito do D2 de LP
const Lpd2 = require("./database/Lpd2");

//model do BD para receber as respostas do gabarito do D2 de LP
const Md15 = require("./database/Md15");

//model do BD para receber as respostas do gabarito do D7 de LP
const Lpd7 = require("./database/Lpd7");

//model do BD para receber as respostas do gabarito do D7 de Matemática
const Md16 = require("./database/Md16");

//model do BD para receber as respostas do gabarito do D7 de Matemática
const Md17 = require("./database/Md17");

//model do BD para receber as respostas do gabarito do D13 de LP
const Lpd13 = require("./database/Lpd13");

//model do BD para receber as respostas do gabarito do D14 de LP
const Lpd14 = require("./database/Lpd14");

//Conexão com o banco de dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco ensino_saeb realizada.");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//definição do view engine
app.set("view engine", "ejs");

//definição da pasta public para css, js e img
app.use(express.static("public"));

//configuração do bodyParser - serve para trabalhar com os formulários
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//rota para a página inicial
app.get("/", (req, res) => {
    res.render("index");
});

//rota para exibição da página com os gabaritos
app.get("/gabaritos", (req, res) => {
    var total = 0;
    var lpdescritor2, matdescritor15, lpdescritor7, matdescritor16, matdescritor17 ;
    Lpd14.findAll({order: [['nome', 'ASC']]}).then(lpd14 => {
        lpdescritor14 = lpd14;
    });
    Lpd13.findAll({order: [['nome', 'ASC']]}).then(lpd13 => {
        lpdescritor13 = lpd13;
    });
    Md17.findAll({order: [['nome', 'ASC']]}).then(md17 => {
        matdescritor17 = md17;
    });
    Md16.findAll({order: [['nome', 'ASC']]}).then(md16 => {
        matdescritor16 = md16;
    });
    Lpd2.findAll({order: [['nome', 'ASC']]}).then(lpd2 => {
        lpdescritor2 = lpd2;
    });
    Lpd7.findAll({order: [['nome', 'ASC']]}).then(lpd7 => {
        lpdescritor7 = lpd7;
    });
    Md15.findAll({order: [['nome', 'ASC']]}).then(md15 => {
        matdescritor15 = md15;
    });
    Md14.findAll({order: [['nome', 'ASC']]}).then(md14 => {
        Md13.findAll({order: [['nome', 'ASC']]}).then(md13 => {
            Lpd9.findAll({order: [['nome', 'ASC']]}).then(lpd9 => {
                Lpd5.findAll({order: [['nome', 'ASC']]}).then(lpd5 => {
                    Md1.findAll({order: [['nome', 'ASC']]}).then(md1 => {
                        Lpd6.findAll({order: [['nome', 'ASC']]}).then(lpd6 => {
                            Lpd4.findAll({order: [['nome', 'ASC']]}).then(lpd4 => {
                                res.render("gabaritos", {lpd4: lpd4, total: total, lpd6: lpd6, 
                                    md1: md1, 
                                    lpd5: lpd5,
                                    lpd9: lpd9,
                                    md13: md13,
                                    md14: md14,
                                    lpd2: lpdescritor2,
                                    md15: matdescritor15,
                                    lpd7: lpdescritor7,
                                    md16: matdescritor16,
                                    md17: matdescritor17,
                                    lpd13:lpdescritor13,
                                    lpd14: lpdescritor14
                                });
                            });
                        });
                        
                    });
                });
            });
        });
    });
});


//rota para a página do Descritor 4 de Língua Portuguesa
app.get("/lpd4", (req, res) => {
    res.render("lpd4");
});

//rota para envio do gabarito de LPD4
app.post("/gabarito_lpd4", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/lpd4");
    }else {
        Lpd4.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.redirect("/");
        });
    }
});

//rota para criação e envio do gabarito de LPD6
app.post("/gabarito_lpd6", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/lpd6");
    }else {
        Lpd6.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.redirect("/");
        });
    }
});

//rota para envio e criação do gabarito de MD1
app.post("/gabarito_md1", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/md1");
    }else {
        Md1.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.redirect("/");
        });
    }
});
//rota para envio e criação do gabarito de LPD5
app.post("/gabarito_lpd5", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/lpd5");
    }else {
        Lpd5.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.redirect("/");
        });
    }
});
//rota para envio e criação do gabarito de LPD9
app.post("/gabarito_lpd9", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/lpd9");
    }else {
        Lpd9.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.redirect("/");
        });
    }
});
//rota para a página do descritor 6 de Língua Portuguesa
app.get("/lpd6", (req, res) => {
    res.render("lpd6");
});

//rota para a página do descritor 5 de Língua Portuguesa
app.get("/lpd5", (req, res) => {
    res.render("lpd5");
});

//rota para a página do descritor 1 de matemática
app.get("/md1", (req, res) => {
    res.render("md1");
});

//rota para a página do descritor 9 de Língua Portuguesa
app.get("/lpd9", (req, res) => {
    res.render("lpd9");
});


//rota para apagar um registro da tabela do D4 de LP
app.post("/deletarlpd4", (req, res) => {
var id = req.body.id;
if(id != undefined){
    Lpd4.destroy({
        where: {
            id: id
        }
        
    }).then(()=>{
        res.redirect("/gabaritos");
    });
}

});

//rota para apagar um registro da tabela do D1 de Matemática
app.post("/deletarmd1", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Md1.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
    });

//rota para apagar um registro da tabela do D6 de LP
app.post("/deletarlpd6", (req, res) => {
        var id = req.body.id;
        if(id != undefined){
            Lpd6.destroy({
                where: {
                    id: id
                }
                
            }).then(()=>{
                res.redirect("/gabaritos");
            });
        }
        
    });
//rota para apagar um registro da tabela do D5 de LP
app.post("/deletarlpd5", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Lpd5.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
});
//rota para apagar um registro da tabela do D9 de LP
app.post("/deletarlpd9", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Lpd9.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
});
//rota para a página do descritor 13 de matemática
app.get("/md13", (req, res) => {
    res.render("md13");
});

//rota para apagar um registro da tabela do D13 de Matemática
app.post("/deletarmd13", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Md13.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
});

//rota para envio e criação do gabarito D13 de Matemática
app.post("/gabarito_md13", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/md13");
    }else {
        Md13.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.redirect("/");
        });
    }
});

//rota para a página do descritor 14 de matemática
app.get("/md14", (req, res) => {
    res.render("md14");
});

//rota para apagar um registro da tabela do D14 de Matemática
app.post("/deletarmd14", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Md14.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
});

//rota para envio e criação do gabarito D13 de Matemática
app.post("/gabarito_md14", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/md14");
    }else {
        Md14.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.redirect("/");
        });
    }
});

//rota para a página do descritor 2 de língua portuguesa
app.get("/lpd2", (req, res) => {
    res.render("lpd2");   
});

//rota para apagar um registro da tabela do D2 de LÍNGUA PORTUGUESA
app.post("/deletarlpd2", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Lpd2.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
});

//rota para envio e criação do gabarito D2 de Língua Portuguesa
app.post("/gabarito_lpd2", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/lpd2");
    }else {
        Lpd2.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.redirect("/");
        });
    }
});

//rota para a página do descritor 15 de Matemática
app.get("/md15", (req, res) => {
    res.render("md15");   
});
//rota para apagar um registro da tabela do D15 de Matemática
app.post("/deletarmd15", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Md15.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
});
//rota para envio e criação do gabarito D15 de Língua Matemática
app.post("/gabarito_md15", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/lpd2");
    }else {
        Md15.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
              
            res.redirect("/");
        });
    }
});

//rota para a página do descritor 7 de Língua Portuguesa
app.get("/lpd7", (req, res) => {
    res.render("lpd7");
});

//rota para apagar um registro da tabela do D15 de Matemática
app.post("/deletarlpd7", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Lpd7.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
});

//rota para envio e criação do gabarito D15 de Língua Matemática
app.post("/gabarito_lpd7", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/lpd7");
    }else {
        Lpd7.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
              
            res.redirect("/");
        });
    }
});

//rota para a página do descritor 16 de Matemática
app.get("/md16", (req, res) => {
    res.render("md16");
});

//rota para apagar um registro da tabela do D16 de Matemática
app.post("/deletarmd16", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Md16.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
});

//rota para envio e criação do gabarito D16 de Matemática
app.post("/gabarito_md16", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/md16");
    }else {
        Md16.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
              
            res.redirect("/");
        });
    }
});

//rota para a página do descritor 17 de Matemática
app.get("/md17", (req, res) => {
    res.render("md17");
});
//rota para apagar um registro da tabela do D17 de Matemática
app.post("/deletarmd17", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Md17.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
});

//rota para envio e criação do gabarito D16 de Matemática
app.post("/gabarito_md17", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/md17");
    }else {
        Md17.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
              
            res.redirect("/");
        });
    }
});

//rota para envio e criação do gabarito D13 de Língua Portuguesa
app.post("/gabarito_lpd13", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/lpd13");
    }else {
        Lpd13.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.redirect("/");
        });
    }
});

//rota para a página do descritor 13 de Língua Portuguesa
app.get("/lpd13", (req, res) => {
    res.render("lpd13");
});

//rota para apagar um registro da tabela do D15 de Matemática
app.post("/deletarlpd13", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Lpd13.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
});

//rota para envio e criação do gabarito D13 de Língua Portuguesa
app.post("/gabarito_lpd14", (req, res) => {
    var nome = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    if(nome==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/lpd14");
    }else {
        Lpd14.create({
            nome: nome.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.redirect("/");
        });
    }
});

//rota para a página do descritor 13 de Língua Portuguesa
app.get("/lpd14", (req, res) => {
    res.render("lpd14");
});

//rota para apagar um registro da tabela do D15 de Matemática
app.post("/deletarlpd14", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Lpd14.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/gabaritos");
        });
    }
    
});

//servidor
app.listen(8080, ()=>{
    console.log("Servidor Rodando na porta 1010");
});