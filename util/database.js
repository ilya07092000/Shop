const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-test', 'root', '12345678', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;