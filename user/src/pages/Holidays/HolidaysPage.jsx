import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Row, Spinner } from 'react-bootstrap';
import PageMetaData from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const HolidaysPage = () => {
  const [holidaysList, setHolidaysList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockBackendResponse = [
          { sNo: 1, date: '01-01-2026', name: 'New Year' },
          { sNo: 2, date: '11-01-2026 to 18-01-2026', name: 'Sankranthi Holidays' },
          { sNo: 3, date: '26-01-2026', name: 'Republic day' },
          { sNo: 4, date: '03-03-2026', name: 'Holi' },
          { sNo: 5, date: '19-03-2026', name: 'Ugadi' },
          { sNo: 6, date: '20-03-2026', name: 'Ramzan' },
          { sNo: 7, date: '21-03-2026', name: 'Holiday' },
          { sNo: 8, date: '27-03-2026', name: 'Sri Ramanavami' },
          { sNo: 9, date: '03-04-2026', name: 'Good Friday' },
          { sNo: 10, date: '14-04-2026', name: 'Dr.B.R.Ambedkar Jayanthi' },
          { sNo: 11, date: '27-05-2026', name: 'Bakrid' },
          { sNo: 12, date: '25-06-2026', name: 'Moharram' },
        ];
        
        setHolidaysList(mockBackendResponse);
      } catch (err) {
        console.error('Error fetching holidays:', err);
        setError('Failed to load holidays from the server.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHolidays();
  }, []);

  return (
    <>
      <PageMetaData title="Holidays" />

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody className="d-flex flex-column align-items-center py-5">
              
              <div className="d-flex mb-4 mt-2 shadow-sm rounded overflow-hidden border">
                <div className="text-white px-4 py-2 d-flex align-items-center justify-content-center bg-primary">
                  <IconifyIcon icon="mdi:calendar-month-outline" height={20} width={20} />
                </div>
                <div className="bg-body-secondary text-body fw-semibold px-4 py-2 d-flex align-items-center justify-content-center" style={{ fontSize: '15px' }}>
                  Holidays
                </div>
              </div>

              <h2 className="text-body fw-normal mb-4" style={{ fontSize: '26px' }}>List of Holidays</h2>

              <div className="text-muted mb-4 text-center fw-medium" style={{ fontSize: '16px', lineHeight: '1.5' }}>
                <span className="badge rounded px-2 py-1 me-2 align-middle text-uppercase bg-danger" style={{ fontSize: '13px', paddingBottom: '4px' }}>
                  Note
                </span>
                <span className="align-middle text-body">
                  : In Case of any unforseen circumstances you will be notified<br />whether you need to work from home or not
                </span>
              </div>

              <div className="w-100" style={{ maxWidth: '900px' }}>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped mb-0 text-start align-middle">
                    <thead className="table-light">
                      <tr>
                        <th className="text-center py-3 fw-semibold text-body" style={{ width: '10%', fontSize: '16px' }}>S.No</th>
                        <th className="text-center py-3 fw-semibold text-body" style={{ width: '45%', fontSize: '16px' }}>Date</th>
                        <th className="text-center py-3 fw-semibold text-body" style={{ width: '45%', fontSize: '16px' }}>Name of the Holiday</th>
                      </tr>
                    </thead>
                    <tbody className="text-body">
                      {loading ? (
                        <tr>
                          <td colSpan="3" className="text-center py-5 text-muted">
                            <Spinner animation="border" variant="primary" size="sm" className="me-2" />
                            Loading holidays...
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan="3" className="text-center py-5 text-danger">
                            {error}
                          </td>
                        </tr>
                      ) : holidaysList.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center py-5 text-muted">
                            No holidays mapped.
                          </td>
                        </tr>
                      ) : (
                        holidaysList.map((holiday, index) => (
                          <tr key={holiday.sNo || index}>
                            <td className="fw-medium px-4 py-3 text-muted" style={{ fontSize: '14px' }}>{holiday.sNo || index + 1}</td>
                            <td className="fw-medium px-4 py-3 text-muted" style={{ fontSize: '14px' }}>{holiday.date}</td>
                            <td className="fw-bold px-4 py-3" style={{ fontSize: '14px' }}>{holiday.name}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HolidaysPage;
