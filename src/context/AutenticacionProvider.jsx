// src/context/AutenticacionContexto.jsx
import React, { useState } from 'react';
import clienteApi from '../api/axios';
// Importamos el contexto puro desde su nuevo archivo
import { AutenticacionContext } from './AutenticacionContext';

export const AutenticacionProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const tokenGuardado = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('user');

    if (tokenGuardado && usuarioGuardado) {
      try {
        return JSON.parse(usuarioGuardado);
      } catch (error) {
        console.error('Error al parsear datos de usuario:', error);
        return null;
      }
    }
    return null;
  });

  const iniciarSesion = async (email, passwordPlain) => {
    try {
      const respuesta = await clienteApi.post('/auth/login', {
        email,
        passwordPlain,
      });

      const { token, user } = respuesta.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setUsuarioActual(user);
      return { exito: true };
    } catch (error) {
      const mensajeError = error.response?.data?.mensaje || 'Error al iniciar sesión';
      return { exito: false, mensaje: mensajeError };
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsuarioActual(null);
  };

  const valoresContexto = {
    usuarioActual,
    iniciarSesion,
    cerrarSesion,
  };

  return (
    <AutenticacionContext.Provider value={valoresContexto}>
      {children}
    </AutenticacionContext.Provider>
  );
};