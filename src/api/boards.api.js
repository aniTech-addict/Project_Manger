import { api } from '../lib/axios';

export const getBoards = async () => {
    const response = await api.get('/boards');
    return response;
};

export const getBoard = async (id) => {
    const response = await api.get(`/boards/${id}`);
    return response;
};

export const getBoardTasks = async (id) => {
    const response = await api.get(`/boards/${id}/tasks`);
    return response;
};

export const createBoard = async (boardData) => {
    const response = await api.post('/boards', boardData);
    return response;
};

export const updateBoard = async ({ id, ...data }) => {
    const response = await api.patch(`/boards/${id}`, data);
    return response;
};

export const deleteBoard = async (id) => {
    const response = await api.delete(`/boards/${id}`);
    return response;
};

export const createTask = async ({ boardId, ...taskData }) => {
    const response = await api.post(`/boards/${boardId}/tasks`, taskData);
    return response;
};
