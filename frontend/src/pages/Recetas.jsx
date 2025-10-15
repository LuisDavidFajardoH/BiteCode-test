import { useState } from 'react'

function Recetas() {
  const [recetas, setRecetas] = useState([
    { 
      id: 1, 
      nombre: 'Pasta con Salsa de Tomate', 
      descripcion: 'Deliciosa pasta con salsa casera de tomate',
      categoria: 'Italiana',
      tiempo: '30 min'
    },
    { 
      id: 2, 
      nombre: 'Ensalada César', 
      descripcion: 'Ensalada fresca con aderezo césar casero',
      categoria: 'Ensaladas',
      tiempo: '15 min'
    }
  ])

  const [nuevaReceta, setNuevaReceta] = useState({ 
    nombre: '', 
    descripcion: '', 
    categoria: '', 
    tiempo: '' 
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const agregarReceta = () => {
    if (nuevaReceta.nombre && nuevaReceta.descripcion) {
      setRecetas([...recetas, {
        id: Date.now(),
        ...nuevaReceta
      }])
      setNuevaReceta({ nombre: '', descripcion: '', categoria: '', tiempo: '' })
      setMostrarFormulario(false)
    }
  }

  const eliminarReceta = (id) => {
    setRecetas(recetas.filter(rec => rec.id !== id))
  }

  return (
    <div className="recetas-page">
      <div className="page-header">
        <h1 className="page-title">Gestionar Recetas</h1>
        <p className="page-description">
          Crea, edita y elimina recetas con sus ingredientes y cantidades
        </p>
        <button 
          className="add-button blue"
          onClick={() => setMostrarFormulario(true)}
        >
          + Nueva Receta
        </button>
      </div>

      {mostrarFormulario && (
        <div className="form-modal">
          <div className="form-container">
            <h3>Nueva Receta</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre de la receta"
                value={nuevaReceta.nombre}
                onChange={(e) => setNuevaReceta({...nuevaReceta, nombre: e.target.value})}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Descripción de la receta"
                value={nuevaReceta.descripcion}
                onChange={(e) => setNuevaReceta({...nuevaReceta, descripcion: e.target.value})}
                rows="3"
              />
            </div>
            <div className="form-group">
              <select
                value={nuevaReceta.categoria}
                onChange={(e) => setNuevaReceta({...nuevaReceta, categoria: e.target.value})}
              >
                <option value="">Seleccionar categoría</option>
                <option value="Italiana">Italiana</option>
                <option value="Mexicana">Mexicana</option>
                <option value="Asiática">Asiática</option>
                <option value="Ensaladas">Ensaladas</option>
                <option value="Postres">Postres</option>
                <option value="Vegetariana">Vegetariana</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Tiempo de preparación (ej: 30 min)"
                value={nuevaReceta.tiempo}
                onChange={(e) => setNuevaReceta({...nuevaReceta, tiempo: e.target.value})}
              />
            </div>
            <div className="form-actions">
              <button className="cancel-button" onClick={() => setMostrarFormulario(false)}>
                Cancelar
              </button>
              <button className="save-button blue" onClick={agregarReceta}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="recetas-grid">
        {recetas.map(receta => (
          <div key={receta.id} className="receta-card">
            <div className="card-content">
              <h3>{receta.nombre}</h3>
              <p className="descripcion">{receta.descripcion}</p>
              <div className="receta-info">
                <span className="categoria">{receta.categoria}</span>
                <span className="tiempo">⏱️ {receta.tiempo}</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="edit-button">Editar</button>
              <button 
                className="delete-button"
                onClick={() => eliminarReceta(receta.id)}
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

export default Recetas
