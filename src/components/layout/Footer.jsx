import { Link } from 'react-router-dom'
import { currentYear, developedBy } from '@/context/constants'
import IconifyIcon from '../wrappers/IconifyIcon'
import { Container } from 'react-bootstrap'
const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-between gap-2 gap-md-0 w-100">
          <span className="d-flex align-items-center gap-1 mb-2 mb-md-0">
            <IconifyIcon icon="iconamoon:heart-duotone" className="fs-18 align-middle text-danger" />
            <span>
              {currentYear} &copy; <strong className="text-primary">{developedBy}</strong>
            </span>
          </span>
          <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
            <Link to="/about" className="text-muted footer-text">
              About
            </Link>
            <span className="text-muted d-none d-sm-inline">|</span>
            <Link to="/contact" className="text-muted footer-text">
              Contact
            </Link>
            <span className="text-muted d-none d-sm-inline">|</span>
            <Link to="/privacy-policy" className="text-muted footer-text">
              Privacy Policy
            </Link>
            <span className="text-muted d-none d-sm-inline">|</span>
            <Link to="/terms-and-conditions" className="text-muted footer-text">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
export default Footer
