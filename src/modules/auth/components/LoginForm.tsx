import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import type { LoginCredentials } from '../types/auth.types';

export default function LoginForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authService.login(credentials);
      return response.data;
    },
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-gray-50)]">
      <div className="max-w-md w-full space-y-8 p-8 card">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/logo.svg"
            alt="GymAdmin"
          />
          <h2 className="mt-6 text-center text-3xl font-bold text-[var(--color-gray-900)]">
            Iniciar sesión
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {loginMutation.error && (
            <div className="rounded-md bg-[var(--color-error-50)] p-4">
              <div className="text-sm text-[var(--color-error-600)]">
                Credenciales inválidas. Por favor, intenta de nuevo.
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="label">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 