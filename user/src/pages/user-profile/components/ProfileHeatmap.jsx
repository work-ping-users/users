import { useMemo } from 'react';
import HeatMap from '@uiw/react-heat-map';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col
} from 'react-bootstrap';

const ProfileHeatmap = ({ heatMapValue = [] }) => {
  const startDate = useMemo(() => {
    if (!heatMapValue.length) return new Date();
    return new Date(heatMapValue[0].date);
  }, [heatMapValue]);

  return (
    <Card className="h-100">
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle as="h5" className="mb-0">
          Activity Heatmap
        </CardTitle>
        <small className="text-muted">Daily activity</small>
      </CardHeader>

      <CardBody>
        {/* Heatmap container */}
        <div className="overflow-auto">
          <HeatMap
            value={heatMapValue}
            startDate={startDate}
            width="100%"
            rectSize={12}
            space={3}
            monthLabels={[
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]}
            weekLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
            panelColors={{
              0: '#e9ecef',
              2: '#9be9a8',
              5: '#40c463',
              10: '#30a14e',
              20: '#216e39'
            }}
            rectRender={(props, data) => (
              <rect
                {...props}
                className="cursor-pointer"
                onClick={() =>
                  data?.date &&
                  alert(`${data.date}: ${data.count || 0} activities`)
                }
              />
            )}
          />
        </div>

        {/* Legend */}
        <Row className="align-items-center mt-3 g-2">
          <Col xs="auto" className="text-muted small">
            Less
          </Col>

          <Col xs="auto">
            <div className="bg-light rounded" style={{ width: 12, height: 12 }} />
          </Col>
          <Col xs="auto">
            <div className="rounded" style={{ background: '#9be9a8', width: 12, height: 12 }} />
          </Col>
          <Col xs="auto">
            <div className="rounded" style={{ background: '#40c463', width: 12, height: 12 }} />
          </Col>
          <Col xs="auto">
            <div className="rounded" style={{ background: '#30a14e', width: 12, height: 12 }} />
          </Col>
          <Col xs="auto">
            <div className="rounded" style={{ background: '#216e39', width: 12, height: 12 }} />
          </Col>

          <Col xs="auto" className="text-muted small">
            More
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ProfileHeatmap;
