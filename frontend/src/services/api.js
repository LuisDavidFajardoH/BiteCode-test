import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const ingredientesAPI = {
  getAll: () => api.get('/ingredientes'),
  getById: (id) => api.get(`/ingredientes/${id}`),
  create: (data) => api.post('/ingredientes', {
    nombre: data.nombre,
    unidad_medida: data.unidad
  }),
  update: (id, data) => api.put(`/ingredientes/${id}`, {
    nombre: data.nombre,
    unidad_medida: data.unidad
  }),
  delete: (id) => api.delete(`/ingredientes/${id}`),
}

export const recetasAPI = {
  getAll: () => api.get('/recetas'),
  getById: (id) => api.get(`/recetas/${id}`),
  create: (data) => api.post('/recetas', {
    nombre: data.nombre,
    descripcion: data.descripcion,
    id_categoria: data.categoria,
    tiempo_preparacion: data.tiempo,
    dificultad: data.dificultad,
    ingredientes: data.ingredientes
  }),
  update: (id, data) => api.put(`/recetas/${id}`, {
    nombre: data.nombre,
    descripcion: data.descripcion,
    id_categoria: data.categoria,
    tiempo_preparacion: data.tiempo,
    dificultad: data.dificultad,
    ingredientes: data.ingredientes
  }),
  delete: (id) => api.delete(`/recetas/${id}`),
  buscarPorIngredientes: (ingredientes) => api.post('/recetas/buscar', { ingredientes })
}

export const comprasAPI = {
  getAll: () => api.get('/compras'),
  getById: (id) => api.get(`/compras/${id}`),
  create: (data) => api.post('/compras', {
    id_ingrediente: data.ingrediente,
    fecha_compra: data.fecha,
    cantidad: data.cantidad,
    precio: data.precio
  }),
  update: (id, data) => api.put(`/compras/${id}`, {
    id_ingrediente: data.ingrediente,
    fecha_compra: data.fecha,
    cantidad: data.cantidad,
    precio: data.precio
  }),
  delete: (id) => api.delete(`/compras/${id}`),
  getTotal: () => api.get('/compras/total')
}

export const categoriasAPI = {
  getAll: () => api.get('/categorias'),
  getById: (id) => api.get(`/categorias/${id}`),
  create: (data) => api.post('/categorias', { nombre: data.nombre }),
  update: (id, data) => api.put(`/categorias/${id}`, { nombre: data.nombre }),
  delete: (id) => api.delete(`/categorias/${id}`)
}

export default api
