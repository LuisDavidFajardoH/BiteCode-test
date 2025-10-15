const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Compra = sequelize.define('Compra', {
  id_compra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_compra'
  },
  id_ingrediente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'id_ingrediente'
  },
  fecha_compra: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
}, {
  tableName: 'Compras',
  timestamps: false
})

module.exports = Compra
