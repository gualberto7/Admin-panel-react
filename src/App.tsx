import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '@/core/layouts/MainLayout';
import ClassList from '@/modules/classes/components/ClassList';
import LoginForm from '@/modules/auth/components/LoginForm';
import AuthGuard from '@/modules/auth/components/AuthGuard';
import { navigationStore } from '@/shared/services/navigation.store';
import MembersPage from '@/modules/members/components/MembersPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// Componente para inicializar la navegación
function NavigationInitializer() {
  const navigate = useNavigate();
  navigationStore.setNavigate(navigate);
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavigationInitializer />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginForm />} />

          {/* Protected routes */}
          <Route element={<AuthGuard />}>
            <Route element={<MainLayout />}>
              <Route index element={<div>Dashboard</div>} />
              <Route path="members" element={<MembersPage />} />
              <Route path="classes" element={<ClassList />} />
              <Route path="trainers" element={<div>Trainers</div>} />
              <Route path="subscriptions" element={<div>Subscriptions</div>} />
              <Route path="reports" element={<div>Reports</div>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
