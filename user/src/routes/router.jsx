import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import AdminLayout from '@/layouts/AdminLayout';
import PublicLayout from '@/layouts/PublicLayout';
import { appRoutes, authRoutes, publicRoutes } from '@/routes/index';
const AppRouter = props => {
  return <Routes>
      {(publicRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={<PublicLayout {...props}>{route.element}</PublicLayout>} />)}

      {(authRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={<AuthLayout {...props}>{route.element}</AuthLayout>} />)}

      {(appRoutes || []).map((route, idx) => <Route key={idx + route.name} path={route.path} element={<AdminLayout {...props}>{route.element}</AdminLayout>} />)}
    </Routes>;
};
export default AppRouter;