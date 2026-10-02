// src/components/FormularioMascota.jsx
import React, { useState } from 'react';
function FormularioMascota({ clientes, onMascotaAgregada }) {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [clientesId, setClienteId] = useState('');
  const [foto, setFoto] = useState(null);
  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleEspecieChange = (e) => setEspecie(e.target.value);
  const handleRazaChange = (e) => setRaza(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !especie || !clientesId) {
      alert('Por favor, completa Nombre, Especie y Dueño.');
      return;
    }
    const nuevaMascota = new FormData();
    nuevaMascota.append('nombre', nombre);
    nuevaMascota.append('especie', especie);
    nuevaMascota.append('raza', raza);
    nuevaMascota.append('clientesId', clientesId);
    if (foto) nuevaMascota.append('foto', foto);
    onMascotaAgregada(nuevaMascota);
    setNombre('');
    setEspecie('');
    setRaza('');
    setClienteId('');
    setFoto(null);
  };
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100
dark:border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-2xl">
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Nueva Mascota</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Dueño (Cliente)
          </label>
          <select
            value={clientesId}
            onChange={(e) => setClienteId(e.target.value)}
            required

            className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-
slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500

outline-none transition-all dark:text-white"
          >
            <option value="">-- Selecciona un dueño --</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Nombre Mascota
          </label>
          <input
            type="text"
            value={nombre}
            onChange={handleNombreChange}

            className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-
slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500

outline-none transition-all dark:text-white"
            placeholder="Ej. Firulais"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Especie
            </label>
            <input
              type="text"
              value={especie}
              onChange={handleEspecieChange}

              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-
slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500

outline-none transition-all dark:text-white"
              placeholder="Perro, Gato..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Raza (Opcional)
            </label>
            <input
              type="text"
              value={raza}
              onChange={handleRazaChange}

              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-
slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500

outline-none transition-all dark:text-white"
              placeholder="Golden Retriever"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Foto (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files?.[0] || null)}
            className="w-full text-sm text-slate-600 dark:text-slate-300 file:mr-3 file:rounded-lg
file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:font-medium file:text-emerald-700
hover:file:bg-emerald-100"
          />
        </div>
        <button
          type="submit"

          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-
4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5

active:scale-95 flex justify-center items-center gap-2"
        >
          <span> </span> Registrar Paciente
        </button>
      </form>
    </div>
  );
}
export default FormularioMascota;