// src/hooks/useAutenticacion.js
import { useContext } from 'react';
import { AutenticacionContext } from '../context/AutenticacionContext';

export const useAutenticacion = () => {
  const contexto = useContext(AutenticacionContext);

  if (!contexto) {
    throw new Error('useAutenticacion debe usarse dentro de un ProveedorAutenticacion');
  }

  return contexto;
};