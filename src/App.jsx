// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ⭐️ 1. IMPORTAMOS LOS PROVEEDORES
// El proveedor de autenticación gestiona el Token y el usuario
import { AutenticacionProvider } from './context/AutenticacionProvider';
// El proveedor de la veterinaria gestiona los datos de clientes y mascotas
import { VeterinariaProvider } from './context/VeterinariaProvider';

// ⭐️ 2. IMPORTAMOS EL COMPONENTE GUARDIA (RUTA PROTEGIDA)
import { RutaProtegida } from './components/RutaProtegida';

// ⭐️ 3. IMPORTAMOS COMPONENTES Y VISTAS
import Navegacion from './components/Navegacion';
import VistaClientes from './components/VistaClientes';
import VistaDetalleCliente from './components/VistaDetalleCliente';
import VistaMascotas from './components/VistaMascotas';
import VistaConfiguracion from './components/VistaConfiguracion';
import Login from './components/Login';

function VeterinariaApp() {
  return (
    // ⭐️ CAPA 1: Proveedor de Autenticación envolviendo TODA la app
    <AutenticacionProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        
        {/* Definición global de Rutas */}
        <Routes>
          
          {/* 🔓 RUTA PÚBLICA: Pantalla de Login */}
          <Route 
            path="/login" 
            element={
              <main className="min-h-screen flex items-center justify-center p-4">
                <Login />
              </main>
            } 
          />

          {/* 🔐 RUTAS PROTEGIDAS (Zona VIP del sistema) */}
          {/* Todas las rutas dentro de este bloque pasan primero por el guardia 'RutaProtegida' */}
          <Route element={<RutaProtegida />}>
            <Route
              path="/*"
              element={
                // ⭐️ CAPA 2: Proveedor de Datos (VeterinariaProvider) solo activo cuando el usuario está autenticado
                <VeterinariaProvider>
                  <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-slate-200 dark:bg-slate-950/70 dark:border-slate-800">
                    <Navegacion />
                  </header>

                  <main className="container mx-auto px-4 py-8 max-w-7xl">
                    <Routes>
                      <Route path="/" element={<Navigate to="/clientes" replace />} />
                      <Route path="/clientes" element={<VistaClientes />} />
                      <Route path="/cliente/:id" element={<VistaDetalleCliente />} />
                      <Route path="/mascotas" element={<VistaMascotas />} />
                      <Route path="/config" element={<VistaConfiguracion />} />
                      
                      {/* Ruta 404 para URLs no encontradas dentro del panel */}
                      <Route 
                        path="*" 
                        element={
                          <div className="text-center py-20">
                            <h2 className="text-3xl font-bold text-slate-700 dark:text-slate-200">
                              404 | Página no encontrada
                            </h2>
                          </div>
                        } 
                      />
                    </Routes>
                  </main>
                </VeterinariaProvider>
              }
            />
          </Route>

        </Routes>
      </div>
    </AutenticacionProvider>
  );
}

export default VeterinariaApp;