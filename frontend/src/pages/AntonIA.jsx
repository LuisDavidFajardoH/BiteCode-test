import { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import ReactMarkdown from 'react-markdown'
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
  },
  chatContainer: {
    maxHeight: '500px',
    overflowY: 'auto',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '16px',
    marginBottom: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  mensaje: {
    marginBottom: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    maxWidth: '80%',
    wordWrap: 'break-word'
  },
  mensajeBot: {
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    color: 'white',
    marginRight: 'auto',
    marginLeft: '0'
  },
  mensajeUsuario: {
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#374151',
    marginLeft: 'auto',
    marginRight: '0',
    border: '1px solid #e5e7eb'
  },
  inputContainer: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  chatInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease'
  },
  chatButton: {
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  },
  restartButton: {
    padding: '0.5rem 1rem',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  },
  markdownContent: {
    lineHeight: '1.6',
    fontSize: '0.95rem'
  },
  markdownH1: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: 'inherit'
  },
  markdownH2: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginTop: '1.5rem',
    marginBottom: '0.8rem',
    color: 'inherit'
  },
  markdownH3: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginTop: '1rem',
    marginBottom: '0.5rem',
    color: 'inherit'
  },
  markdownP: {
    marginBottom: '0.8rem',
    color: 'inherit'
  },
  markdownUl: {
    marginBottom: '0.8rem',
    paddingLeft: '1.2rem'
  },
  markdownLi: {
    marginBottom: '0.3rem',
    color: 'inherit'
  },
  markdownStrong: {
    fontWeight: '600',
    color: 'inherit'
  },
  markdownHr: {
    border: 'none',
    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
    margin: '1.5rem 0'
  }
}

