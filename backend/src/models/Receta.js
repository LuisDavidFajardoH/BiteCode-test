const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Receta = sequelize.define('Receta', {
  id_receta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_receta'
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'id_categoria'
  },
  tiempo_preparacion: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  dificultad: {
    type: DataTypes.ENUM('Fácil', 'Medio', 'Difícil'),
    defaultValue: 'Fácil'
  }
}, {
  tableName: 'Recetas',
  timestamps: false
})

module.exports = Receta
