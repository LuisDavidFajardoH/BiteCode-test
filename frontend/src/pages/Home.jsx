import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/buscar-recetas?search=${encodeURIComponent(searchTerm.trim())}`)
    }
  }
  const features = [
    {
      title: 'Gestionar Ingredientes',
      description: 'Agrega, edita y elimina ingredientes de tu despensa',
      link: '/ingredientes',
      color: 'green',
      icon: (
        <div style={{fontSize: '2.5rem', color: 'white'}}>
          🥕
        </div>
      ),
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      title: 'Gestionar Recetas',
      description: 'Crea y modifica recetas con sus ingredientes y cantidades',
      link: '/recetas',
      color: 'blue',
      icon: (
        <div style={{fontSize: '2.5rem', color: 'white'}}>
          📖
        </div>
      ),
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      title: 'Buscar Recetas',
      description: 'Encuentra recetas que puedes preparar con tus ingredientes',
      link: '/buscar-recetas',
      color: 'purple',
      icon: (
        <div style={{fontSize: '2.5rem', color: 'white'}}>
          🔍
        </div>
      ),
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      title: 'Gestionar Compras',
      description: 'Registra tus compras de ingredientes',
      link: '/compras',
      color: 'orange',
      icon: (
        <div style={{fontSize: '2.5rem', color: 'white'}}>
          🛒
        </div>
      ),
      gradient: 'from-orange-400 to-red-500'
    },
    {
      title: 'AntonIA',
      description: 'Tu asistente culinario inteligente con IA para generar recetas personalizadas',
      link: '/antonia',
      color: 'pink',
      icon: (
        <div style={{fontSize: '2.5rem', color: 'white'}}>
          🤖
        </div>
      ),
      gradient: 'from-pink-400 to-rose-500'
    }
  ]

  return (
    <div>
      <div className="hero-section">
        <div className="hero-plate">
          <img src="/images/comida.png" alt="Comida gourmet" />
        </div>
        
        <div className="hero-cards">
          <div className="hero-card left">
            <div className="card-image">
              <img src="/images/pasta.jpg" alt="Plato de pasta" />
            </div>
            <div className="card-content">
              <h3>Recetas Populares</h3>
              <p>Descubre las recetas más populares y deliciosas de nuestra comunidad</p>
            </div>
          </div>
          
          <div className="hero-card right">
            <div className="card-image">
              <img src="/images/paella.jpg" alt="Receta gourmet" />
            </div>
            <div className="card-content">
              <h3>Explora recetas</h3>
              <p>Viaja por el mundo a través de sabores auténticos y tradicionales</p>
            </div>
          </div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            FlavorFusion
          </h1>
          <p className="hero-subtitle">
            Organiza tus recetas, gestiona tus ingredientes y descubre qué puedes cocinar
            con lo que tienes en casa.
          </p>
          
          <form className="hero-search" onSubmit={handleSearch}>
            <input 
              type="text"
              style={{color: 'black'}}
              className="search-input" 
              placeholder="Buscar recetas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-icon">
              🔍
            </button>
          </form>
        </div>
      </div>

      <div className="content-section">
        <h2 className="content-title">
          Utensilios Web
        </h2>
        <p className="content-description">
          Explora todas las herramientas disponibles para gestionar tu cocina de manera eficiente
        </p>

        <Link to="/recetas" className="start-cooking-btn">
          ¡A cocinar!
        </Link>

        <div className="modern-features-grid">
          {features.map((feature, index) => (
            <div key={index} className={`modern-feature-card ${feature.color}`}>
              <div className="feature-icon-container">
                <div className="feature-icon">
                  {feature.icon}
                </div>
              </div>
              <div className="feature-content">
                <h3 className="modern-feature-title">
                  {feature.title}
                </h3>
                <p className="modern-feature-description">
                  {feature.description}
                </p>
                <Link 
                  to={feature.link} 
                  className={`modern-feature-button ${feature.color}`}
                >
                  Explorar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
