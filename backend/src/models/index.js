const sequelize = require('../config/database')
const Categoria = require('./Categoria')
const Ingrediente = require('./Ingrediente')
const Receta = require('./Receta')
const IngredienteReceta = require('./IngredienteReceta')
const Compra = require('./Compra')

Categoria.hasMany(Receta, { 
  foreignKey: 'id_categoria',
  as: 'Recetas'
})
Receta.belongsTo(Categoria, { 
  foreignKey: 'id_categoria',
  as: 'Categoria'
})

Receta.belongsToMany(Ingrediente, {
  through: IngredienteReceta,
  foreignKey: 'id_receta',
  otherKey: 'id_ingrediente',
  as: 'Ingredientes'
})

Ingrediente.belongsToMany(Receta, {
  through: IngredienteReceta,
  foreignKey: 'id_ingrediente',
  otherKey: 'id_receta',
  as: 'Recetas'
})

Ingrediente.hasMany(Compra, { 
  foreignKey: 'id_ingrediente',
  as: 'Compras'
})
Compra.belongsTo(Ingrediente, { 
  foreignKey: 'id_ingrediente',
  as: 'Ingrediente'
})

module.exports = {
  sequelize,
  Categoria,
  Ingrediente,
  Receta,
  IngredienteReceta,
  Compra
}
