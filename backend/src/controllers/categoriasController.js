const { Categoria } = require('../models')

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      order: [['nombre', 'ASC']]
    })
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params
    const categoria = await Categoria.findByPk(id)
    
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' })
    }
    
    res.json(categoria)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createCategoria = async (req, res) => {
  try {
    const { nombre } = req.body
    
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' })
    }
    
    const categoria = await Categoria.create({ nombre })
    
    res.status(201).json(categoria)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Ya existe una categoría con ese nombre' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
}

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre } = req.body
    
    const categoria = await Categoria.findByPk(id)
    
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' })
    }
    
    await categoria.update({ nombre })
    
    res.json(categoria)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Ya existe una categoría con ese nombre' })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
}

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params
    
    const categoria = await Categoria.findByPk(id)
    
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' })
    }
    
    await categoria.destroy()
    
    res.json({ message: 'Categoría eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
}
