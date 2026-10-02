import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../hooks/useAutenticacion';

export const VistaLogin = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const { iniciarSesion } = useAutenticacion();
  const navegar = useNavigate();

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setMensajeError('');

    const resultado = await iniciarSesion(correoElectronico, contrasena);

    if (resultado.exito) {
      navegar('/clientes');
    } else {
      setMensajeError(resultado.mensaje);
    }
  };

  return (
    <div className="contenedor-login">
      <h2>Veterinaria "El Dogo" 🐾</h2>
      <h3>Iniciar Sesión</h3>

      {mensajeError && <p className="mensaje-error">{mensajeError}</p>}

      <form onSubmit={manejarEnvio}>
        <div>
          <label>Correo Electrónico:</label>

          <input
            type="email"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>

          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};
