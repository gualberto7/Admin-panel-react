import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "../LoginForm";
import { useAuthStore } from "../../store/auth.store";

// Mock the auth store
vi.mock("../../store/auth.store", () => ({
  useAuthStore: vi.fn(),
}));

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("LoginForm", () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuthStore as any).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
    });
  });

  it("renders login form", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("displays error message when login fails", () => {
    const errorMessage = "Credenciales inválidas";
    (useAuthStore as any).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: errorMessage,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("disables submit button while loading", () => {
    (useAuthStore as any).mockReturnValue({
      login: mockLogin,
      isLoading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeDisabled();
  });
});
