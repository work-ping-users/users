import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout   from '@/layouts/AuthLayout';
import AdminLayout  from '@/layouts/AdminLayout';
import PublicLayout from '@/layouts/PublicLayout';
import { useAuthContext } from '@/context/useAuthContext';
import { appRoutes, authRoutes, publicRoutes } from '@/routes/index';

// ── PrivateRoute — guards all app (admin) routes ────────────────────────────
// Returns null while authLoading to prevent a flash-redirect on page refresh.
const PrivateRoute = ({ children }) => {
  // ── FOR DEVELOPMENT: Always allow access ─────────────────────────────────
  return children;
};

const AppRouter = (props) => {
  return (
    <Routes>
      {/* Public pages — no auth required */}
      {(publicRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={<PublicLayout {...props}>{route.element}</PublicLayout>}
        />
      ))}

      {/* Auth pages — sign-in, lock-screen, etc. */}
      {(authRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={<AuthLayout {...props}>{route.element}</AuthLayout>}
        />
      ))}

      {/* Protected app pages — wrapped in PrivateRoute */}
      {(appRoutes || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={
            <PrivateRoute>
              <AdminLayout {...props}>{route.element}</AdminLayout>
            </PrivateRoute>
          }
        />
      ))}
    </Routes>
  );
};

export default AppRouter;