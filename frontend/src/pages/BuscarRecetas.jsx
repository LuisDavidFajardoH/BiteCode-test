import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ingredientesAPI, recetasAPI, categoriasAPI } from '../services/api'

function BuscarRecetas() {
  const [searchParams] = useSearchParams()
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([])
  const [categorias, setCategorias] = useState([])
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [recetasEncontradas, setRecetasEncontradas] = useState([])
  const [loading, setLoading] = useState(true)
  const [buscando, setBuscando] = useState(false)
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  useEffect(() => {
    const searchFromURL = searchParams.get('search')
    if (searchFromURL) {
      setSearchTerm(searchFromURL)
      buscarPorTexto(searchFromURL)
    }
  }, [searchParams])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [ingredientesResponse, categoriasResponse] = await Promise.all([
        ingredientesAPI.getAll(),
        categoriasAPI.getAll()
      ])
      setIngredientesDisponibles(ingredientesResponse.data)
      setCategorias(categoriasResponse.data)
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const buscarPorTexto = async (texto) => {
    try {
      setBuscando(true)
      const response = await recetasAPI.getAll()
      const recetasFiltradas = response.data.filter(receta => 
        receta.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        receta.descripcion.toLowerCase().includes(texto.toLowerCase())
      )
      setRecetasEncontradas(recetasFiltradas)
    } catch (error) {
      console.error('Error buscando por texto:', error)
    } finally {
      setBuscando(false)
    }
  }

  const toggleIngrediente = (ingredienteId) => {
    if (ingredientesSeleccionados.includes(ingredienteId)) {
      setIngredientesSeleccionados(ingredientesSeleccionados.filter(id => id !== ingredienteId))
    } else {
      setIngredientesSeleccionados([...ingredientesSeleccionados, ingredienteId])
    }
  }

  const mostrarReceta = (receta) => {
    setRecetaSeleccionada(receta)
  }

  const cerrarReceta = () => {
    setRecetaSeleccionada(null)
  }

  const buscarRecetas = async () => {
    if (ingredientesSeleccionados.length === 0 && !categoriaSeleccionada) return
    
    try {
      setBuscando(true)
      let recetasFiltradas = []
      
      if (ingredientesSeleccionados.length > 0) {
        const response = await recetasAPI.buscarPorIngredientes(ingredientesSeleccionados)
        recetasFiltradas = response.data
      } else {
        const response = await recetasAPI.getAll()
        recetasFiltradas = response.data
      }
      
      if (categoriaSeleccionada) {
        recetasFiltradas = recetasFiltradas.filter(receta => 
          receta.Categoria?.id_categoria == categoriaSeleccionada
        )
      }
      
      setRecetasEncontradas(recetasFiltradas)
    } catch (error) {
      console.error('Error buscando recetas:', error)
    } finally {
      setBuscando(false)
    }
  }

  return (
    <div className="buscar-page">
      <div className="page-header">
        <h1 className="page-title">Buscar Recetas</h1>
        <p className="page-description">
          Busca recetas por ingredientes disponibles o por categoría. Puedes combinar ambos filtros para resultados más específicos.
        </p>
      </div>

      <div className="search-section">
        <div className="ingredientes-selector">
          <h3>Filtros de Búsqueda</h3>
          {loading ? (
            <div className="loading">
              <p>Cargando datos...</p>
            </div>
          ) : (
            <>
              <div className="filter-section">
                <h4>Buscar por Nombre</h4>
                <div className="text-search-container">
                  <input
                    type="text"
                    className="text-search-input"
                    placeholder="Buscar recetas por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="button"
                    className="text-search-button"
                    onClick={() => buscarPorTexto(searchTerm)}
                    disabled={!searchTerm.trim() || buscando}
                  >
                    🔍
                  </button>
                </div>
              </div>

              <div className="filter-section">
                <h4>Filtrar por Categoría</h4>
                <select
                  className="category-filter"
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map(cat => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-section">
                <h4>Ingredientes Disponibles</h4>
                <div className="ingredientes-grid">
                  {ingredientesDisponibles.map(ingrediente => (
                    <button
                      key={ingrediente.id_ingrediente}
                      className={`ingrediente-chip ${ingredientesSeleccionados.includes(ingrediente.id_ingrediente) ? 'selected' : ''}`}
                      onClick={() => toggleIngrediente(ingrediente.id_ingrediente)}
                    >
                      {ingrediente.nombre}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                className="search-button"
                onClick={buscarRecetas}
                disabled={(ingredientesSeleccionados.length === 0 && !categoriaSeleccionada) || buscando}
              >
                {buscando ? '🔍 Buscando...' : '🔍 Buscar Recetas'}
              </button>
            </>
          )}
        </div>

        <div className="results-section">
          <h3>Recetas Encontradas ({recetasEncontradas.length})</h3>
          {recetasEncontradas.length === 0 ? (
            <div className="no-results">
              <p>Selecciona ingredientes o una categoría para buscar recetas</p>
            </div>
          ) : (
            <div className="recetas-grid">
              {recetasEncontradas.map(receta => (
                <div key={receta.id_receta} className="receta-card">
                  <div className="card-content">
                    <h4>{receta.nombre}</h4>
                    <p className="descripcion">{receta.descripcion}</p>
                    <div className="receta-meta">
                      <span className="tiempo">⏱️ {receta.tiempo_preparacion}</span>
                      <span className="dificultad">📊 {receta.dificultad}</span>
                    </div>
                    <div className="ingredientes-list">
                      <strong>Ingredientes necesarios:</strong>
                      <ul>
                        {receta.Ingredientes?.map(ing => (
                          <li key={ing.id_ingrediente}>
                            <span className="ingrediente-cantidad">
                              {ing.IngredienteReceta?.cantidad} {ing.unidad_medida}
                            </span>
                            <span className="ingrediente-nombre">{ing.nombre}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button 
                    className="cook-button"
                    onClick={() => mostrarReceta(receta)}
                  >
                    Cocinar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de receta completa */}
      {recetaSeleccionada && (
        <div className="form-modal">
          <div className="form-container" style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#1f2937' }}>
                {recetaSeleccionada.nombre}
              </h3>
              <button 
                onClick={cerrarReceta}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '0.5rem'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>Descripción:</h4>
              <p style={{ color: '#6b7280', lineHeight: '1.6', margin: 0 }}>
                {recetaSeleccionada.descripcion}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Categoría:</h4>
                <p style={{ color: '#6b7280', margin: 0 }}>
                  {recetaSeleccionada.Categoria?.nombre || 'Sin categoría'}
                </p>
              </div>
              <div>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Tiempo:</h4>
                <p style={{ color: '#6b7280', margin: 0 }}>
                  {recetaSeleccionada.tiempo_preparacion}
                </p>
              </div>
              <div>
                <h4 style={{ color: '#374151', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Dificultad:</h4>
                <p style={{ color: '#6b7280', margin: 0 }}>
                  {recetaSeleccionada.dificultad}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>Ingredientes necesarios:</h4>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.5rem'
              }}>
                {recetaSeleccionada.Ingredientes?.map(ing => (
                  <li key={ing.id_ingrediente} style={{
                    background: '#f9fafb',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <span style={{ fontWeight: '600', color: '#8B5CF6' }}>
                      {ing.IngredienteReceta?.cantidad} {ing.unidad_medida}
                    </span>
                    <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                      {ing.nombre}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={cerrarReceta}
                style={{
                  background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)'
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                ¡A cocinar!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuscarRecetas
