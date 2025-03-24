import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

export default function AuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, error, getProfile } = useAuthStore();

  console.log("user", user);

  useEffect(() => {
    const hasToken = document.cookie.includes('csrftoken');
    
    if (!user && hasToken && location.pathname !== '/login') {
      getProfile().catch(() => {
        navigate('/login');
      });
    }
  }, [user, location.pathname, navigate, getProfile]);

  useEffect(() => {
    if (error && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [error, location.pathname, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-gray-50)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary-600)]" />
      </div>
    );
  }

  if (!user && location.pathname !== '/login') {
    return null;
  }

  return <Outlet />;
} 