import { useState, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import ReactMarkdown from 'react-markdown'
import { ingredientesAPI, recetasAPI, categoriasAPI } from '../services/api'

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
  },
  recetaSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  recetaButton: {
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left'
  },
  recetaButtonHover: {
    borderColor: '#8B5CF6',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
  },
  recetaNombre: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  recetaDescripcion: {
    fontSize: '0.9rem',
    color: '#6b7280',
    lineHeight: '1.4'
  },
  noGuardarButton: {
    padding: '0.75rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#6b7280',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
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
  const [pasoActual, setPasoActual] = useState('nombre') // 'nombre', 'ingredientes', 'resultado', 'seleccionar'
  const [resultado, setResultado] = useState('')
  const [recetasGeneradas, setRecetasGeneradas] = useState([])
  const [guardandoReceta, setGuardandoReceta] = useState(false)
  const [categorias, setCategorias] = useState([])
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
      const [ingredientesResponse, categoriasResponse] = await Promise.all([
        ingredientesAPI.getAll(),
        categoriasAPI.getAll()
      ])
      setIngredientesDisponibles(ingredientesResponse.data)
      setCategorias(categoriasResponse.data)
    } catch (error) {
      console.error('Error cargando datos:', error)
      setError('Error al cargar los datos')
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
    setRecetasGeneradas([])
    setMensajes([
      {
        tipo: 'bot',
        contenido: '¡Hola! Soy AntonIA, tu asistente culinario inteligente. ¿Cómo te llamas?',
        timestamp: new Date()
      }
    ])
  }

       const parsearRecetas = (texto) => {
         const recetas = []
         const secciones = texto.split('### ')
         
         secciones.forEach((seccion, index) => {
           if (index === 0) return // Saltar el título principal
           
           const lineas = seccion.split('\n')
           const nombre = lineas[0].replace(/^\d+\.\s*/, '').trim()
           
           let descripcion = ''
           let ingredientes = []
           let pasos = []
           let categoria = ''
           let categoriaId = null
           let tiempoPreparacion = ''
           
           let seccionActual = ''
           for (let i = 1; i < lineas.length; i++) {
             const linea = lineas[i].trim()
             
             if (linea.startsWith('**Descripción:**')) {
               descripcion = linea.replace('**Descripción:**', '').trim()
               seccionActual = 'descripcion'
             } else if (linea.startsWith('**Ingredientes:**')) {
               seccionActual = 'ingredientes'
             } else if (linea.startsWith('**Pasos:**')) {
               seccionActual = 'pasos'
             } else if (linea.startsWith('**Tiempo de preparación:**')) {
               tiempoPreparacion = linea.replace('**Tiempo de preparación:**', '').trim()
             } else if (linea.startsWith('**Categoría:**')) {
               categoria = linea.replace('**Categoría:**', '').trim()
               // Extraer ID de la categoría si está en formato "ID: X - Nombre"
               const idMatch = categoria.match(/ID:\s*(\d+)\s*-\s*(.+)/)
               if (idMatch) {
                 categoriaId = parseInt(idMatch[1]) // Extraer el ID
                 categoria = idMatch[2].trim() // Solo el nombre
               }
             } else if (linea.startsWith('- ') && seccionActual === 'ingredientes') {
               ingredientes.push(linea.replace('- ', '').trim())
             } else if (/^\d+\./.test(linea) && seccionActual === 'pasos') {
               pasos.push(linea.replace(/^\d+\.\s*/, '').trim())
             } else if (linea && seccionActual === 'descripcion' && !descripcion) {
               descripcion = linea
             }
           }
           
           // Si no se encontró tiempo de preparación, intentar extraerlo de la descripción
           if (!tiempoPreparacion) {
             const tiempoMatch = descripcion.match(/(\d+)\s*(minutos?|min|horas?|h)/i)
             if (tiempoMatch) {
               tiempoPreparacion = tiempoMatch[0]
             }
           }
           
           // Si no se encontró categoría, intentar inferirla del nombre o descripción
           if (!categoria) {
             const textoCompleto = (nombre + ' ' + descripcion).toLowerCase()
             if (textoCompleto.includes('pasta') || textoCompleto.includes('pizza') || textoCompleto.includes('risotto')) {
               categoria = 'Italiana'
             } else if (textoCompleto.includes('tacos') || textoCompleto.includes('burritos') || textoCompleto.includes('enchiladas')) {
               categoria = 'Mexicana'
             } else if (textoCompleto.includes('curry') || textoCompleto.includes('wok') || textoCompleto.includes('teriyaki')) {
               categoria = 'Asiática'
             } else if (textoCompleto.includes('ensalada') || textoCompleto.includes('salad')) {
               categoria = 'Ensaladas'
             } else if (textoCompleto.includes('postre') || textoCompleto.includes('dulce') || textoCompleto.includes('tarta')) {
               categoria = 'Postres'
             } else if (textoCompleto.includes('pollo') || textoCompleto.includes('carne') || textoCompleto.includes('cerdo')) {
               categoria = 'Carnes'
             } else if (textoCompleto.includes('pescado') || textoCompleto.includes('salmón') || textoCompleto.includes('mariscos')) {
               categoria = 'Pescados'
             } else {
               categoria = 'Carnes' // Categoría por defecto
             }
           }
           
           if (nombre && descripcion) {
             recetas.push({
               nombre,
               descripcion,
               ingredientes,
               pasos,
               categoria,
               categoriaId,
               tiempoPreparacion
             })
           }
         })
         
         return recetas
       }

  const guardarReceta = async (receta) => {
    try {
      setGuardandoReceta(true)
      
      // Usar el ID de categoría si está disponible, sino buscar por nombre
      let categoriaId = receta.categoriaId
      
      if (!categoriaId) {
        // Buscar la categoría por nombre si no tenemos el ID
        categoriaId = categorias.find(cat => {
          const nombreCategoria = cat.nombre.toLowerCase()
          const categoriaReceta = receta.categoria.toLowerCase()
          
          // Búsqueda exacta
          if (nombreCategoria === categoriaReceta) return true
          
          // Búsqueda parcial
          if (nombreCategoria.includes(categoriaReceta) || categoriaReceta.includes(nombreCategoria)) return true
          
          // Mapeo de categorías comunes
          const mapeoCategorias = {
            'italiana': ['italiana', 'pasta', 'pizza', 'risotto'],
            'mexicana': ['mexicana', 'tacos', 'burritos', 'enchiladas'],
            'asiática': ['asiática', 'china', 'japonesa', 'tailandesa', 'curry', 'wok'],
            'ensaladas': ['ensaladas', 'salad', 'verde'],
            'postres': ['postres', 'dulce', 'tarta', 'pastel'],
            'vegetariana': ['vegetariana', 'vegano', 'vegetal'],
            'carnes': ['carnes', 'carne', 'beef', 'pollo', 'cerdo'],
            'pescados': ['pescados', 'pescado', 'mariscos', 'salmón']
          }
          
          for (const [categoria, variantes] of Object.entries(mapeoCategorias)) {
            if (variantes.some(v => nombreCategoria.includes(v) && categoriaReceta.includes(categoria))) {
              return true
            }
          }
          
          return false
        })?.id_categoria
      }
      
      if (!categoriaId && categorias.length > 0) {
        categoriaId = categorias[0].id_categoria // Usar la primera categoría disponible
      }
      
      // Mapear ingredientes por nombre
      const ingredientesMapeados = receta.ingredientes.map(ing => {
        // Manejar diferentes formatos: "nombre: cantidad" o solo "nombre"
        let nombreIng, cantidad
        if (ing.includes(':')) {
          [nombreIng, cantidad] = ing.split(':').map(s => s.trim())
        } else {
          nombreIng = ing.trim()
          cantidad = '1 unidad'
        }
        
        // Buscar el ingrediente por nombre en la base de datos (búsqueda flexible)
        const ingredienteEncontrado = ingredientesDisponibles.find(ingDB => {
          const nombreDB = ingDB.nombre.toLowerCase()
          const nombreBuscado = nombreIng.toLowerCase()
          
          // Búsqueda exacta
          if (nombreDB === nombreBuscado) return true
          
          // Búsqueda parcial (contiene)
          if (nombreDB.includes(nombreBuscado) || nombreBuscado.includes(nombreDB)) return true
          
          // Búsqueda por palabras clave comunes
          const palabrasClave = {
            'pollo': ['pollo', 'chicken', 'muslo', 'pechuga'],
            'cebolla': ['cebolla', 'onion'],
            'ajo': ['ajo', 'garlic'],
            'tomate': ['tomate', 'tomato'],
            'arroz': ['arroz', 'rice'],
            'aceite': ['aceite', 'oil'],
            'sal': ['sal', 'salt'],
            'pimienta': ['pimienta', 'pepper']
          }
          
          for (const [clave, variantes] of Object.entries(palabrasClave)) {
            if (variantes.some(v => nombreDB.includes(v) && nombreBuscado.includes(clave))) {
              return true
            }
          }
          
          return false
        })
        
        console.log(`Buscando ingrediente: "${nombreIng}" -> Encontrado:`, ingredienteEncontrado)
        
        return {
          id_ingrediente: ingredienteEncontrado?.id_ingrediente || null,
          cantidad: cantidad || '1 unidad'
        }
      }).filter(ing => ing.id_ingrediente !== null) // Solo incluir ingredientes que existen en la BD
      
      // Agrupar ingredientes duplicados y combinar cantidades
      const ingredientesUnicos = {}
      ingredientesMapeados.forEach(ing => {
        const key = ing.id_ingrediente
        if (ingredientesUnicos[key]) {
          // Si ya existe, combinar las cantidades
          ingredientesUnicos[key].cantidad = `${ingredientesUnicos[key].cantidad} + ${ing.cantidad}`
        } else {
          ingredientesUnicos[key] = ing
        }
      })
      
      const ingredientesFinales = Object.values(ingredientesUnicos)
      
      console.log('Ingredientes disponibles:', ingredientesDisponibles.map(ing => ing.nombre))
      console.log('Ingredientes de la receta:', receta.ingredientes)
      console.log('Ingredientes mapeados:', ingredientesMapeados)
      console.log('Ingredientes finales (sin duplicados):', ingredientesFinales)

      // Validar que tengamos al menos algunos ingredientes
      if (ingredientesFinales.length === 0) {
        agregarMensaje('bot', 'Lo siento, no pude encontrar ninguno de los ingredientes de esta receta en tu base de datos. Asegúrate de tener los ingredientes agregados en la sección de Ingredientes.')
        return
      }

      // Crear la receta
      const nuevaReceta = {
        nombre: receta.nombre,
        descripcion: receta.descripcion,
        id_categoria: categoriaId || 1,
        tiempo_preparacion: receta.tiempoPreparacion || '30 min', // Usar el tiempo de la IA o valor por defecto
        dificultad: 'Medio', // Valor por defecto (debe coincidir con el ENUM de la BD)
        ingredientes: ingredientesFinales
      }
      
      console.log('Receta a guardar:', nuevaReceta)
      console.log('Ingredientes finales:', ingredientesFinales)
      
      await recetasAPI.create(nuevaReceta)
      
      agregarMensaje('bot', `¡Perfecto! He guardado la receta "${receta.nombre}" en tu colección. Ya puedes encontrarla en la sección de Recetas. 🎉`)
      
    } catch (error) {
      console.error('Error guardando receta:', error)
      console.error('Detalles del error:', error.response?.data || error.message)
      
      let mensajeError = 'Lo siento, hubo un problema al guardar la receta. '
      if (error.response?.data?.error?.includes('dificultad')) {
        mensajeError += 'Error en el campo de dificultad.'
      } else if (error.response?.data?.error?.includes('Data truncated')) {
        mensajeError += 'Algunos datos son demasiado largos para la base de datos.'
      } else {
        mensajeError += 'Inténtalo de nuevo.'
      }
      
      agregarMensaje('bot', mensajeError)
    } finally {
      setGuardandoReceta(false)
    }
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
6. INCLUYE SIEMPRE el tiempo de preparación y la categoría específica.

CATEGORÍAS DISPONIBLES (usa EXACTAMENTE una de estas con su ID):
- ID: 1 - Italiana
- ID: 2 - Mexicana  
- ID: 3 - Asiática
- ID: 4 - Ensaladas
- ID: 5 - Postres
- ID: 6 - Vegetariana
- ID: 7 - Carnes
- ID: 8 - Pescados

FORMATO DE TIEMPO: Usa formato "X minutos" o "X horas" (ej: "25 minutos", "1 hora", "45 minutos")

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

**Tiempo de preparación:** [X minutos/horas]
**Categoría:** [ID: X - Nombre de categoría] (ej: "ID: 3 - Asiática")

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
           
           // Parsear las recetas generadas
           const recetas = parsearRecetas(texto)
           console.log('Recetas parseadas:', recetas)
           setRecetasGeneradas(recetas)
      
      if (recetas.length > 0) {
        setPasoActual('seleccionar')
        agregarMensaje('bot', '¿Te gustaría guardar alguna de estas recetas en tu colección? Selecciona la que más te guste:')
      }

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

        {pasoActual === 'seleccionar' && recetasGeneradas.length > 0 && (
          <div style={styles.recetaSelector}>
            {recetasGeneradas.map((receta, index) => (
              <button
                key={index}
                style={styles.recetaButton}
                onClick={() => guardarReceta(receta)}
                disabled={guardandoReceta}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#8B5CF6'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e5e7eb'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <div style={styles.recetaNombre}>
                  {index + 1}. {receta.nombre}
                </div>
                <div style={styles.recetaDescripcion}>
                  {receta.descripcion}
                </div>
              </button>
            ))}
            <button
              style={styles.noGuardarButton}
              onClick={() => {
                agregarMensaje('usuario', 'No guardar ninguna receta')
                agregarMensaje('bot', 'Perfecto, no hay problema. ¡Espero que hayas disfrutado las sugerencias! Si necesitas más recetas, solo dime qué ingredientes tienes disponibles. 😊')
                setPasoActual('resultado')
              }}
              disabled={guardandoReceta}
            >
              No guardar ninguna receta
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
