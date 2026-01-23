import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBoards, getBoard, getBoardTasks, createBoard, updateBoard, deleteBoard, createTask } from '../api/boards.api';

export const useBoards = () => {
    return useQuery({
        queryKey: ['boards'],
        queryFn: getBoards,
        select: (data) => data.data,
    });
};

export const useBoard = (id) => {
    return useQuery({
        queryKey: ['board', id],
        queryFn: () => getBoard(id),
        enabled: !!id,
        select: (data) => data.data,
    });
};

export const useBoardTasks = (boardId) => {
    return useQuery({
        queryKey: ['board', boardId, 'tasks'],
        queryFn: () => getBoardTasks(boardId),
        enabled: !!boardId,
        select: (data) => data.data,
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTask,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['board', variables.boardId, 'tasks'] });
        },
    });
};

export const useCreateBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBoard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
    });
};

export const useUpdateBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateBoard,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
            queryClient.invalidateQueries({ queryKey: ['board', data.data.id] });
        },
    });
};

export const useDeleteBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBoard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
    });
};
