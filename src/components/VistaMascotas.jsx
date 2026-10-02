// src/components/VistaMascotas.jsx
import React, { useContext } from 'react';
import { VeterinariaContext } from '../context/VeterinariaContext';
import FormularioMascota from './FormularioMascota';
import MascotaItem from './MascotaItem';

function VistaMascotas() {
    const {
        clientes,
        mascotas,
        agregarMascota,
        actualizarMascota,
        eliminarMascota
    } = useContext(VeterinariaContext);

    return (
        <div className="space-y-10 animate-fade-in-up">
            {/* Encabezado */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                        Gestión de Mascotas
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        Registro de pacientes y su vinculación con los dueños.
                    </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-800/30">
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        Total Pacientes: <strong className="text-lg ml-1">{mascotas.length}</strong>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Formulario */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <FormularioMascota
                            clientes={clientes}
                            onMascotaAgregada={agregarMascota}
                        />
                    </div>
                </div>

                {/* Lista */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <span className="bg-emerald-500 w-2 h-6 rounded-full inline-block"></span>
                        Pacientes Registrados
                    </h3>

                    {mascotas.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                            <span className="text-4xl mb-3 block">🐈</span>
                            <p className="text-slate-500 dark:text-slate-400 text-lg">No hay mascotas registradas.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                            {mascotas.map(mascota => (
                                <MascotaItem
                                    key={mascota.id}
                                    clientes={clientes}
                                    mascota={mascota}
                                    onEliminar={eliminarMascota}
                                    onGuardar={actualizarMascota}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default VistaMascotas;
