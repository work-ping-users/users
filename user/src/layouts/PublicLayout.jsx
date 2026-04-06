import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LogoBox from '@/components/LogoBox';
import ThemeModeToggle from '@/components/layout/TopNavigationBar/components/ThemeModeToggle';
import Preloader from '@/components/Preloader';
import { currentYear, developedBy } from '@/context/constants';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const PublicLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <header className="topbar position-sticky top-0" style={{ zIndex: 1005 }}>
        <Container fluid="xxl">
          <div className="navbar-header">
            <LogoBox
              containerClassName="logo-box"
              squareLogo={{ className: 'logo-sm' }}
              textLogo={{ className: 'logo-lg' }}
            />
            <div className="d-flex align-items-center gap-2">
              <ThemeModeToggle />
              <Link to="/auth/sign-in" className="btn btn-primary btn-sm px-3">
                Sign In
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* Page Content */}
      <main className="flex-grow-1 py-4">
        <Container>
          <Suspense fallback={<Preloader />}>{children}</Suspense>
        </Container>
      </main>

      {/* Footer */}
      <footer className="footer">
        <Container fluid>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="d-flex align-items-center gap-1">
              <IconifyIcon icon="iconamoon:heart-duotone" className="fs-18 align-middle text-danger" />
              <span>{currentYear} &copy; <strong className="text-primary">{developedBy}</strong></span>
            </span>
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Link to="/about" className="text-muted footer-text">About</Link>
              <span className="text-muted">|</span>
              <Link to="/contact" className="text-muted footer-text">Contact</Link>
              <span className="text-muted">|</span>
              <Link to="/privacy-policy" className="text-muted footer-text">Privacy Policy</Link>
              <span className="text-muted">|</span>
              <Link to="/terms-and-conditions" className="text-muted footer-text">Terms &amp; Conditions</Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default PublicLayout;
