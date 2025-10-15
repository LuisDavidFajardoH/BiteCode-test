const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_categoria'
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'Categorias',
  timestamps: false
})

module.exports = Categoria
