import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
            toast.success("Task updated successfully!");
        },
        onError: (err) => {
            toast.error(`Failed to update task: ${err.message}`);
        }
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['board'] });
            toast.success("Task deleted successfully!");
        },
        onError: (err) => {
            toast.error(`Failed to delete task: ${err.message}`);
        }
    });
};
