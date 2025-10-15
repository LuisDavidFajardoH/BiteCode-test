const express = require('express')
const router = express.Router()
const {
  getAllIngredientes,
  getIngredienteById,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente
} = require('../controllers/ingredientesController')

router.get('/', getAllIngredientes)
router.get('/:id', getIngredienteById)
router.post('/', createIngrediente)
router.put('/:id', updateIngrediente)
router.delete('/:id', deleteIngrediente)

module.exports = router
