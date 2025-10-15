const { Compra, Ingrediente } = require('../models')

const getAllCompras = async (req, res) => {
  try {
    const compras = await Compra.findAll({
      include: [
        {
          model: Ingrediente,
          as: 'Ingrediente'
        }
      ],
      order: [['fecha_compra', 'DESC']]
    })
    res.json(compras)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getCompraById = async (req, res) => {
  try {
    const { id } = req.params
    const compra = await Compra.findByPk(id, {
      include: [
        {
          model: Ingrediente,
          as: 'Ingrediente'
        }
      ]
    })
    
    if (!compra) {
      return res.status(404).json({ error: 'Compra no encontrada' })
    }
    
    res.json(compra)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createCompra = async (req, res) => {
  try {
    const { id_ingrediente, fecha_compra, cantidad, precio } = req.body
    
    if (!id_ingrediente || !fecha_compra || !cantidad) {
      return res.status(400).json({ error: 'Ingrediente, fecha y cantidad son requeridos' })
    }
    
    const compra = await Compra.create({
      id_ingrediente,
      fecha_compra,
      cantidad,
      precio: precio || 0
    })
    
    const compraCompleta = await Compra.findByPk(compra.id_compra, {
      include: [
        {
          model: Ingrediente,
          as: 'Ingrediente'
        }
      ]
    })
    
    res.status(201).json(compraCompleta)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateCompra = async (req, res) => {
  try {
    const { id } = req.params
    const { id_ingrediente, fecha_compra, cantidad, precio } = req.body
    
    const compra = await Compra.findByPk(id)
    
    if (!compra) {
      return res.status(404).json({ error: 'Compra no encontrada' })
    }
    
    await compra.update({
      id_ingrediente: id_ingrediente || compra.id_ingrediente,
      fecha_compra: fecha_compra || compra.fecha_compra,
      cantidad: cantidad || compra.cantidad,
      precio: precio !== undefined ? precio : compra.precio
    })
    
    const compraCompleta = await Compra.findByPk(id, {
      include: [
        {
          model: Ingrediente,
          as: 'Ingrediente'
        }
      ]
    })
    
    res.json(compraCompleta)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteCompra = async (req, res) => {
  try {
    const { id } = req.params
    
    const compra = await Compra.findByPk(id)
    
    if (!compra) {
      return res.status(404).json({ error: 'Compra no encontrada' })
    }
    
    await compra.destroy()
    
    res.json({ message: 'Compra eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getTotalGastado = async (req, res) => {
  try {
    const compras = await Compra.findAll()
    const total = compras.reduce((sum, compra) => {
      const precio = parseFloat(compra.precio) || 0
      return sum + precio
    }, 0)
    
    res.json({ total: total.toFixed(2) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllCompras,
  getCompraById,
  createCompra,
  updateCompra,
  deleteCompra,
  getTotalGastado
}
