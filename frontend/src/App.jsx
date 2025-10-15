import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Ingredientes from './pages/Ingredientes'
import Recetas from './pages/Recetas'
import Compras from './pages/Compras'
import BuscarRecetas from './pages/BuscarRecetas'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-title">FLAVORFUSION</h1>
            <div className="nav-buttons">
              <Link to="/" className="nav-button">Inicio</Link>
              <Link to="/ingredientes" className="nav-button">Ingredientes</Link>
              <Link to="/recetas" className="nav-button">Recetas</Link>
              <Link to="/buscar-recetas" className="nav-button">Buscar</Link>
              <Link to="/compras" className="nav-button">Compras</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ingredientes" element={<Ingredientes />} />
              <Route path="/recetas" element={<Recetas />} />
              <Route path="/buscar-recetas" element={<BuscarRecetas />} />
              <Route path="/compras" element={<Compras />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App