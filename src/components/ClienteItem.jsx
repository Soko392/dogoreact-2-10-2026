// src/components/ClienteItem.jsx
import React, { useEffect, useState } from 'react';

function ClienteItem({ usuarios, cliente, onEliminar, onGuardar }) {
  const clienteUsuarioId = cliente.usuarioId ?? cliente.usuario_id;
  const [isEditing, setIsEditing] = useState(false);

  // Estados individuales para la edición de campos de cliente
  const [nombreEditado, setNombreEditado] = useState(cliente.nombre);
  const [apellidoEditado, setApellidoEditado] = useState(cliente.apellido || '');
  const [documentoEditado, setDocumentoEditado] = useState(cliente.documento || '');
  const [direccionEditada, setDireccionEditada] = useState(cliente.direccion || '');
  const [localidadEditada, setLocalidadEditada] = useState(cliente.localidad || '');
  const [telefonoEditado, setTelefonoEditado] = useState(cliente.telefono || '');
  const [emailEditado, setEmailEditado] = useState(cliente.email || '');
  const [usuarioIdEditado, setUsuarioIdEditado] = useState(clienteUsuarioId || '');

  // Manejo de la foto elegida para preview
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
  const fotoPreview = fotoSeleccionada?.url || '';

  useEffect(() => {
    return () => {
      if (fotoSeleccionada?.url) URL.revokeObjectURL(fotoSeleccionada.url);
    };
  }, [fotoSeleccionada]);

  // Ruta de imagen apuntando a clientes
  const fotoUrl = cliente.foto
    ? (/^(https?:|data:|blob:)/i.test(cliente.foto)
      ? cliente.foto
      : `http://localhost:3000/uploads/clientes/${cliente.foto.replace(/^\/+/, '')}`)
    : '';

  // Función helper para obtener el nombre del usuario asignado
  const getNombreUsuario = (id) => {
    if (!usuarios) return 'Sin asignar';
    const usuario = usuarios.find(u => Number(u.id) === Number(id));
    return usuario ? (usuario.nombre || usuario.email || `Usuario #${usuario.id}`) : 'Sin usuario';
  };

  const handleEditClick = () => {
    setNombreEditado(cliente.nombre);
    setApellidoEditado(cliente.apellido || '');
    setDocumentoEditado(cliente.documento || '');
    setDireccionEditada(cliente.direccion || '');
    setLocalidadEditada(cliente.localidad || '');
    setTelefonoEditado(cliente.telefono || '');
    setEmailEditado(cliente.email || '');
    setUsuarioIdEditado(clienteUsuarioId || '');
    setFotoSeleccionada(null);
    setIsEditing(true);
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    const clienteActualizado = {
      ...cliente,
      nombre: nombreEditado,
      apellido: apellidoEditado,
      documento: documentoEditado,
      direccion: direccionEditada,
      localidad: localidadEditada,
      telefono: telefonoEditado,
      email: emailEditado,
      usuario_id: usuarioIdEditado ? Number(usuarioIdEditado) : null,
    };
    onGuardar(clienteActualizado, fotoSeleccionada?.file);
    setIsEditing(false);
  };

  const handleCancelar = () => {
    setFotoSeleccionada(null);
    setIsEditing(false);
  };

  const handleEliminarClick = () => {
    if (window.confirm(`¿Seguro que quieres eliminar a ${cliente.nombre} ${cliente.apellido || ''}?`)) {
      onEliminar(cliente.id);
    }
  };

  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {isEditing ? (
        <form onSubmit={handleGuardar} className="p-4 bg-emerald-50 dark:bg-emerald-900/10 h-full flex flex-col gap-3">
          <img
            src={fotoPreview || fotoUrl}
            alt={`Foto de ${cliente.nombre}`}
            className={`${fotoPreview || fotoUrl ? 'block' : 'hidden'} w-full h-36 object-cover rounded-lg`}
          />
          {!fotoPreview && !fotoUrl && (
            <div className="w-full h-24 rounded-lg bg-emerald-100 dark:bg-slate-700 flex items-center justify-center text-4xl" aria-hidden="true">👤</div>
          )}

          <input
            type="text"
            value={nombreEditado}
            onChange={(e) => setNombreEditado(e.target.value)}
            className="w-full px-3 py-2 rounded border border-emerald-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white"
            placeholder="Nombre"
            aria-label="Nombre del cliente"
            required
          />

          <input
            type="text"
            value={apellidoEditado}
            onChange={(e) => setApellidoEditado(e.target.value)}
            className="w-full px-3 py-2 rounded border border-emerald-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white"
            placeholder="Apellido"
            aria-label="Apellido"
            required
          />

          <input
            type="text"
            value={documentoEditado}
            onChange={(e) => setDocumentoEditado(e.target.value)}
            className="w-full px-3 py-2 rounded border border-emerald-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white"
            placeholder="Documento"
            aria-label="Documento"
            required
          />

          <input
            type="text"
            value={telefonoEditado}
            onChange={(e) => setTelefonoEditado(e.target.value)}
            className="w-full px-3 py-2 rounded border border-emerald-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white"
            placeholder="Teléfono"
            aria-label="Teléfono"
          />

          <input
            type="text"
            value={direccionEditada}
            onChange={(e) => setDireccionEditada(e.target.value)}
            className="w-full px-3 py-2 rounded border border-emerald-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white"
            placeholder="Dirección"
            aria-label="Dirección"
          />

          <input
            type="text"
            value={localidadEditada}
            onChange={(e) => setLocalidadEditada(e.target.value)}
            className="w-full px-3 py-2 rounded border border-emerald-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white"
            placeholder="Localidad"
            aria-label="Localidad"
          />

          <input
            type="email"
            value={emailEditado}
            onChange={(e) => setEmailEditado(e.target.value)}
            className="w-full px-3 py-2 rounded border border-emerald-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white"
            placeholder="Email"
            aria-label="Email"
            required
          />

          {usuarios && (
            <select
              value={usuarioIdEditado}
              onChange={(e) => setUsuarioIdEditado(e.target.value)}
              aria-label="Usuario asignado"
              className="w-full px-3 py-2 rounded border border-emerald-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white"
            >
              <option value="">-- Selecciona un usuario --</option>
              {usuarios.map(u => (
                <option key={u.id} value={u.id}>
                  {u.nombre || u.email || u.id}
                </option>
              ))}
            </select>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setFotoSeleccionada(file ? { file, url: URL.createObjectURL(file) } : null);
            }}
            aria-label="Cambiar foto del cliente"
            className="w-full text-sm text-slate-600 dark:text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-100 file:px-3 file:py-2 file:font-medium file:text-emerald-700 hover:file:bg-emerald-200"
          />

          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={handleCancelar} className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-3 py-1.5 bg-white border border-slate-300 rounded shadow-sm hover:bg-slate-50">Cancelar</button>
            <button type="submit" className="text-xs font-semibold text-white px-3 py-1.5 bg-emerald-600 rounded shadow-sm hover:bg-emerald-700">Guardar</button>
          </div>
        </form>
      ) : (
        <div className="p-5 flex flex-col h-full">
          {fotoUrl ? (
            <img src={fotoUrl} alt={`Foto de ${cliente.nombre}`} className="w-full h-44 object-cover rounded-lg mb-4" />
          ) : (
            <div className="w-full h-32 rounded-lg bg-emerald-50 dark:bg-slate-700 flex items-center justify-center text-5xl mb-4" aria-label="Sin foto disponible">👤</div>
          )}

          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div>
                <h4 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">
                  {cliente.nombre} {cliente.apellido}
                </h4>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 space-y-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">DNI / Doc:</span> {cliente.documento || 'S/D'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">Teléfono:</span> {cliente.telefono || 'S/D'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">Dirección:</span> {cliente.direccion || 'S/D'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">Localidad:</span> {cliente.localidad || 'S/D'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">Email:</span> {cliente.email || 'S/D'}
            </p>
            {clienteUsuarioId && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">Usuario Asignado:</span> {getNombreUsuario(clienteUsuarioId)}
              </p>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleEditClick}
              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              title="Editar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </button>
            <button
              onClick={handleEliminarClick}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Editar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default ClienteItem;