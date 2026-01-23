import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTask, updateTask, deleteTask } from '../api/tasks.api';

export const useTask = (id) => {
    return useQuery({
        queryKey: ['task', id],
        queryFn: () => getTask(id),
        enabled: !!id,
        select: (data) => data.data,
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTask,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['task', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['board', data.data.boardId, 'tasks'] });
            queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['board'] });
        },
    });
};
