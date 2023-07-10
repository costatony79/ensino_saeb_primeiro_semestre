const Sequelize = require("sequelize");
//conexão com o banco de dados do mysql
const connection = new Sequelize("respostas_saeb", "aluno", "aluno", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
