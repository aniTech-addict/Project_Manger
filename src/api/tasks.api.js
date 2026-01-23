import { api } from '../lib/axios';

export const getTask = async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response;
};

export const updateTask = async ({ id, ...data }) => {
    const response = await api.patch(`/tasks/${id}`, data);
    return response;
};

export const deleteTask = async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response;
};
