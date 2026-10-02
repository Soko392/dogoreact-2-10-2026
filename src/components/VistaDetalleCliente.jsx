// src/components/VistaDetalleCliente.jsx

import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VeterinariaContext } from '../context/VeterinariaContext';

function VistaDetalleCliente() {
    const { clientes, mascotas } = useContext(VeterinariaContext);
    const { id: clienteIdString } = useParams();
    const clienteId = Number(clienteIdString);

    const cliente = clientes.find(c => c.id === clienteId);

    if (!cliente) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center">
                <div className="text-6xl mb-4">🤷‍♂️</div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Cliente no encontrado</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">No pudimos encontrar un cliente con ID: {clienteId}</p>
                <Link to="/" className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Regresar al inicio</Link>
            </div>
        );
    }

    const mascotasDelCliente = mascotas.filter(m => m.clienteId === clienteId);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                Volver a la Lista de Clientes
            </Link>

            {/* Tarjeta del Cliente */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-bl-full -mr-8 -mt-8"></div>
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {cliente.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{cliente.nombre}</h2>
                        <div className="flex items-center gap-2 mt-2 text-slate-500 dark:text-slate-400 text-lg">
                            <span>📞</span> {cliente.telefono}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de Mascotas */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <span className="text-2xl">🐾</span>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                        Mascotas Registradas ({mascotasDelCliente.length})
                    </h3>
                </div>

                {mascotasDelCliente.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                        <p className="text-slate-500 dark:text-slate-400">Este cliente aún no tiene mascotas registradas.</p>
                        <Link to="/mascotas" className="text-indigo-600 hover:underline mt-2 inline-block font-medium">Registrar una nueva mascota</Link>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {mascotasDelCliente.map(mascota => (
                            <div key={mascota.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
                                    🐕
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-800 dark:text-white">{mascota.nombre}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Especie: {mascota.especie}</p>
                                    {mascota.raza && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Raza: {mascota.raza}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default VistaDetalleCliente;