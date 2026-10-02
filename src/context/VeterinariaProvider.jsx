// src/context/VeterinariaContext.jsx (Migración a API)

import React, { useState, useEffect } from 'react';
import { VeterinariaContext } from './VeterinariaContext'; // ⭐️ 1. Importamos el contexto desde el archivo separado
import { useApi } from '../hooks/useApi'; // ⭐️ Importamos el nuevo hook

// ⭐️ CREAR EL PROVEEDOR (El componente que envuelve la app y gestiona el estado)
export const VeterinariaProvider = ({ children }) => {   
   
    // El estado inicial es un array vacío, ya que los datos vienen de la API.
    const [clientes, setClientes] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejo de carga

    // ⭐️ Instanciamos los hooks de API para cada endpoint
    const clientesApi = useApi('/clientes');
    const mascotasApi = useApi('/mascotas');
    
    // ----------------------------------------------------
    // ⭐️ 1. LÓGICA DE CARGA INICIAL (GET - READ)
    // ----------------------------------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                // ⭐️ Usamos el método get del hook para cargar datos
                const [clientesData, mascotasData] = await Promise.all([
                    clientesApi.get(),
                    mascotasApi.get()
                ]);

                setClientes(clientesData);
                setMascotas(mascotasData);
            } catch (error) {
                // El error ya fue logueado en useApi
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // ----------------------------------------------------
    // ⭐️ 2. FUNCIONES DE CLIENTES (CREATE, UPDATE, DELETE)
    // ----------------------------------------------------
    
   const agregarCliente = async (nuevoCliente) => {
        try {
            // ⭐️ Usamos el método create del hook
            const data = await clientesApi.create(nuevoCliente); 
            setClientes([...clientes, data]); 
        } catch (error) { /* Manejo de UI error */ }
    };
    
    const actualizarCliente = async (clienteActualizado) => {
        try {
            // ⭐️ Usamos el método update
            await clientesApi.update(clienteActualizado.id, clienteActualizado);
            setClientes(clientes.map(cl => 
                cl.id === clienteActualizado.id ? clienteActualizado : cl
            ));
        } catch (error) { /* Manejo de UI error */ }
    };
    
    const eliminarCliente = async (id) => {
        try {
            // ⭐️ Usamos el método remove
            await clientesApi.remove(id);
            setClientes(clientes.filter(cl => cl.id !== id));
        } catch (error) { /* Manejo de UI error */ }
    };
    

    // ----------------------------------------------------
    // ⭐️ 2. FUNCIONES DE MASCOTAS (CREATE, UPDATE, DELETE)
    // ----------------------------------------------------    
    const agregarMascota = async (nuevoMascota) => {
        try {
            // ⭐️ Usamos el método create del hook
            const data = await mascotasApi.create(nuevoMascota); 
            setMascotas([...mascotas, data]); 
        } catch (error) { /* Manejo de UI error */ }
    };
    
    const actualizarMascota = async (mascotaActualizado) => {
        try {
            // ⭐️ Usamos el método update
            await mascotasApi.update(mascotaActualizado.id, mascotaActualizado);
            setMascotas(mascotas.map(cl => 
                cl.id === mascotaActualizado.id ? mascotaActualizado : cl
            ));
        } catch (error) { /* Manejo de UI error */ }
    };
    
    const eliminarMascota = async (id) => {
        try {
            // ⭐️ Usamos el método remove
            await mascotasApi.remove(id);
            setMascotas(mascotas.filter(cl => cl.id !== id));
        } catch (error) { /* Manejo de UI error */ }
    };

    // 3. ⭐️ DEFINIR EL OBJETO DE VALOR (Lo que estará disponible para los consumidores)
    const value = {
        // Clientes
        clientes,
        agregarCliente,
        actualizarCliente,
        eliminarCliente,
        // Mascotas
        mascotas,
        agregarMascota,
        actualizarMascota,
        eliminarMascota,
        isLoading, // Lo exponemos para que las vistas muestren un mensaje de carga 
    };

    if (isLoading) {
        return <h1>Cargando datos del servidor...</h1>; // Muestra un mensaje de carga
    }

    return (
        <VeterinariaContext.Provider value={value}>
            {children} {/* ⭐️ Renderiza todos los componentes hijos */}
        </VeterinariaContext.Provider>
    );
};