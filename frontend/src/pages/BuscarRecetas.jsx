import { useState, useEffect } from 'react'
import { ingredientesAPI, recetasAPI, categoriasAPI } from '../services/api'

function BuscarRecetas() {
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([])
  const [categorias, setCategorias] = useState([])
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [recetasEncontradas, setRecetasEncontradas] = useState([])
  const [loading, setLoading] = useState(true)
  const [buscando, setBuscando] = useState(false)

  useEffect(() => {
    cargarDatos()
  }, [])

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

  const toggleIngrediente = (ingredienteId) => {
    if (ingredientesSeleccionados.includes(ingredienteId)) {
      setIngredientesSeleccionados(ingredientesSeleccionados.filter(id => id !== ingredienteId))
    } else {
      setIngredientesSeleccionados([...ingredientesSeleccionados, ingredienteId])
    }
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
                  <button className="cook-button">Cocinar</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BuscarRecetas
