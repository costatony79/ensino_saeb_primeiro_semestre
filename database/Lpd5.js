const Sequelize = require("sequelize");
const connection = require("./database");

//Criação da tabela LP Descritor 5

const Lpd5 = connection.define("lpd5", {
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    q1:{
        type: Sequelize.STRING,
        allowNull: false
    },
    q2:{
        type: Sequelize.STRING,
        allowNull: false
    },
    q3:{
        type: Sequelize.STRING,
        allowNull: false
    },
    q4:{
        type: Sequelize.STRING,
        allowNull: false
    },
    q5:{
        type: Sequelize.STRING,
        allowNull: false
    },
    q6:{
        type: Sequelize.STRING,
        allowNull: false
    },
    q7:{
        type: Sequelize.STRING,
        allowNull: false
    },
    q8:{
        type: Sequelize.STRING,
        allowNull: false
    },
    q9:{
        type: Sequelize.STRING,
        allowNull: false
    },
    q10:{
        type: Sequelize.STRING,
        allowNull: false
    }
    
});

//Não forçar cada criação caso a tabela já exista
Lpd5.sync({force: false}).then(() => {});

//Exportação da tabela para ser usada por outras
module.exports = Lpd5;