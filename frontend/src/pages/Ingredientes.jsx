import { useState, useEffect } from 'react'
import { ingredientesAPI } from '../services/api'

const styles = {
  ingredientesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
    width: '100%',
    boxSizing: 'border-box'
  },
  ingredienteCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    writingMode: 'horizontal-tb',
    textOrientation: 'mixed',
    direction: 'ltr',
    width: '100%',
    boxSizing: 'border-box'
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    writingMode: 'horizontal-tb',
    textOrientation: 'mixed',
    direction: 'ltr'
  },
  cardTitle: {
    color: '#1f2937',
    marginBottom: '0.8rem',
    fontSize: '1.1rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #1f2937, #374151)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    lineHeight: '1.3',
    display: 'block',
    writingMode: 'horizontal-tb',
    textOrientation: 'mixed',
    direction: 'ltr',
    minHeight: 'auto',
    maxHeight: 'none'
  },
  cardText: {
    color: '#6b7280',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.4',
    display: 'block',
    writingMode: 'horizontal-tb',
    textOrientation: 'mixed',
    direction: 'ltr',
    minHeight: '1.3rem',
    maxHeight: '1.3rem'
  },
  cardActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  editButton: {
    flex: 1,
    padding: '0.8rem 1rem',
    border: 'none',
    background: 'linear-gradient(45deg, #3B82F6, #1D4ED8)',
    color: 'white',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    fontSize: '0.9rem',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    writingMode: 'horizontal-tb',
    textOrientation: 'mixed',
    direction: 'ltr'
  },
  deleteButton: {
    flex: 1,
    padding: '0.8rem 1rem',
    border: 'none',
    background: 'linear-gradient(45deg, #EF4444, #DC2626)',
    color: 'white',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    fontSize: '0.9rem',
    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    writingMode: 'horizontal-tb',
    textOrientation: 'mixed',
    direction: 'ltr'
  }
}

function Ingredientes() {
  const [ingredientes, setIngredientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [nuevoIngrediente, setNuevoIngrediente] = useState({ nombre: '', unidad: '' })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editandoIngrediente, setEditandoIngrediente] = useState(null)

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

  const editarIngrediente = (ingrediente) => {
    setEditandoIngrediente(ingrediente)
    setNuevoIngrediente({ 
      nombre: ingrediente.nombre, 
      unidad: ingrediente.unidad_medida 
    })
    setMostrarFormulario(true)
  }

  const actualizarIngrediente = async () => {
    if (nuevoIngrediente.nombre && nuevoIngrediente.unidad && editandoIngrediente) {
      try {
        await ingredientesAPI.update(editandoIngrediente.id_ingrediente, nuevoIngrediente)
        setNuevoIngrediente({ nombre: '', unidad: '' })
        setEditandoIngrediente(null)
        setMostrarFormulario(false)
        cargarIngredientes()
      } catch (error) {
        console.error('Error actualizando ingrediente:', error)
      }
    }
  }

  const cancelarEdicion = () => {
    setNuevoIngrediente({ nombre: '', unidad: '' })
    setEditandoIngrediente(null)
    setMostrarFormulario(false)
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
            <h3>{editandoIngrediente ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}</h3>
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
              <button className="cancel-button" onClick={cancelarEdicion}>
                Cancelar
              </button>
              <button 
                className="save-button" 
                onClick={editandoIngrediente ? actualizarIngrediente : agregarIngrediente}
              >
                {editandoIngrediente ? 'Actualizar' : 'Guardar'}
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
        <div style={styles.ingredientesGrid}>
          {ingredientes.map(ingrediente => (
            <div key={ingrediente.id_ingrediente} style={styles.ingredienteCard}>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{ingrediente.nombre}</h3>
                <p style={styles.cardText}>Unidad: {ingrediente.unidad_medida}</p>
              </div>
              <div style={styles.cardActions}>
                <button 
                  style={styles.editButton}
                  onClick={() => editarIngrediente(ingrediente)}
                >
                  Editar
                </button>
                <button 
                  style={styles.deleteButton}
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
