import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Auth Pages
const AuthSignIn = lazy(() => import('@/app/(other)/auth/sign-in/page'));
const NotFound = lazy(() => import('@/app/(other)/(error-pages)/error-404/page'));
const Maintenance = lazy(() => import('@/app/(other)/maintenance/page'));

// User Pages (matches sidebar menu)
const Dashboard = lazy(() => import('@/app/(admin)/dashboard/analytics/page'));
const PermissionsPage = lazy(() => import('@/pages/Permissions/PermissionsPage'));
const LeavePage = lazy(() => import('@/pages/leave/LeavePage'));
const HolidaysPage = lazy(() => import('@/pages/holidays/HolidaysPage'));
const UserProfile = lazy(() => import('@/pages/user-profile/UserProfile'));

// User Routes — matches the sidebar menu items
export const userRoutes = [{
  name: 'Dashboard',
  path: '/dashboard',
  element: <Dashboard />
}, {
  name: 'Permissions',
  path: '/permissions',
  element: <PermissionsPage />
}, {
  name: 'Leave',
  path: '/leave',
  element: <LeavePage />
}, {
  name: 'Holidays',
  path: '/holidays',
  element: <HolidaysPage />
}, {
  name: 'User Profile',
  path: '/user-profile',
  element: <UserProfile />
}];

// Auth / Public Routes
export const authRoutes = [{
  name: 'Sign In',
  path: '/auth/sign-in',
  element: <AuthSignIn />
}, {
  name: 'Maintenance',
  path: '/maintenance',
  element: <Maintenance />
}, {
  name: '404 Error',
  path: '/error-404',
  element: <NotFound />
}];

// Root + catch-all
const initialRoutes = [{
  path: '/',
  name: 'root',
  element: <Navigate to="/dashboard" />
}, {
  path: '*',
  name: 'not-found',
  element: <NotFound />
}];

export const appRoutes = [...initialRoutes, ...userRoutes, ...authRoutes];
