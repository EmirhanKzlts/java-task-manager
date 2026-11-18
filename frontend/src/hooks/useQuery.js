import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';

export const useFetchTasks = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const response = await api.get("/tasks")
            return response.data;
        }
    })
}

export const useFetchTaskById = (id) => {
    return useQuery({
        queryKey: ["task", id],
        queryFn: async () => {
            const response = await api.get(`/tasks/${id}`)
            return response.data;
        },
        enabled:!!id
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            await api.delete(`/tasks/${id}`)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            });
        }
    })
}

export const useCompleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            await api.post(`/tasks/${id}/toggleCompleted`)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            });
        }
    })
}

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            await api.post("/tasks", null, {
                params: {
                    title: data.title,
                    expiresAt: data.expiresAt,
                },
            })
        },
        
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            });
        }
    })
}

export const useEditTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }) => {
            await api.put(`/tasks/${id}`, null, {
                params: {
                    title: data.title,
                    expiresAt: data.expiresAt,
                },
            });
        },
        
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            queryClient.invalidateQueries({
                queryKey: ["task", id],
            })
        }
    })
}


