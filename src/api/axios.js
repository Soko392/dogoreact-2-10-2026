// src/api/axios.js

import axios from 'axios';

// ⭐️ Creamos una instancia de Axios con la Base URL de nuestro backend
const api = axios.create({
    baseURL: 'http://localhost:3000/', // Asegúrate de que el puerto coincida con tu Express
});

// Interceptor: Antes de enviar cualquier petición, adjunta el Token si existe
api.interceptors.request.use(
  (configuracion) => {
    const tokenGuardado = localStorage.getItem('token');
    if (tokenGuardado) {
      configuracion.headers.Authorization = `Bearer ${tokenGuardado}`;
    }
    return configuracion;
  },
  (error) => Promise.reject(error)
);
export default api;