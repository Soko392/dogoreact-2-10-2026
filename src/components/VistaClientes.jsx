// src/components/VistaClientes.jsx
import React, { useContext } from 'react';
import { VeterinariaContext } from '../context/VeterinariaContext';
import FormularioCliente from './FormularioCliente';
import ClienteItem from './ClienteItem';

function VistaClientes() {
  const {
    clientes,
    agregarCliente,
    actualizarCliente,
    eliminarCliente
  } = useContext(VeterinariaContext);

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* Encabezado de la Vista */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            Gestión de Clientes
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Administra el directorio de propietarios y sus datos de contacto.
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-800/30">
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            Total Clientes: <strong className="text-lg ml-1">{clientes.length}</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Formulario (Sticky si es posible) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <FormularioCliente onClienteAgregado={agregarCliente} />
          </div>
        </div>

        {/* Columna Derecha: Lista de Clientes */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="bg-indigo-600 w-2 h-6 rounded-full inline-block"></span>
            Directorio de Clientes
          </h3>

          {clientes.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <span className="text-4xl mb-3 block">📭</span>
              <p className="text-slate-500 dark:text-slate-400 text-lg">No hay clientes registrados.</p>
              <p className="text-slate-400 text-sm">Utiliza el formulario para añadir el primero.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {clientes.map((cliente) => (
                <ClienteItem
                  key={cliente.id}
                  cliente={cliente}
                  onEliminar={eliminarCliente}
                  onGuardar={actualizarCliente}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VistaClientes;
