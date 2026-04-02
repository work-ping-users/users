import { useMemo, useState } from 'react';
import { Button, Card, CardBody, Col, Form, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/layout/PageBreadcrumb';
import PageMetaData from '@/components/PageTitle';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const initialAttendanceData = [
  { id: 1, date: '15-02-2026', actIn: '09:30 AM', inTime: '08:55 AM', actOut: '04:20 PM', outTime: '04:20 PM', lateBy: '', earlyBy: '', absent: '', remarks: '', workingHours: '' },
  { id: 2, date: '25-02-2026', actIn: '09:30 AM', inTime: '09:00 AM', actOut: '04:20 PM', outTime: '04:25 PM', lateBy: '', earlyBy: '', absent: '', remarks: '', workingHours: '' },
  { id: 3, date: '01-03-2026', actIn: '09:30 AM', inTime: 'WO', actOut: '04:20 PM', outTime: 'WO', lateBy: '', earlyBy: '', absent: '', remarks: '', workingHours: '' },
  { id: 4, date: '02-03-2026', actIn: '09:30 AM', inTime: '08:55 AM', actOut: '04:20 PM', outTime: '07:21 PM', lateBy: '', earlyBy: '', absent: '', remarks: '', workingHours: '' },
  { id: 5, date: '03-03-2026', actIn: '09:30 AM', inTime: 'PH', actOut: '04:20 PM', outTime: 'PH', lateBy: '', earlyBy: '', absent: '', remarks: '', workingHours: '' },
  { id: 6, date: '08-03-2026', actIn: '09:30 AM', inTime: 'WO', actOut: '04:20 PM', outTime: 'WO', lateBy: '', earlyBy: '', absent: '', remarks: '', workingHours: '' },
  { id: 7, date: '15-03-2026', actIn: '09:30 AM', inTime: '08:55 AM', actOut: '04:20 PM', outTime: '04:29 PM', lateBy: '', earlyBy: '', absent: '', remarks: '', workingHours: '' },
  { id: 8, date: '22-03-2026', actIn: '09:30 AM', inTime: '09:04 AM', actOut: '04:20 PM', outTime: '04:29 PM', lateBy: '', earlyBy: '', absent: '', remarks: '', workingHours: '' },
  { id: 9, date: '05-04-2026', actIn: '09:30 AM', inTime: '08:53 AM', actOut: '04:20 PM', outTime: '04:22 PM', lateBy: '', earlyBy: '', absent: '', remarks: '', workingHours: '' },
  { id: 10, date: '10-04-2026', actIn: '09:30 AM', inTime: '09:30 AM', actOut: '04:20 PM', outTime: '04:28 PM', lateBy: '', earlyBy: '', absent: '', remarks: '', workingHours: '' },
];

const legendItems = [
  { code: 'FD', label: 'Full Day', colorClass: 'text-danger' },
  { code: 'FH', label: 'First Half', colorClass: 'text-danger' },
  { code: 'SH', label: 'Second Half', colorClass: 'text-danger' },
  { code: 'L', label: 'late Time', colorClass: 'text-danger' },
  { code: 'E', label: 'Early Time', colorClass: 'text-danger' },
  { code: 'PH', label: 'Public Holiday', colorClass: 'text-success' },
  { code: 'WO', label: 'Weekly Off', colorClass: 'text-danger' },
];

const AttendancePage = () => {
  const [reportType, setReportType] = useState('monthly');
  const [formData, setFormData] = useState({
    month: 'March',
    week: 'Week 1',
    fromDate: '2026-03-16',
    toDate: '2026-03-18',
    subject: '',
  });
  
  const [filteredData, setFilteredData] = useState(initialAttendanceData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFilter = () => {
    let result = [...initialAttendanceData];
    
    const parseDate = (dateStr) => {
      const [d, m, y] = dateStr.split('-');
      return new Date(`${y}-${m}-${d}`);
    };

    if (reportType === 'monthly') {
      const monthIndex = new Date(`${formData.month} 1, 2026`).getMonth();
      result = initialAttendanceData.filter(item => {
        const d = parseDate(item.date);
        return d.getMonth() === monthIndex;
      });
    } else if (reportType === 'weekly') {
      const monthIndex = new Date(`${formData.month} 1, 2026`).getMonth();
      const weekNum = parseInt(formData.week.replace('Week ', ''));
      result = initialAttendanceData.filter(item => {
        const d = parseDate(item.date);
        if (d.getMonth() !== monthIndex) return false;
        const day = d.getDate();
        if (weekNum === 1 && day >= 1 && day <= 7) return true;
        if (weekNum === 2 && day >= 8 && day <= 14) return true;
        if (weekNum === 3 && day >= 15 && day <= 21) return true;
        if (weekNum === 4 && day >= 22) return true;
        return false;
      });
    } else if (reportType === 'period') {
      const from = new Date(formData.fromDate);
      from.setHours(0,0,0,0);
      const to = new Date(formData.toDate);
      to.setHours(23,59,59,999);
      result = initialAttendanceData.filter(item => {
        const d = parseDate(item.date);
        return d >= from && d <= to;
      });
    }

    setFilteredData(result);
  };

  const getStatusDisplay = (value) => {
    if (value === 'WO') return <span className="fw-bold text-danger">WO</span>;
    if (value === 'PH') return <span className="fw-bold text-success">PH</span>;
    return value;
  };

  const columns = useMemo(
    () => [
      {
        header: 'S.No',
        accessorKey: 'id',
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: ({ getValue }) => <span className="text-nowrap">{getValue()}</span>,
      },
      {
        header: 'Act. In Time',
        accessorKey: 'actIn',
        cell: ({ getValue }) => <span className="text-nowrap">{getValue()}</span>,
      },
      {
        header: 'In.Time',
        accessorKey: 'inTime',
        cell: ({ getValue }) => getStatusDisplay(getValue()),
      },
      {
        header: 'Act. Out Time',
        accessorKey: 'actOut',
        cell: ({ getValue }) => <span className="text-nowrap">{getValue()}</span>,
      },
      {
        header: 'Out.Time',
        accessorKey: 'outTime',
        cell: ({ getValue }) => getStatusDisplay(getValue()),
      },
      {
        header: 'Late By (hh:mm)',
        accessorKey: 'lateBy',
      },
      {
        header: 'Early By (hh:mm)',
        accessorKey: 'earlyBy',
      },
      {
        header: 'Absent',
        accessorKey: 'absent',
      },
      {
        header: 'Remarks',
        accessorKey: 'remarks',
      },
      {
        header: 'Working Hours',
        accessorKey: 'workingHours',
      },
    ],
    []
  );

  return (
    <>
      <PageMetaData title="Attendance" />
      <PageBreadcrumb subName="Pages" title="Attendance" />

      <Row>
        <Col xs={12}>
          <Card className="border-0 bg-light mb-3">
            <CardBody className="py-3">
              <div className="d-flex flex-column align-items-center gap-3">
                {/* Radio Options */}
                <div className="d-flex align-items-center justify-content-center gap-4 w-100">
                  <Form.Check
                    type="radio"
                    id="monthly-radio"
                    label="Monthly"
                    name="reportType"
                    checked={reportType === 'monthly'}
                    onChange={() => setReportType('monthly')}
                    className="fs-6"
                  />
                  <Form.Check
                    type="radio"
                    id="weekly-radio"
                    label="Weekly"
                    name="reportType"
                    checked={reportType === 'weekly'}
                    onChange={() => setReportType('weekly')}
                    className="fs-6"
                  />
                  <Form.Check
                    type="radio"
                    id="period-radio"
                    label="Day Wise"
                    name="reportType"
                    checked={reportType === 'period'}
                    onChange={() => setReportType('period')}
                    className="fs-6"
                  />
                </div>

                {/* Conditional Inputs and Submit Button */}
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 w-100">
                  {(reportType === 'monthly' || reportType === 'weekly') && (
                    <div className="d-flex align-items-center gap-2">
                      <Form.Label className="mb-0 fw-semibold text-nowrap">Month :</Form.Label>
                      <Form.Select
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        className="w-auto"
                      >
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </Form.Select>
                    </div>
                  )}

                  {reportType === 'weekly' && (
                    <div className="d-flex align-items-center gap-2">
                      <Form.Label className="mb-0 fw-semibold text-nowrap">Week :</Form.Label>
                      <Form.Select
                        name="week"
                        value={formData.week}
                        onChange={handleChange}
                        className="w-auto"
                      >
                        <option value="Week 1">Week 1</option>
                        <option value="Week 2">Week 2</option>
                        <option value="Week 3">Week 3</option>
                        <option value="Week 4">Week 4</option>
                      </Form.Select>
                    </div>
                  )}

                  {reportType === 'period' && (
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <Form.Label className="mb-0 fw-semibold text-nowrap">Dates :</Form.Label>
                        <Form.Control
                          type="date"
                          name="fromDate"
                          value={formData.fromDate}
                          onChange={handleChange}
                          className="w-auto"
                        />
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-semibold">To</span>
                        <Form.Control
                          type="date"
                          name="toDate"
                          value={formData.toDate}
                          onChange={handleChange}
                          className="w-auto"
                        />
                      </div>
                    </div>
                  )}

                  <Button variant="primary" className="px-4 text-white ms-2" onClick={handleFilter}>
                    Submit
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12}>
          <Card className="border-0 mb-3" style={{ borderTop: '2px solid #fd7e14' }}>
            <CardBody className="py-3">
              {/* Attendance List Table */}
              <ReactTable
                columns={columns}
                data={filteredData}
                pageSize={10}
                showPagination
                rowsPerPageList={[10, 25, 50]}
                tableClass="table-centered table-bordered mb-0"
                theadClass="table-light"
              />

              {/* Legend Section moved below the table */}
              <div className="mt-4 p-3 bg-light rounded d-flex flex-wrap justify-content-center gap-4">
                {legendItems.map((item, index) => (
                  <div key={index} className="d-flex" style={{ fontSize: '1rem' }}>
                    <span className={`fw-bold  ${item.colorClass}`}>{item.code}</span>
                    <span className="text-secondary fw-small">: {item.label}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AttendancePage;
