import { useState, useEffect } from 'react'
import { recetasAPI, categoriasAPI, ingredientesAPI } from '../services/api'

function Recetas() {
  const [recetas, setRecetas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([])
  const [loading, setLoading] = useState(true)
  const [nuevaReceta, setNuevaReceta] = useState({ 
    nombre: '', 
    descripcion: '', 
    categoria: '', 
    tiempo: '',
    dificultad: 'Fácil',
    ingredientes: [{ id_ingrediente: '', cantidad: '' }]
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [editandoReceta, setEditandoReceta] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [recetasResponse, categoriasResponse, ingredientesResponse] = await Promise.all([
        recetasAPI.getAll(),
        categoriasAPI.getAll(),
        ingredientesAPI.getAll()
      ])
      setRecetas(recetasResponse.data)
      setCategorias(categoriasResponse.data)
      setIngredientesDisponibles(ingredientesResponse.data)
      console.log('Ingredientes cargados:', ingredientesResponse.data)
      console.log('Cantidad de ingredientes:', ingredientesResponse.data.length)
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
        setNuevaReceta({ nombre: '', descripcion: '', categoria: '', tiempo: '', dificultad: 'Fácil', ingredientes: [{ id_ingrediente: '', cantidad: '' }] })
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
      dificultad: receta.dificultad,
      ingredientes: receta.Ingredientes?.map(ing => ({
        id_ingrediente: ing.id_ingrediente,
        cantidad: ing.IngredienteReceta.cantidad
      })) || []
    })
    setMostrarFormulario(true)
  }

  const handleIngredienteChange = (index, field, value) => {
    const nuevosIngredientes = [...nuevaReceta.ingredientes]
    nuevosIngredientes[index] = { ...nuevosIngredientes[index], [field]: value }
    setNuevaReceta({ ...nuevaReceta, ingredientes: nuevosIngredientes })
  }

  const addIngredienteField = () => {
    console.log('Agregando ingrediente, ingredientes actuales:', nuevaReceta.ingredientes)
    setNuevaReceta({
      ...nuevaReceta,
      ingredientes: [...nuevaReceta.ingredientes, { id_ingrediente: '', cantidad: '' }]
    })
  }

  const removeIngredienteField = (index) => {
    const nuevosIngredientes = nuevaReceta.ingredientes.filter((_, i) => i !== index)
    setNuevaReceta({ ...nuevaReceta, ingredientes: nuevosIngredientes })
  }

  const actualizarReceta = async () => {
    if (nuevaReceta.nombre && nuevaReceta.descripcion && editandoReceta) {
      try {
        await recetasAPI.update(editandoReceta.id_receta, nuevaReceta)
        setNuevaReceta({ nombre: '', descripcion: '', categoria: '', tiempo: '', dificultad: 'Fácil', ingredientes: [{ id_ingrediente: '', cantidad: '' }] })
        setEditandoReceta(null)
        setMostrarFormulario(false)
        cargarDatos()
      } catch (error) {
        console.error('Error actualizando receta:', error)
      }
    }
  }

  const cancelarEdicion = () => {
    setNuevaReceta({ nombre: '', descripcion: '', categoria: '', tiempo: '', dificultad: 'Fácil', ingredientes: [] })
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

            <div className="form-group">
              <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Ingredientes de la Receta</h4>
              {console.log('Ingredientes disponibles en formulario:', ingredientesDisponibles)}
              {console.log('Cantidad de ingredientes disponibles:', ingredientesDisponibles.length)}
              {console.log('Ingredientes de la receta:', nuevaReceta.ingredientes)}
              {nuevaReceta.ingredientes.map((ing, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <select
                    value={ing.id_ingrediente}
                    onChange={(e) => handleIngredienteChange(index, 'id_ingrediente', e.target.value)}
                    style={{ flex: 2, padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                  >
                    <option value="">Seleccionar ingrediente</option>
                    {ingredientesDisponibles.length > 0 ? (
                      ingredientesDisponibles.map(dispIng => (
                        <option key={dispIng.id_ingrediente} value={dispIng.id_ingrediente}>
                          {dispIng.nombre}
                        </option>
                      ))
                    ) : (
                      <option disabled>No hay ingredientes disponibles</option>
                    )}
                  </select>
                  <input
                    type="number"
                    placeholder="Cantidad"
                    value={ing.cantidad}
                    onChange={(e) => handleIngredienteChange(index, 'cantidad', e.target.value)}
                    step="0.1"
                    style={{ flex: 1, padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => removeIngredienteField(index)}
                    style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    -
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addIngredienteField}
                style={{
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  marginTop: '0.5rem'
                }}
              >
                + Añadir Ingrediente
              </button>
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
                <div className="ingredientes-list">
                  <strong>Ingredientes:</strong>
                  <ul>
                    {receta.Ingredientes?.map(ing => (
                      <li key={ing.id_ingrediente}>
                        {ing.nombre} - {ing.IngredienteReceta.cantidad} {ing.unidad_medida}
                      </li>
                    ))}
                  </ul>
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