import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'react-toastify';

// --- Admins ---
export const useAdmins = () => {
  return useQuery({
    queryKey: ['admins'],
    queryFn: async () => {
      const { data } = await api.get('/admins');
      return data.data;
    },
  });
};

export const useAddAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post('/admins', { email });
      return data.data;
    },
    onSuccess: () => {
      toast.success('Admin added successfully');
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    }
  });
};

// --- Organizations ---
export const useOrganizations = () => {
  return useQuery({
    queryKey: ['organizations'],
    queryFn: async () => {
      const { data } = await api.get('/organizations');
      return data.data;
    },
  });
};

export const useAddOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const { data } = await api.post('/organizations', { name });
      return data.data;
    },
    onSuccess: () => {
      toast.success('Organization added successfully');
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    }
  });
};

// --- Domains ---
export const useDomains = () => {
  return useQuery({
    queryKey: ['domains'],
    queryFn: async () => {
      const { data } = await api.get('/domains');
      return data.data;
    },
  });
};

export const useAddDomain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { organizationId: string, domain: string }) => {
      const { data } = await api.post('/domains', payload);
      return data.data;
    },
    onSuccess: () => {
      toast.success('Domain added successfully');
      queryClient.invalidateQueries({ queryKey: ['domains'] });
    }
  });
};
