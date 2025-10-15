const express = require('express')
const router = express.Router()
const {
  getAllRecetas,
  getRecetaById,
  createReceta,
  updateReceta,
  deleteReceta,
  buscarRecetasPorIngredientes
} = require('../controllers/recetasController')

router.get('/', getAllRecetas)
router.get('/:id', getRecetaById)
router.post('/', createReceta)
router.put('/:id', updateReceta)
router.delete('/:id', deleteReceta)
router.post('/buscar', buscarRecetasPorIngredientes)

module.exports = router
