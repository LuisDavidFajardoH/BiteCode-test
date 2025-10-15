import { useState } from 'react'

function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([
    { id: 1, nombre: 'Tomate', unidad: 'kg' },
    { id: 2, nombre: 'Cebolla', unidad: 'unidad' },
    { id: 3, nombre: 'Ajo', unidad: 'diente' },
    { id: 4, nombre: 'Aceite de oliva', unidad: 'ml' }
  ])

  const [nuevoIngrediente, setNuevoIngrediente] = useState({ nombre: '', unidad: '' })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const agregarIngrediente = () => {
    if (nuevoIngrediente.nombre && nuevoIngrediente.unidad) {
      setIngredientes([...ingredientes, {
        id: Date.now(),
        ...nuevoIngrediente
      }])
      setNuevoIngrediente({ nombre: '', unidad: '' })
      setMostrarFormulario(false)
    }
  }

  const eliminarIngrediente = (id) => {
    setIngredientes(ingredientes.filter(ing => ing.id !== id))
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

      <div className="ingredientes-grid">
        {ingredientes.map(ingrediente => (
          <div key={ingrediente.id} className="ingrediente-card">
            <div className="card-content">
              <h3>{ingrediente.nombre}</h3>
              <p>Unidad: {ingrediente.unidad}</p>
            </div>
            <div className="card-actions">
              <button className="edit-button">Editar</button>
              <button 
                className="delete-button"
                onClick={() => eliminarIngrediente(ingrediente.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ingredientes
