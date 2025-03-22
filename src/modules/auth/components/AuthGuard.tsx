import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';

export default function AuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['auth-profile'],
    queryFn: async () => {
      const response = await authService.getProfile();
      return response.data.user;
    },
    retry: false,
  });

  useEffect(() => {
    if (error && location.pathname !== '/login') {
      queryClient.clear();
      navigate('/login');
    }
  }, [error, location.pathname, navigate, queryClient]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-gray-50)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary-600)]" />
      </div>
    );
  }

  if (!profile && location.pathname !== '/login') {
    return null;
  }

  return <Outlet />;
} 