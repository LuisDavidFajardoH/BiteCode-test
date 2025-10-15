const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Ingrediente = sequelize.define('Ingrediente', {
  id_ingrediente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_ingrediente'
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  unidad_medida: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'Ingredientes',
  timestamps: false
})

module.exports = Ingrediente
