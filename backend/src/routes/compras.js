const express = require('express')
const router = express.Router()
const {
  getAllCompras,
  getCompraById,
  createCompra,
  updateCompra,
  deleteCompra,
  getTotalGastado
} = require('../controllers/comprasController')

router.get('/', getAllCompras)
router.get('/total', getTotalGastado)
router.get('/:id', getCompraById)
router.post('/', createCompra)
router.put('/:id', updateCompra)
router.delete('/:id', deleteCompra)

module.exports = router
