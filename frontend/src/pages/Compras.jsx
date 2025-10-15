import { useState, useEffect } from 'react'
import { comprasAPI, ingredientesAPI } from '../services/api'

function Compras() {
  const [compras, setCompras] = useState([])
  const [ingredientes, setIngredientes] = useState([])
  const [totalGastado, setTotalGastado] = useState(0)
  const [loading, setLoading] = useState(true)
  const [nuevaCompra, setNuevaCompra] = useState({ 
    ingrediente: '', 
    cantidad: '', 
    unidad: '', 
    fecha: '',
    precio: ''
  })

  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const handleIngredienteChange = (ingredienteId) => {
    const ingredienteSeleccionado = ingredientes.find(ing => ing.id_ingrediente == ingredienteId)
    setNuevaCompra({
      ...nuevaCompra,
      ingrediente: ingredienteId,
      unidad: ingredienteSeleccionado ? ingredienteSeleccionado.unidad_medida : ''
    })
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [comprasResponse, ingredientesResponse, totalResponse] = await Promise.all([
        comprasAPI.getAll(),
        ingredientesAPI.getAll(),
        comprasAPI.getTotal()
      ])
      console.log('Ingredientes cargados:', ingredientesResponse.data)
      setCompras(comprasResponse.data)
      setIngredientes(ingredientesResponse.data)
      setTotalGastado(parseFloat(totalResponse.data.total))
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const agregarCompra = async () => {
    if (nuevaCompra.ingrediente && nuevaCompra.cantidad && nuevaCompra.fecha) {
      try {
        await comprasAPI.create(nuevaCompra)
        setNuevaCompra({ ingrediente: '', cantidad: '', unidad: '', fecha: '', precio: '' })
        setMostrarFormulario(false)
        await cargarDatos()
      } catch (error) {
        console.error('Error agregando compra:', error)
      }
    }
  }

  const eliminarCompra = async (id) => {
    try {
      await comprasAPI.delete(id)
      cargarDatos()
    } catch (error) {
      console.error('Error eliminando compra:', error)
    }
  }

  return (
    <div className="compras-page">
      <div className="page-header">
        <h1 className="page-title">Gestionar Compras</h1>
        <p className="page-description">
          Registra tus compras de ingredientes para llevar un control de tu despensa
        </p>
        <div className="header-actions">
          <div className="total-gastado">
            <span>Total gastado: ${totalGastado.toFixed(2)}</span>
          </div>
          <button 
            className="add-button orange"
            onClick={() => setMostrarFormulario(true)}
          >
            + Nueva Compra
          </button>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="form-modal">
          <div className="form-container">
            <h3>Nueva Compra</h3>
            <div className="form-group">
              <select
                value={nuevaCompra.ingrediente}
                onChange={(e) => handleIngredienteChange(e.target.value)}
              >
                <option value="">Seleccionar ingrediente</option>
                {ingredientes.length > 0 ? (
                  ingredientes.map(ing => (
                    <option key={ing.id_ingrediente} value={ing.id_ingrediente}>{ing.nombre}</option>
                  ))
                ) : (
                  <option disabled>No hay ingredientes disponibles</option>
                )}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={nuevaCompra.cantidad}
                  onChange={(e) => setNuevaCompra({...nuevaCompra, cantidad: e.target.value})}
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Unidad"
                  value={nuevaCompra.unidad}
                  onChange={(e) => setNuevaCompra({...nuevaCompra, unidad: e.target.value})}
                  readOnly
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="date"
                  value={nuevaCompra.fecha}
                  onChange={(e) => setNuevaCompra({...nuevaCompra, fecha: e.target.value})}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Precio ($)"
                  value={nuevaCompra.precio}
                  onChange={(e) => setNuevaCompra({...nuevaCompra, precio: e.target.value})}
                  step="0.01"
                />
              </div>
            </div>
            <div className="form-actions">
              <button className="cancel-button" onClick={() => setMostrarFormulario(false)}>
                Cancelar
              </button>
              <button className="save-button orange" onClick={agregarCompra}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">
          <p>Cargando compras...</p>
        </div>
      ) : (
        <div className="compras-table">
          <div className="table-header">
            <div>Ingrediente</div>
            <div>Cantidad</div>
            <div>Fecha</div>
            <div>Precio</div>
            <div>Acciones</div>
          </div>
          {compras.map(compra => (
            <div key={compra.id_compra} className="table-row">
              <div className="ingrediente-cell">
                <strong>{compra.Ingrediente?.nombre || 'Ingrediente no encontrado'}</strong>
              </div>
              <div className="cantidad-cell">
                {compra.cantidad} {compra.Ingrediente?.unidad_medida || ''}
              </div>
              <div className="fecha-cell">
                {new Date(compra.fecha_compra).toLocaleDateString()}
              </div>
              <div className="precio-cell">
                ${parseFloat(compra.precio).toFixed(2)}
              </div>
              <div className="acciones-cell">
                <button className="edit-button">Editar</button>
                <button 
                  className="delete-button"
                  onClick={() => eliminarCompra(compra.id_compra)}
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

export default Compras
