import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Public Pages
const AboutPage = lazy(() => import('@/pages/public/About/page'));
const ContactPage = lazy(() => import('@/pages/public/Contact/page'));
const PrivacyPolicyPage = lazy(() => import('@/pages/public/PrivacyPolicy/page'));
const TermsAndConditionsPage = lazy(() => import('@/pages/public/TermsAndConditions/page'));

// Auth Pages
const AuthSignIn = lazy(() => import('@/pages/auth/sign-in/page'));
const NotFound = lazy(() => import('@/app/(other)/(error-pages)/error-404/page'));
const Maintenance = lazy(() => import('@/app/(other)/maintenance/page'));

// User Pages (matches sidebar menu)
const Dashboard = lazy(() => import('@/app/(admin)/dashboard/analytics/page'));
const AttendancePage = lazy(() => import('@/pages/Attendance/AttendancePage'));
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
  name: 'Attendance',
  path: '/attendance',
  element: <AttendancePage />
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

// Public Routes — no auth required, uses PublicLayout
export const publicRoutes = [{
  name: 'About',
  path: '/about',
  element: <AboutPage />
}, {
  name: 'Contact',
  path: '/contact',
  element: <ContactPage />
}, {
  name: 'Privacy Policy',
  path: '/privacy-policy',
  element: <PrivacyPolicyPage />
}, {
  name: 'Terms and Conditions',
  path: '/terms-and-conditions',
  element: <TermsAndConditionsPage />
}];

// Auth Routes
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
