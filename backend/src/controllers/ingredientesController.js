const { Ingrediente } = require('../models')

const getAllIngredientes = async (req, res) => {
  try {
    const ingredientes = await Ingrediente.findAll({
      order: [['nombre', 'ASC']]
    })
    res.json(ingredientes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getIngredienteById = async (req, res) => {
  try {
    const { id } = req.params
    const ingrediente = await Ingrediente.findByPk(id)
    
    if (!ingrediente) {
      return res.status(404).json({ error: 'Ingrediente no encontrado' })
    }
    
    res.json(ingrediente)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createIngrediente = async (req, res) => {
  try {
    const { nombre, unidad_medida } = req.body
    
    if (!nombre || !unidad_medida) {
      return res.status(400).json({ error: 'Nombre y unidad de medida son requeridos' })
    }
    
    const ingrediente = await Ingrediente.create({
      nombre,
      unidad_medida
    })
    
    res.status(201).json(ingrediente)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Ya existe un ingrediente con ese nombre' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
}

const updateIngrediente = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, unidad_medida } = req.body
    
    const ingrediente = await Ingrediente.findByPk(id)
    
    if (!ingrediente) {
      return res.status(404).json({ error: 'Ingrediente no encontrado' })
    }
    
    await ingrediente.update({
      nombre: nombre || ingrediente.nombre,
      unidad_medida: unidad_medida || ingrediente.unidad_medida
    })
    
    res.json(ingrediente)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Ya existe un ingrediente con ese nombre' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
}

const deleteIngrediente = async (req, res) => {
  try {
    const { id } = req.params
    
    const ingrediente = await Ingrediente.findByPk(id)
    
    if (!ingrediente) {
      return res.status(404).json({ error: 'Ingrediente no encontrado' })
    }
    
    await ingrediente.destroy()
    
    res.json({ message: 'Ingrediente eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllIngredientes,
  getIngredienteById,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente
}
