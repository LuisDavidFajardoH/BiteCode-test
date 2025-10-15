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
  create: (data) => api.post('/ingredientes', data),
  update: (id, data) => api.put(`/ingredientes/${id}`, data),
  delete: (id) => api.delete(`/ingredientes/${id}`),
}

export const recetasAPI = {
  getAll: (categoria) => {
    const params = categoria ? { categoria } : {}
    return api.get('/recetas', { params })
  },
  getById: (id) => api.get(`/recetas/${id}`),
  create: (data) => api.post('/recetas', data),
  update: (id, data) => api.put(`/recetas/${id}`, data),
  delete: (id) => api.delete(`/recetas/${id}`),
  buscarDisponibles: (ingredientes) => api.post('/recetas/disponibles', { ingredientes }),
}

export const comprasAPI = {
  getAll: () => api.get('/compras'),
  getById: (id) => api.get(`/compras/${id}`),
  create: (data) => api.post('/compras', data),
  update: (id, data) => api.put(`/compras/${id}`, data),
  delete: (id) => api.delete(`/compras/${id}`),
}

export const categoriasAPI = {
  getAll: () => api.get('/categorias'),
}

export default api
