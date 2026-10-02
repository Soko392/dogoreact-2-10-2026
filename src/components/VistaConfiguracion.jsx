// src/components/VistaConfiguracion.jsx
import React from 'react';

function VistaConfiguracion() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-fade-in-up">
      <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-5xl mb-4 shadow-inner">
        ⚙️
      </div>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Configuración del Sistema</h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        Aquí podrás gestionar usuarios, permisos y ajustes generales de la veterinaria.
      </p>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-lg p-4 max-w-lg">
        <h4 className="font-bold text-yellow-800 dark:text-yellow-400 flex items-center justify-center gap-2">
          <span>🚧</span> En Construcción
        </h4>
        <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
          Estamos trabajando en este módulo para futuras actualizaciones.
        </p>
      </div>
    </div>
  );
}
export default VistaConfiguracion;