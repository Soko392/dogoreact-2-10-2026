// src/components/Navegacion.jsx
import React from 'react';
// ⭐️ CAMBIO 1: Cambiamos Link por NavLink para navegación directa y agregamos useNavigate
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// ⭐️ CAMBIO 2: Importamos el Hook de Autenticación para acceder al usuario y a la función de logout
import { useAutenticacion } from '../hooks/useAutenticacion';

function Navegacion() {
  const location = useLocation();
  const navegar = useNavigate();

  // ⭐️ CAMBIO 3: Obtenemos el usuario actual y la función para cerrar sesión desde el contexto
  const { usuarioActual, cerrarSesion } = useAutenticacion();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => `
    text-sm font-medium transition-colors duration-200
    ${isActive(path)
      ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'}
  `;

  // ⭐️ CAMBIO 4: Manejador para cerrar sesión y redirigir
  const manejarCierreSesion = () => {
    cerrarSesion();
    navegar('/login');
  };

  return (
    <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
      <div className="flex lg:flex-1">
        <Link to="/clientes" className="-m-1.5 p-1.5 flex items-center gap-2 group">
          <span className="sr-only">El Dogo</span>
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg transition-transform group-hover:scale-110">
            <span className="text-xl">🐾</span>
          </div>
          <span className="font-bold text-xl text-slate-800 dark:text-white tracking-tight">El Dogo</span>
        </Link>
      </div>

      {/* Menú Mobile */}
      <div className="flex lg:hidden">
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 dark:text-slate-200">
          <span className="sr-only">Abrir menú</span>
          <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Enlaces Principales */}
      <div className="hidden lg:flex lg:gap-x-12">
        <Link to="/clientes" className={linkClass('/clientes')}>Clientes</Link>
        <Link to="/mascotas" className={linkClass('/mascotas')}>Mascotas</Link>
        <Link to="/config" className={linkClass('/config')}>Configuración</Link>
      </div>

      {/* ⭐️ CAMBIO 5: Identificador de Usuario Dinámico + Botón de Salida */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
        <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          {/* Muestra el correo o nombre del usuario autenticado de forma dinámica */}
          {usuarioActual?.correoElectronico || usuarioActual?.email || 'Usuario Conectado'}
        </div>

        {/* Botón de Cierre de Sesión integrado */}
        <button
          onClick={manejarCierreSesion}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/40 dark:hover:bg-red-900/60 dark:text-red-400 transition-colors duration-200 border border-red-200 dark:border-red-900"
        >
          Salir 🚪
        </button>
      </div>
    </nav>
  );
}

export default Navegacion;