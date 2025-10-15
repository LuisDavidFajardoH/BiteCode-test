import { useState, useEffect } from 'react'
import { recetasAPI, categoriasAPI } from '../services/api'

function Recetas() {
  const [recetas, setRecetas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [nuevaReceta, setNuevaReceta] = useState({ 
    nombre: '', 
    descripcion: '', 
    categoria: '', 
    tiempo: '',
    dificultad: 'Fácil'
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editandoReceta, setEditandoReceta] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [recetasResponse, categoriasResponse] = await Promise.all([
        recetasAPI.getAll(),
        categoriasAPI.getAll()
      ])
      setRecetas(recetasResponse.data)
      setCategorias(categoriasResponse.data)
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const agregarReceta = async () => {
    if (nuevaReceta.nombre && nuevaReceta.descripcion) {
      try {
        await recetasAPI.create(nuevaReceta)
        setNuevaReceta({ nombre: '', descripcion: '', categoria: '', tiempo: '', dificultad: 'Fácil' })
        setMostrarFormulario(false)
        cargarDatos()
      } catch (error) {
        console.error('Error agregando receta:', error)
      }
    }
  }

  const editarReceta = (receta) => {
    setEditandoReceta(receta)
    setNuevaReceta({
      nombre: receta.nombre,
      descripcion: receta.descripcion,
      categoria: receta.Categoria?.id_categoria || '',
      tiempo: receta.tiempo_preparacion,
      dificultad: receta.dificultad
    })
    setMostrarFormulario(true)
  }

  const actualizarReceta = async () => {
    if (nuevaReceta.nombre && nuevaReceta.descripcion && editandoReceta) {
      try {
        await recetasAPI.update(editandoReceta.id_receta, nuevaReceta)
        setNuevaReceta({ nombre: '', descripcion: '', categoria: '', tiempo: '', dificultad: 'Fácil' })
        setEditandoReceta(null)
        setMostrarFormulario(false)
        cargarDatos()
      } catch (error) {
        console.error('Error actualizando receta:', error)
      }
    }
  }

  const cancelarEdicion = () => {
    setNuevaReceta({ nombre: '', descripcion: '', categoria: '', tiempo: '', dificultad: 'Fácil' })
    setEditandoReceta(null)
    setMostrarFormulario(false)
  }

  const eliminarReceta = async (id) => {
    try {
      await recetasAPI.delete(id)
      cargarDatos()
    } catch (error) {
      console.error('Error eliminando receta:', error)
    }
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
            <h3>{editandoReceta ? 'Editar Receta' : 'Nueva Receta'}</h3>
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
                {categorias.map(cat => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.nombre}
                  </option>
                ))}
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
            <div className="form-group">
              <select
                value={nuevaReceta.dificultad}
                onChange={(e) => setNuevaReceta({...nuevaReceta, dificultad: e.target.value})}
              >
                <option value="Fácil">Fácil</option>
                <option value="Medio">Medio</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="cancel-button" onClick={cancelarEdicion}>
                Cancelar
              </button>
              <button 
                className="save-button blue" 
                onClick={editandoReceta ? actualizarReceta : agregarReceta}
              >
                {editandoReceta ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">
          <p>Cargando recetas...</p>
        </div>
      ) : (
        <div className="recetas-grid">
          {recetas.map(receta => (
            <div key={receta.id_receta} className="receta-card">
              <div className="card-content">
                <h3>{receta.nombre}</h3>
                <p className="descripcion">{receta.descripcion}</p>
                <div className="receta-info">
                  <span className="categoria">{receta.Categoria?.nombre || 'Sin categoría'}</span>
                  <span className="tiempo">⏱️ {receta.tiempo_preparacion}</span>
                </div>
                <div className="dificultad">
                  📊 {receta.dificultad}
                </div>
              </div>
              <div className="card-actions">
                <button 
                  className="edit-button"
                  onClick={() => editarReceta(receta)}
                >
                  Editar
                </button>
                <button 
                  className="delete-button"
                  onClick={() => eliminarReceta(receta.id_receta)}
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

export default Recetas