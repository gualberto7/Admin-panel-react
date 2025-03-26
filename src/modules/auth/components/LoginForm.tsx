import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import type { LoginCredentials } from "../types/auth.types";
import { Button } from "@/shared/components";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate("/");
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-gray-50)]">
      <div className="max-w-md w-full space-y-8 p-8 card">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="/logo.svg"
            alt="GymAdmin"
            data-testid="logo"
          />
          <h2
            className="mt-6 text-center text-3xl font-bold text-[var(--color-gray-900)]"
            data-testid="login-title"
          >
            Iniciar sesión
          </h2>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          data-testid="login-form"
        >
          {error && (
            <div
              className="rounded-md bg-[var(--color-error-50)] p-4"
              data-testid="error-message"
            >
              <div className="text-sm text-[var(--color-error-600)]">
                {error}
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
                data-testid="email-input"
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
                data-testid="password-input"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              data-testid="submit-button"
            >
              Iniciar sesión
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
