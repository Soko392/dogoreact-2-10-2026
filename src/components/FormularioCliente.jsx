// src/components/FormularioCliente.jsx
import React, { useState } from 'react';

function FormularioCliente({ usuarios, onClienteAgregado }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [documento, setDocumento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [foto, setFoto] = useState(null);

  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleApellidoChange = (e) => setApellido(e.target.value);
  const handleDocumentoChange = (e) => setDocumento(e.target.value);
  const handleDireccionChange = (e) => setDireccion(e.target.value);
  const handleLocalidadChange = (e) => setLocalidad(e.target.value);
  const handleTelefonoChange = (e) => setTelefono(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !documento || !email) {
      alert('Por favor, completa Nombre, Apellido, Documento y Email.');
      return;
    }

    const nuevoCliente = new FormData();
    nuevoCliente.append('nombre', nombre);
    nuevoCliente.append('apellido', apellido);
    nuevoCliente.append('documento', documento);
    nuevoCliente.append('direccion', direccion);
    nuevoCliente.append('localidad', localidad);
    nuevoCliente.append('telefono', telefono);
    nuevoCliente.append('email', email);
    nuevoCliente.append('usuario_id', usuarioId);
    if (foto) nuevoCliente.append('foto', foto);

    onClienteAgregado(nuevoCliente);

    setNombre('');
    setApellido('');
    setDocumento('');
    setDireccion('');
    setLocalidad('');
    setTelefono('');
    setEmail('');
    setUsuarioId('');
    setFoto(null);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-2xl">
          👤
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Nuevo Cliente</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selector de Usuario / Usuario ID */}
        {usuarios && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Usuario Asignado
            </label>
            <select
              value={usuarioId}
              onChange={(e) => setUsuarioId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
            >
              <option value="">-- Selecciona un usuario --</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre || u.email || u.id}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Nombre y Apellido */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={handleNombreChange}
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
              placeholder="WALTER EDGARDO"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Apellido
            </label>
            <input
              type="text"
              value={apellido}
              onChange={handleApellidoChange}
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
              placeholder="LAUXMANN"
              required
            />
          </div>
        </div>

        {/* Documento y Teléfono */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Documento
            </label>
            <input
              type="text"
              value={documento}
              onChange={handleDocumentoChange}
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
              placeholder="20305442"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              value={telefono}
              onChange={handleTelefonoChange}
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
              placeholder="3476623676"
            />
          </div>
        </div>

        {/* Dirección y Localidad */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={direccion}
              onChange={handleDireccionChange}
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
              placeholder="S/D"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Localidad
            </label>
            <input
              type="text"
              value={localidad}
              onChange={handleLocalidadChange}
              className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
              placeholder="S/D"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all dark:text-white"
            placeholder="walterlauxmann@institutocedec.com"
            required
          />
        </div>

        {/* Foto (opcional) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Foto (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files?.[0] || null)}
            className="w-full text-sm text-slate-600 dark:text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:font-medium file:text-emerald-700 hover:file:bg-emerald-100"
          />
        </div>

        {/* Botón Submit */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex justify-center items-center gap-2"
        >
          <span> </span> Registrar Cliente
        </button>
      </form>
    </div>
  );
}

export default FormularioCliente;