const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Curriculo = sequelize.define('Curriculo', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  resumo: {
    type: DataTypes.TEXT
  }
});

module.exports = Curriculo;