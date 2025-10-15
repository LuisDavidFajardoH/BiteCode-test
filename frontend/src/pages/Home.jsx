import { Link } from 'react-router-dom'

function Home() {
  const features = [
    {
      title: 'Gestionar Ingredientes',
      description: 'Agrega, edita y elimina ingredientes de tu despensa',
      link: '/ingredientes',
      color: 'green'
    },
    {
      title: 'Gestionar Recetas',
      description: 'Crea y modifica recetas con sus ingredientes y cantidades',
      link: '/recetas',
      color: 'blue'
    },
    {
      title: 'Buscar Recetas',
      description: 'Encuentra recetas que puedes preparar con tus ingredientes',
      link: '/buscar-recetas',
      color: 'purple'
    },
    {
      title: 'Gestionar Compras',
      description: 'Registra tus compras de ingredientes',
      link: '/compras',
      color: 'orange'
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
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop&crop=center" alt="Plato de comida" />
            </div>
            <div className="card-content">
              <h3>Trending Recipes</h3>
              <p>Descubre las recetas más populares y deliciosas de nuestra comunidad</p>
            </div>
          </div>
          
          <div className="hero-card right">
            <div className="card-image">
              <img src="https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=200&fit=crop&crop=center" alt="Receta gourmet" />
            </div>
            <div className="card-content">
              <h3>Explore Cuisines</h3>
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
          
          <div className="hero-search">
            <input 
              type="text"
              style={{color: 'black'}}
              className="search-input" 
              placeholder="Buscar recetas..."
            />
            <div className="search-icon">🔍</div>
          </div>
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
          Start Cooking
        </Link>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className={`feature-card ${feature.color}`}>
              <h3 className="feature-title">
                {feature.title}
              </h3>
              <p className="feature-description">
                {feature.description}
              </p>
              <Link 
                to={feature.link} 
                className={`feature-button ${feature.color}`}
              >
                Ir a {feature.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
