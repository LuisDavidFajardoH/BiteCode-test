import { useState } from 'react'

function Compras() {
  const [compras, setCompras] = useState([
    { 
      id: 1, 
      ingrediente: 'Tomate', 
      cantidad: 2, 
      unidad: 'kg', 
      fecha: '2024-01-15',
      precio: 3.50
    },
    { 
      id: 2, 
      ingrediente: 'Cebolla', 
      cantidad: 1, 
      unidad: 'kg', 
      fecha: '2024-01-14',
      precio: 2.00
    }
  ])

  const [nuevaCompra, setNuevaCompra] = useState({ 
    ingrediente: '', 
    cantidad: '', 
    unidad: '', 
    fecha: '',
    precio: ''
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const ingredientes = ['Tomate', 'Cebolla', 'Ajo', 'Aceite de oliva', 'Pasta', 'Queso', 'Pollo', 'Carne']

  const agregarCompra = () => {
    if (nuevaCompra.ingrediente && nuevaCompra.cantidad && nuevaCompra.fecha) {
      setCompras([...compras, {
        id: Date.now(),
        ...nuevaCompra,
        cantidad: parseFloat(nuevaCompra.cantidad),
        precio: parseFloat(nuevaCompra.precio) || 0
      }])
      setNuevaCompra({ ingrediente: '', cantidad: '', unidad: '', fecha: '', precio: '' })
      setMostrarFormulario(false)
    }
  }

  const eliminarCompra = (id) => {
    setCompras(compras.filter(comp => comp.id !== id))
  }

  const totalGastado = compras.reduce((total, compra) => total + (compra.precio || 0), 0)

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
                onChange={(e) => setNuevaCompra({...nuevaCompra, ingrediente: e.target.value})}
              >
                <option value="">Seleccionar ingrediente</option>
                {ingredientes.map(ing => (
                  <option key={ing} value={ing}>{ing}</option>
                ))}
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
                <select
                  value={nuevaCompra.unidad}
                  onChange={(e) => setNuevaCompra({...nuevaCompra, unidad: e.target.value})}
                >
                  <option value="">Unidad</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="l">l</option>
                  <option value="ml">ml</option>
                  <option value="unidad">unidad</option>
                </select>
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

      <div className="compras-table">
        <div className="table-header">
          <div>Ingrediente</div>
          <div>Cantidad</div>
          <div>Fecha</div>
          <div>Precio</div>
          <div>Acciones</div>
        </div>
        {compras.map(compra => (
          <div key={compra.id} className="table-row">
            <div className="ingrediente-cell">
              <strong>{compra.ingrediente}</strong>
            </div>
            <div className="cantidad-cell">
              {compra.cantidad} {compra.unidad}
            </div>
            <div className="fecha-cell">
              {new Date(compra.fecha).toLocaleDateString()}
            </div>
            <div className="precio-cell">
              ${compra.precio.toFixed(2)}
            </div>
            <div className="acciones-cell">
              <button className="edit-button">Editar</button>
              <button 
                className="delete-button"
                onClick={() => eliminarCompra(compra.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Compras
