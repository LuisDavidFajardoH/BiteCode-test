import { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ingredientesAPI } from '../services/api'

const styles = {
  page: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden'
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '3rem',
    padding: '2rem 0',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    marginBottom: '3rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #3B82F6)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    marginBottom: '1rem',
    animation: 'gradientShift 3s ease infinite',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  pageDescription: {
    color: '#4b5563',
    fontSize: '1.2rem',
    lineHeight: '1.7',
    marginBottom: '2rem',
    fontWeight: '500',
    opacity: '0.9'
  },
  contentContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  ingredientesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  ingredienteChip: {
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#374151'
  },
  ingredienteChipSelected: {
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    color: 'white',
    borderColor: '#8B5CF6',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
  },
  generateButton: {
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '2rem',
    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  },
  generateButtonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
    transform: 'none'
  },
  loadingSpinner: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    animation: 'spin 1s ease-in-out infinite',
    marginRight: '0.5rem'
  },
  resultContainer: {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
    fontSize: '1rem',
    color: '#374151'
  },
  errorMessage: {
    background: 'linear-gradient(45deg, #EF4444, #DC2626)',
    color: 'white',
    padding: '1rem',
    borderRadius: '12px',
    textAlign: 'center',
    fontWeight: '600'
  }
}

function AntonIA() {
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([])
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([])
  const [loading, setLoading] = useState(true)
  const [generando, setGenerando] = useState(false)
  const [resultado, setResultado] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    cargarIngredientes()
  }, [])

  const cargarIngredientes = async () => {
    try {
      setLoading(true)
      const response = await ingredientesAPI.getAll()
      setIngredientesDisponibles(response.data)
    } catch (error) {
      console.error('Error cargando ingredientes:', error)
      setError('Error al cargar los ingredientes')
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

  const generarRecetas = async () => {
    if (ingredientesSeleccionados.length === 0) {
      setError('Por favor selecciona al menos un ingrediente')
      return
    }

    try {
      setGenerando(true)
      setError('')
      setResultado('')

      // Verificar API key
      const apiKey = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY
      if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        setError('API key de Google Cloud no configurada. Por favor configura VITE_GOOGLE_CLOUD_API_KEY en el archivo .env')
        return
      }

      // Obtener nombres de ingredientes seleccionados
      const nombresIngredientes = ingredientesSeleccionados.map(id => {
        const ingrediente = ingredientesDisponibles.find(ing => ing.id_ingrediente === id)
        return ingrediente ? ingrediente.nombre : ''
      }).filter(nombre => nombre !== '')

      const ingredientesTexto = nombresIngredientes.join(', ')
      console.log('Ingredientes seleccionados:', ingredientesTexto)

      // Configuración de la IA
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

      const prompt = `Eres un asistente culinario experto en recetas. Tu tarea es generar ideas de recetas basadas en los ingredientes disponibles que el usuario proporcione. 

Instrucciones:
1. Usa únicamente los ingredientes listados por el usuario.
2. Si faltan ingredientes esenciales, sugiere cómo reemplazarlos o menciónalos como opcionales.
3. Devuelve un máximo de 3 recetas posibles.
4. Cada receta debe tener el siguiente formato:
  - Nombre de la receta
  - Descripción breve
  - Ingredientes requeridos (con cantidades aproximadas)
  - Pasos de preparación (numerados)
  - Categoría recomendada (por ejemplo: desayuno, almuerzo, cena, postre)

Ejemplo de entrada del usuario:
"tengo arroz, pollo, cebolla y ajo"

Ejemplo de respuesta esperada:
1. Nombre: Arroz con pollo criollo
  Descripción: Una receta clásica, sabrosa y fácil de preparar con tus ingredientes disponibles.
  Ingredientes:
  - Arroz: 1 taza
  - Pollo: 250 g
  - Cebolla: ½ unidad
  - Ajo: 1 diente
  - Sal y aceite al gusto
  Pasos:
  1. Sofríe el ajo y la cebolla.
  2. Agrega el pollo y cocínalo hasta dorar.
  3. Añade el arroz, mezcla bien y agrega agua.
  4. Cocina hasta que el arroz esté listo.
  Categoría: Almuerzo

Entrada del usuario: ${ingredientesTexto}

Responde únicamente con el listado estructurado de recetas en formato texto.`

      console.log('Iniciando generación con modelo: gemini-2.5-flash')
      console.log('Prompt:', prompt.substring(0, 200) + '...')

      const result = await model.generateContent(prompt)
      const response = await result.response
      const texto = response.text()

      console.log('Resultado completo:', texto)
      setResultado(texto)

    } catch (error) {
      console.error('Error generando recetas:', error)
      console.error('Detalles del error:', error.message)
      
      let mensajeError = 'Error al generar las recetas. '
      
      if (error.message && error.message.includes('403')) {
        mensajeError += 'La API de Google Generative Language no está habilitada. Ve a Google Cloud Console y habilita la API.'
      } else if (error.message && error.message.includes('404') && error.message.includes('not found')) {
        mensajeError += 'Modelo de IA no encontrado. Se ha cambiado a gemini-pro automáticamente.'
      } else if (error.message && error.message.includes('PERMISSION_DENIED')) {
        mensajeError += 'Permisos denegados. Verifica que la API esté habilitada y la API key sea válida.'
      } else if (error.message && error.message.includes('API key')) {
        mensajeError += 'API key inválida. Verifica tu API key de Google Cloud.'
      } else {
        mensajeError += `Error: ${error.message}. Verifica tu conexión a internet y la configuración de la API.`
      }
      
      setError(mensajeError)
    } finally {
      setGenerando(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>AntonIA</h1>
        <p style={styles.pageDescription}>
          Tu asistente culinario inteligente. Selecciona los ingredientes que tienes disponibles 
          y te sugerirá recetas deliciosas que puedes preparar.
        </p>
      </div>

      <div style={styles.contentContainer}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Selecciona tus ingredientes disponibles</h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={styles.loadingSpinner}></div>
              <p>Cargando ingredientes...</p>
            </div>
          ) : (
            <>
              <div style={styles.ingredientesGrid}>
                {ingredientesDisponibles.map(ingrediente => (
                  <button
                    key={ingrediente.id_ingrediente}
                    style={{
                      ...styles.ingredienteChip,
                      ...(ingredientesSeleccionados.includes(ingrediente.id_ingrediente) 
                        ? styles.ingredienteChipSelected 
                        : {})
                    }}
                    onClick={() => toggleIngrediente(ingrediente.id_ingrediente)}
                  >
                    {ingrediente.nombre}
                  </button>
                ))}
              </div>

              <button
                style={{
                  ...styles.generateButton,
                  ...(generando || ingredientesSeleccionados.length === 0 
                    ? styles.generateButtonDisabled 
                    : {})
                }}
                onClick={generarRecetas}
                disabled={generando || ingredientesSeleccionados.length === 0}
              >
                {generando && <div style={styles.loadingSpinner}></div>}
                {generando ? 'Generando recetas...' : 'Generar Recetas con IA'}
              </button>
            </>
          )}
        </div>

        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        {resultado && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Recetas sugeridas por AntonIA</h2>
            <div style={styles.resultContainer}>
              {resultado}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default AntonIA
