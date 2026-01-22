import { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Button,
  Form
} from 'react-bootstrap';

const Skill = ({ skillData = [] }) => {
  const [skills, setSkills] = useState(skillData);
  const [newSkill, setNewSkill] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, { title: newSkill }]);
    setNewSkill('');
  };

  const handleDeleteSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <Card className="shadow-none mb-0" style={{ height: '348px' }}>
      <CardHeader>
        <CardTitle as="h5">Skill</CardTitle>
      </CardHeader>

      {/* ✅ MUST be flex-column */}
      <CardBody className="d-flex flex-column p-lg-3 p-2"  style={{ height: '320px' }}>
        <Row className="mb-3">
          <Col xs={7}>
            <Form.Control
              placeholder="Skill name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
          </Col>
          <Col xs={5}>
            <Button className="w-100" onClick={handleAddSkill}>
              Add
            </Button>
          </Col>
        </Row>

        {/* ✅ Scrollable area */}
        <div
          className="flex-grow-1 d-flex flex-wrap gap-2 pe-1"
          style={{ overflowY: 'auto' }}
        >
          {skills.map((item, idx) => (
            <div
              key={idx}
              className="position-relative bg-light rounded px-3 py-2"
              style={{ height: '40px' }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === idx && (
                <Button
                  variant="danger"
                  size="sm"
                  className="position-absolute top-0 start-0 rounded-circle p-0"
                  style={{
                    width: '18px',
                    height: '18px',
                    transform: 'translate(-40%, -40%)'
                  }}
                  onClick={() => handleDeleteSkill(idx)}
                >
                  ×
                </Button>
              )}

              {item.title}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Skill;
