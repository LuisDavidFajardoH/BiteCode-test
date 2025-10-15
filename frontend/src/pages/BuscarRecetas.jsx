import { useState } from 'react'

function BuscarRecetas() {
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([])
  const [recetasEncontradas, setRecetasEncontradas] = useState([])
  
  const ingredientesDisponibles = [
    'Tomate', 'Cebolla', 'Ajo', 'Aceite de oliva', 'Pasta', 'Queso', 'Pollo', 
    'Carne', 'Pescado', 'Huevos', 'Leche', 'Mantequilla', 'Sal', 'Pimienta'
  ]

  const recetas = [
    {
      id: 1,
      nombre: 'Pasta con Salsa de Tomate',
      ingredientes: ['Pasta', 'Tomate', 'Ajo', 'Aceite de oliva', 'Sal'],
      tiempo: '30 min',
      dificultad: 'Fácil'
    },
    {
      id: 2,
      nombre: 'Ensalada César',
      ingredientes: ['Lechuga', 'Queso', 'Aceite de oliva', 'Ajo', 'Huevos'],
      tiempo: '15 min',
      dificultad: 'Fácil'
    },
    {
      id: 3,
      nombre: 'Pollo a la Plancha',
      ingredientes: ['Pollo', 'Aceite de oliva', 'Sal', 'Pimienta', 'Ajo'],
      tiempo: '25 min',
      dificultad: 'Fácil'
    }
  ]

  const toggleIngrediente = (ingrediente) => {
    if (ingredientesSeleccionados.includes(ingrediente)) {
      setIngredientesSeleccionados(ingredientesSeleccionados.filter(i => i !== ingrediente))
    } else {
      setIngredientesSeleccionados([...ingredientesSeleccionados, ingrediente])
    }
  }

  const buscarRecetas = () => {
    const encontradas = recetas.filter(receta => 
      receta.ingredientes.every(ingrediente => 
        ingredientesSeleccionados.includes(ingrediente)
      )
    )
    setRecetasEncontradas(encontradas)
  }

  return (
    <div className="buscar-page">
      <div className="page-header">
        <h1 className="page-title">Buscar Recetas</h1>
        <p className="page-description">
          Selecciona los ingredientes que tienes disponibles y encuentra recetas que puedes preparar
        </p>
      </div>

      <div className="search-section">
        <div className="ingredientes-selector">
          <h3>Ingredientes Disponibles</h3>
          <div className="ingredientes-grid">
            {ingredientesDisponibles.map(ingrediente => (
              <button
                key={ingrediente}
                className={`ingrediente-chip ${ingredientesSeleccionados.includes(ingrediente) ? 'selected' : ''}`}
                onClick={() => toggleIngrediente(ingrediente)}
              >
                {ingrediente}
              </button>
            ))}
          </div>
          <button 
            className="search-button"
            onClick={buscarRecetas}
            disabled={ingredientesSeleccionados.length === 0}
          >
            🔍 Buscar Recetas
          </button>
        </div>

        <div className="results-section">
          <h3>Recetas Encontradas ({recetasEncontradas.length})</h3>
          {recetasEncontradas.length === 0 ? (
            <div className="no-results">
              <p>Selecciona ingredientes para buscar recetas</p>
            </div>
          ) : (
            <div className="recetas-grid">
              {recetasEncontradas.map(receta => (
                <div key={receta.id} className="receta-card">
                  <div className="card-content">
                    <h4>{receta.nombre}</h4>
                    <div className="receta-meta">
                      <span className="tiempo">⏱️ {receta.tiempo}</span>
                      <span className="dificultad">📊 {receta.dificultad}</span>
                    </div>
                    <div className="ingredientes-list">
                      <strong>Ingredientes:</strong>
                      <ul>
                        {receta.ingredientes.map(ing => (
                          <li key={ing}>{ing}</li>
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
