const Sequelize = require('sequelize');

//////Configuranco conexão no banco de dados\\\\\\\\\\

const sequelize = new Sequelize('postapp', 'root', '123rvs', {
    host: 'localhost',
    dialect: 'mysql'
});

//// Logs da conexão do Banco de dados \\\\\\\\

sequelize.authenticate().then(function () {
console.log('Conexão realizada com sucesso');
}).catch(function (err) {
console.log('Erro ao realizar a conexão com BD: ' + err);
});



module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}