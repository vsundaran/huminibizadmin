import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useRequestOtp = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            const response = await api.post('/request-otp', { email });
            return response.data;
        },
        onSuccess: () => {
             toast.success('OTP sent successfully to your email');
        }
    });
};

export const useVerifyOtp = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: { email: string, otp: string }) => {
            const response = await api.post('/verify-otp', data);
            return response.data;
        },
        onSuccess: (data) => {
            login(
                { accessToken: data.data.accessToken, refreshToken: data.data.refreshToken },
                data.data.admin
            );
            toast.success('Login successful');
            navigate('/');
        }
    });
};
