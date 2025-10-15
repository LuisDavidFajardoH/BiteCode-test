const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const IngredienteReceta = sequelize.define('IngredienteReceta', {
  id_ingrediente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id_ingrediente'
  },
  id_receta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id_receta'
  },
  cantidad: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'Ingredientes_Recetas',
  timestamps: false
})

module.exports = IngredienteReceta
