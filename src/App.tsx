import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { getSession } from './lib/api';
import { InvestorPage } from './pages/InvestorPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { PortalPage } from './pages/PortalPage';

function ProtectedApp() {
  return getSession() ? <AppShell /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/investors" element={<InvestorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app" element={<ProtectedApp />}>
        <Route index element={<Navigate to="command" replace />} />
        <Route path=":portal" element={<PortalPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
