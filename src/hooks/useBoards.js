import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
            toast.success("Task created successfully!");
        },
        onError: (err) => {
            toast.error(`Failed to create task: ${err.message}`);
        }
    });
};

export const useCreateBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBoard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
            toast.success("Board created successfully!");
        },
        onError: (err) => {
            toast.error(`Failed to create board: ${err.message}`);
        }
    });
};

export const useUpdateBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateBoard,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
            queryClient.invalidateQueries({ queryKey: ['board', data.data.id] });
            toast.success("Board updated successfully!");
        },
        onError: (err) => {
            toast.error(`Failed to update board: ${err.message}`);
        }
    });
};

export const useDeleteBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBoard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
            toast.success("Board deleted successfully!");
        },
        onError: (err) => {
            toast.error(`Failed to delete board: ${err.message}`);
        }
    });
};
