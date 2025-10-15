import { useState, useEffect } from 'react'
import { ingredientesAPI } from '../services/api'

function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [nuevoIngrediente, setNuevoIngrediente] = useState({ nombre: '', unidad: '' })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  useEffect(() => {
    cargarIngredientes()
  }, [])

  const cargarIngredientes = async () => {
    try {
      setLoading(true)
      const response = await ingredientesAPI.getAll()
      setIngredientes(response.data)
    } catch (error) {
      console.error('Error cargando ingredientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const agregarIngrediente = async () => {
    if (nuevoIngrediente.nombre && nuevoIngrediente.unidad) {
      try {
        await ingredientesAPI.create(nuevoIngrediente)
        setNuevoIngrediente({ nombre: '', unidad: '' })
        setMostrarFormulario(false)
        cargarIngredientes()
      } catch (error) {
        console.error('Error agregando ingrediente:', error)
      }
    }
  }

  const eliminarIngrediente = async (id) => {
    try {
      await ingredientesAPI.delete(id)
      cargarIngredientes()
    } catch (error) {
      console.error('Error eliminando ingrediente:', error)
    }
  }

  return (
    <div className="ingredientes-page">
      <div className="page-header">
        <h1 className="page-title">Gestionar Ingredientes</h1>
        <p className="page-description">
          Agrega, edita y elimina ingredientes de tu despensa
        </p>
        <button 
          className="add-button"
          onClick={() => setMostrarFormulario(true)}
        >
          + Agregar Ingrediente
        </button>
      </div>

      {mostrarFormulario && (
        <div className="form-modal">
          <div className="form-container">
            <h3>Nuevo Ingrediente</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre del ingrediente"
                value={nuevoIngrediente.nombre}
                onChange={(e) => setNuevoIngrediente({...nuevoIngrediente, nombre: e.target.value})}
              />
            </div>
            <div className="form-group">
              <select
                value={nuevoIngrediente.unidad}
                onChange={(e) => setNuevoIngrediente({...nuevoIngrediente, unidad: e.target.value})}
              >
                <option value="">Seleccionar unidad</option>
                <option value="kg">Kilogramos (kg)</option>
                <option value="g">Gramos (g)</option>
                <option value="l">Litros (l)</option>
                <option value="ml">Mililitros (ml)</option>
                <option value="unidad">Unidad</option>
                <option value="taza">Taza</option>
                <option value="cucharada">Cucharada</option>
                <option value="cucharadita">Cucharadita</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="cancel-button" onClick={() => setMostrarFormulario(false)}>
                Cancelar
              </button>
              <button className="save-button" onClick={agregarIngrediente}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">
          <p>Cargando ingredientes...</p>
        </div>
      ) : (
        <div className="ingredientes-grid">
          {ingredientes.map(ingrediente => (
            <div key={ingrediente.id_ingrediente} className="ingrediente-card">
              <div className="card-content">
                <h3>{ingrediente.nombre}</h3>
                <p>Unidad: {ingrediente.unidad_medida}</p>
              </div>
              <div className="card-actions">
                <button className="edit-button">Editar</button>
                <button 
                  className="delete-button"
                  onClick={() => eliminarIngrediente(ingrediente.id_ingrediente)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Ingredientes
