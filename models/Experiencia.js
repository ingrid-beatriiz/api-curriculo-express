const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Curriculo = require('./Curriculo');

const Experiencia = sequelize.define('Experiencia', {
  empresa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anoInicio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  anoFim: {
    type: DataTypes.INTEGER
  }
});

Curriculo.hasMany(Experiencia, { foreignKey: 'curriculoId', as: 'experiencias' });
Experiencia.belongsTo(Curriculo, { foreignKey: 'curriculoId' });

module.exports = Experiencia;