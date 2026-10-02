// src/hooks/useApi.js

import api from '../api/axios';

/**
 * Hook personalizado para envolver las llamadas a la API
 * @param {*} endpoint 
 * @returns 
 */
export const useApi = (endpoint) => {
    
    /**
     * Función genérica GET
     * @param {*} id 
     * @returns 
     */
    const get = async (id = '') => {
        try {
            const url = id ? `${endpoint}/${id}` : endpoint;
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener ${endpoint}:`, error);
            throw error; // Lanzamos el error para que el Provider lo maneje
        }
    };

    /**
     * Función genérica POST
     * @param {*} data 
     * @returns 
     */
    const create = async (data) => {
        try {
            const response = await api.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error(`Error al crear ${endpoint}:`, error);
            throw error;
        }
    };
    
    /**
     * Función genérica PUT
     * @param {*} id 
     * @param {*} data 
     * @returns 
     */
    const update = async (id, data) => {
        try {
            const response = await api.put(`${endpoint}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar ${endpoint}:`, error);
            throw error;
        }
    };
    
    /**
     * Función genérica DELETE
     * @param {*} id 
     */
    const remove = async (id) => {
        try {
            await api.delete(`${endpoint}/${id}`);
        } catch (error) {
            console.error(`Error al eliminar ${endpoint}:`, error);
            throw error;
        }
    };

    return { get, create, update, remove };
};