function AntonIA() {
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([])
  const [loading, setLoading] = useState(true)
  const [generando, setGenerando] = useState(false)
  const [error, setError] = useState('')
  
  // Estados para el chat
  const [chatMode, setChatMode] = useState(true)
  const [nombreUsuario, setNombreUsuario] = useState('')
  const [ingredientesTexto, setIngredientesTexto] = useState('')
  const [pasoActual, setPasoActual] = useState('nombre') // 'nombre', 'ingredientes', 'resultado'
  const [resultado, setResultado] = useState('')
  const [mensajes, setMensajes] = useState([
    {
      tipo: 'bot',
      contenido: '¡Hola! Soy AntonIA, tu asistente culinario inteligente. ¿Cómo te llamas?',
      timestamp: new Date()
    }
  ])

  useEffect(() => {
    cargarIngredientes()
  }, [])

  // Auto-scroll al final del chat
  useEffect(() => {
    const chatContainer = document.querySelector('[data-chat-container]')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [mensajes])

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

  const agregarMensaje = (tipo, contenido) => {
    setMensajes(prev => [...prev, {
      tipo,
      contenido,
      timestamp: new Date()
    }])
  }

  const manejarNombre = () => {
    if (nombreUsuario.trim()) {
      agregarMensaje('usuario', nombreUsuario)
      agregarMensaje('bot', `¡Perfecto, ${nombreUsuario}! Ahora cuéntame, ¿qué ingredientes tienes disponibles en tu cocina? Puedes escribir los ingredientes separados por comas.`)
      setPasoActual('ingredientes')
    }
  }

  const manejarIngredientes = () => {
    if (ingredientesTexto.trim()) {
      agregarMensaje('usuario', ingredientesTexto)
      agregarMensaje('bot', 'Excelente, déjame pensar en algunas recetas deliciosas que puedas preparar con esos ingredientes...')
      setPasoActual('resultado')
      generarRecetasChat()
    }
  }

  const reiniciarChat = () => {
    setNombreUsuario('')
    setIngredientesTexto('')
    setPasoActual('nombre')
    setResultado('')
    setMensajes([
      {
        tipo: 'bot',
        contenido: '¡Hola! Soy AntonIA, tu asistente culinario inteligente. ¿Cómo te llamas?',
        timestamp: new Date()
      }
    ])
  }

  const generarRecetasChat = async () => {
    try {
      setGenerando(true)
      setError('')

      // Verificar API key
      const apiKey = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY
      if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        setError('API key de Google Cloud no configurada. Por favor configura VITE_GOOGLE_CLOUD_API_KEY en el archivo .env')
        return
      }

      console.log('Ingredientes del usuario:', ingredientesTexto)

      // Configuración de la IA
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

      const prompt = `Eres AntonIA, un asistente culinario amigable y experto. El usuario ${nombreUsuario} tiene estos ingredientes disponibles: ${ingredientesTexto}

Tu tarea es generar ideas de recetas deliciosas y creativas. 

Instrucciones:
1. Usa principalmente los ingredientes que el usuario tiene disponibles.
2. Si faltan ingredientes esenciales, sugiere alternativas o menciónalos como opcionales.
3. Genera máximo 3 recetas diferentes y atractivas.
4. Sé creativo y sugiere recetas que sorprendan al usuario.
5. Responde en un tono amigable y entusiasta, como si fueras un chef experimentado.

Formato de respuesta (usa markdown para mejor presentación):
## 🍽️ Recetas para ${nombreUsuario}

### 1. [Nombre de la receta]
**Descripción:** [Descripción breve y atractiva]

**Ingredientes:**
- [Ingrediente 1]: [cantidad]
- [Ingrediente 2]: [cantidad]
- [Ingredientes adicionales si es necesario]

**Pasos:**
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

**Categoría:** [desayuno/almuerzo/cena/postre]

---

[Repetir para las otras recetas]

¡Que disfrutes cocinando, ${nombreUsuario}! 🧑‍🍳`

      console.log('Iniciando generación con modelo: gemini-2.5-flash')
      console.log('Prompt:', prompt.substring(0, 200) + '...')

      const result = await model.generateContent(prompt)
      const response = await result.response
      const texto = response.text()

      console.log('Resultado completo:', texto)
      setResultado(texto)
      agregarMensaje('bot', texto)

    } catch (error) {
      console.error('Error generando recetas:', error)
      console.error('Detalles del error:', error.message)
      
      let mensajeError = 'Lo siento, hubo un problema al generar las recetas. '
      
      if (error.message && error.message.includes('403')) {
        mensajeError += 'La API de Google Generative Language no está habilitada.'
      } else if (error.message && error.message.includes('404') && error.message.includes('not found')) {
        mensajeError += 'Modelo de IA no encontrado.'
      } else if (error.message && error.message.includes('PERMISSION_DENIED')) {
        mensajeError += 'Permisos denegados. Verifica la configuración de la API.'
      } else if (error.message && error.message.includes('API key')) {
        mensajeError += 'API key inválida.'
      } else {
        mensajeError += 'Verifica tu conexión a internet.'
      }
      
      setError(mensajeError)
      agregarMensaje('bot', mensajeError)
    } finally {
      setGenerando(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>AntonIA</h1>
        <p style={styles.pageDescription}>
          Tu asistente culinario inteligente. ¡Conversemos! Te preguntaré tu nombre y los ingredientes que tienes 
          para sugerirte recetas deliciosas y personalizadas.
        </p>
        <button
          style={styles.restartButton}
          onClick={reiniciarChat}
        >
          🔄 Reiniciar Conversación
        </button>
      </div>

      <div style={styles.contentContainer}>
        <div style={styles.chatContainer} data-chat-container>
          {mensajes.map((mensaje, index) => (
            <div
              key={index}
              style={{
                ...styles.mensaje,
                ...(mensaje.tipo === 'bot' ? styles.mensajeBot : styles.mensajeUsuario)
              }}
            >
              {mensaje.tipo === 'bot' && <strong>AntonIA:</strong>} 
              {mensaje.tipo === 'usuario' && <strong>Tú:</strong>} 
              {mensaje.tipo === 'bot' ? (
                <div style={styles.markdownContent}>
                  <ReactMarkdown
                    components={{
                      h1: ({children}) => <h1 style={styles.markdownH1}>{children}</h1>,
                      h2: ({children}) => <h2 style={styles.markdownH2}>{children}</h2>,
                      h3: ({children}) => <h3 style={styles.markdownH3}>{children}</h3>,
                      p: ({children}) => <p style={styles.markdownP}>{children}</p>,
                      ul: ({children}) => <ul style={styles.markdownUl}>{children}</ul>,
                      li: ({children}) => <li style={styles.markdownLi}>{children}</li>,
                      strong: ({children}) => <strong style={styles.markdownStrong}>{children}</strong>,
                      hr: () => <hr style={styles.markdownHr} />
                    }}
                  >
                    {mensaje.contenido}
                  </ReactMarkdown>
                </div>
              ) : (
                mensaje.contenido
              )}
            </div>
          ))}
          {generando && (
            <div style={{...styles.mensaje, ...styles.mensajeBot}}>
              <div style={styles.loadingSpinner}></div>
              AntonIA está pensando...
            </div>
          )}
        </div>

        {pasoActual === 'nombre' && (
          <div style={styles.inputContainer}>
            <input
              type="text"
              style={styles.chatInput}
              placeholder="Escribe tu nombre aquí..."
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && manejarNombre()}
            />
            <button
              style={styles.chatButton}
              onClick={manejarNombre}
              disabled={!nombreUsuario.trim()}
            >
              Enviar
            </button>
          </div>
        )}

        {pasoActual === 'ingredientes' && (
          <div style={styles.inputContainer}>
            <input
              type="text"
              style={styles.chatInput}
              placeholder="Ej: pollo, arroz, cebolla, ajo, tomate..."
              value={ingredientesTexto}
              onChange={(e) => setIngredientesTexto(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && manejarIngredientes()}
            />
            <button
              style={styles.chatButton}
              onClick={manejarIngredientes}
              disabled={!ingredientesTexto.trim() || generando}
            >
              {generando ? 'Generando...' : 'Generar Recetas'}
            </button>
          </div>
        )}

        {error && (
          <div style={styles.errorMessage}>
            {error}
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
