const express = require('express')
const cors = require('cors')
require('dotenv').config()

const sequelize = require('./config/database')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'API del Recetario de Cocina funcionando' })
})

app.use('/api/ingredientes', require('./routes/ingredientes'))
app.use('/api/recetas', require('./routes/recetas'))
app.use('/api/categorias', require('./routes/categorias'))
app.use('/api/compras', require('./routes/compras'))

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexión a la base de datos establecida correctamente')
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
    })
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error)
  }
}

startServer()

module.exports = app
