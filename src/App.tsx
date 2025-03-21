import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './core/layouts/MainLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Add your routes here */}
            <Route index element={<div>Dashboard</div>} />
            <Route path="members" element={<div>Members</div>} />
            <Route path="classes" element={<div>Classes</div>} />
            <Route path="trainers" element={<div>Trainers</div>} />
            <Route path="subscriptions" element={<div>Subscriptions</div>} />
            <Route path="reports" element={<div>Reports</div>} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
