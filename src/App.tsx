import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

import Login from './pages/Login';
import Layout from './components/Layout';
import Admins from './pages/Admins';
import Organizations from './pages/Organizations';
import Domains from './pages/Domains';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admins" replace />} />
        <Route path="admins" element={<Admins />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="domains" element={<Domains />} />
      </Route>
    </Routes>
  );
}

export default App;
