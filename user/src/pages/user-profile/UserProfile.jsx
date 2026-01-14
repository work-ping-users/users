import { Col, Row } from 'react-bootstrap';
import AboutCard from './components/AboutCard';
// import Activity from './components/Activity';
import ProfileHeatmap from './components/ProfileHeatmap';
import PersonalInfo from './components/PersonalInfo';
import Projects from './components/Projects';
import Skill from './components/Skill';

const UserProfile = () => {
  return (
    <>
      {/* ROW 1: About / Personal / Activity */}
      <Row className="g-3 align-items-stretch">
        <Col xxl={4} lg={4} md={12} className="d-flex">
          <div className="w-100 h-100">
            <AboutCard />
          </div>
        </Col>

        <Col xxl={8} lg={8} md={12} className="d-flex">
          <div className="w-100 h-100">
            <PersonalInfo />
          </div>
        </Col>

        {/* <Col xxl={4} lg={12} md={12} className="d-flex">
          <div className="w-100 h-100">
            <Activity />
          </div>
        </Col> */}
      </Row>

      {/* ROW 2: Skill + Projects */}
       <Row className="g-3 mt-1">
        <Col xs={12} className="d-flex">
          <div className="w-100 h-100">
            <ProfileHeatmap />
          </div>
        </Col>
      </Row>
      <Row className="g-3 mt-1 align-items-stretch">
        <Col xxl={4} lg={4} md={12} className="d-flex">
          <div className="w-100 h-100">
            <Skill />
          </div>
        </Col>

        <Col xxl={8} lg={8} md={12} className="d-flex">
          <div className="w-100 h-100">
            <Projects />
          </div>
        </Col>
      </Row>

      {/* ROW 3: Heatmap (full width) */}
     
    </>
  );
};

export default UserProfile;
