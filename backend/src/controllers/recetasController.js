const { Receta, Categoria, Ingrediente, IngredienteReceta } = require('../models')

const getAllRecetas = async (req, res) => {
  try {
    const recetas = await Receta.findAll({
      include: [
        {
          model: Categoria,
          as: 'Categoria'
        },
        {
          model: Ingrediente,
          as: 'Ingredientes',
          through: {
            attributes: ['cantidad']
          }
        }
      ],
      order: [['nombre', 'ASC']]
    })
    res.json(recetas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getRecetaById = async (req, res) => {
  try {
    const { id } = req.params
    const receta = await Receta.findByPk(id, {
      include: [
        {
          model: Categoria,
          as: 'Categoria'
        },
        {
          model: Ingrediente,
          as: 'Ingredientes',
          through: {
            attributes: ['cantidad']
          }
        }
      ]
    })
    
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' })
    }
    
    res.json(receta)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createReceta = async (req, res) => {
  try {
    const { nombre, descripcion, id_categoria, tiempo_preparacion, dificultad, ingredientes } = req.body
    
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' })
    }
    
    const receta = await Receta.create({
      nombre,
      descripcion,
      id_categoria,
      tiempo_preparacion,
      dificultad
    })
    
    if (ingredientes && ingredientes.length > 0) {
      const ingredientesData = ingredientes.map(ing => ({
        id_ingrediente: ing.id_ingrediente,
        id_receta: receta.id_receta,
        cantidad: ing.cantidad
      }))
      
      await IngredienteReceta.bulkCreate(ingredientesData)
    }
    
    const recetaCompleta = await Receta.findByPk(receta.id_receta, {
      include: [
        {
          model: Categoria,
          as: 'Categoria'
        },
        {
          model: Ingrediente,
          as: 'Ingredientes',
          through: {
            attributes: ['cantidad']
          }
        }
      ]
    })
    
    res.status(201).json(recetaCompleta)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateReceta = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, descripcion, id_categoria, tiempo_preparacion, dificultad, ingredientes } = req.body
    
    const receta = await Receta.findByPk(id)
    
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' })
    }
    
    await receta.update({
      nombre: nombre || receta.nombre,
      descripcion: descripcion !== undefined ? descripcion : receta.descripcion,
      id_categoria: id_categoria !== undefined ? id_categoria : receta.id_categoria,
      tiempo_preparacion: tiempo_preparacion || receta.tiempo_preparacion,
      dificultad: dificultad || receta.dificultad
    })
    
    if (ingredientes) {
      await IngredienteReceta.destroy({
        where: { id_receta: id }
      })
      
      if (ingredientes.length > 0) {
        const ingredientesData = ingredientes.map(ing => ({
          id_ingrediente: ing.id_ingrediente,
          id_receta: id,
          cantidad: ing.cantidad
        }))
        
        await IngredienteReceta.bulkCreate(ingredientesData)
      }
    }
    
    const recetaCompleta = await Receta.findByPk(id, {
      include: [
        {
          model: Categoria,
          as: 'Categoria'
        },
        {
          model: Ingrediente,
          as: 'Ingredientes',
          through: {
            attributes: ['cantidad']
          }
        }
      ]
    })
    
    res.json(recetaCompleta)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteReceta = async (req, res) => {
  try {
    const { id } = req.params
    
    const receta = await Receta.findByPk(id)
    
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' })
    }
    
    await receta.destroy()
    
    res.json({ message: 'Receta eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const buscarRecetasPorIngredientes = async (req, res) => {
  try {
    const { ingredientes } = req.body
    
    if (!ingredientes || ingredientes.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un ingrediente' })
    }
    
    const recetas = await Receta.findAll({
      include: [
        {
          model: Categoria,
          as: 'Categoria'
        },
        {
          model: Ingrediente,
          as: 'Ingredientes',
          through: {
            attributes: ['cantidad']
          }
        }
      ]
    })
    
    const recetasDisponibles = recetas.filter(receta => {
      const ingredientesReceta = receta.Ingredientes.map(ing => ing.id_ingrediente)
      return ingredientes.every(ingredienteId => ingredientesReceta.includes(ingredienteId))
    })
    
    res.json(recetasDisponibles)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta,
  buscarRecetasPorIngredientes
}
