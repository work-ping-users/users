import { useMemo, useState } from 'react';
import { Badge, Button, Card, CardBody, CardHeader, Col, Form, Row } from 'react-bootstrap';
import PageMetaData from '@/components/PageTitle';
import ReactTable from '@/components/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const leaveTypes = ['Full Day', 'First Half', 'Second Half'];

const initialLeaves = [
  { id: 1, from: '07-01-2026', to: '07-01-2026', totalDays: '0.5 WD', type: 'Second Half', reason: 'Forgot the face, to convert it to CL, applying the leave', workAssigned: '', status: 'Approved' },
  { id: 2, from: '22-12-2025', to: '22-12-2025', totalDays: '1 WD', type: 'Full Day', reason: 'Health issue', workAssigned: 'Gangadhar and Madhu', status: 'Approved' },
  { id: 3, from: '27-11-2025', to: '27-11-2025', totalDays: '1 WD', type: 'Full Day', reason: 'Personal work', workAssigned: '.', status: 'Approved' },
  { id: 4, from: '24-10-2025', to: '24-10-2025', totalDays: '1 WD', type: 'Full Day', reason: 'Aadhar update', workAssigned: 'Hanumant madhu and gangadhar', status: 'Approved' },
  { id: 5, from: '18-07-2025', to: '19-07-2025', totalDays: '2 WD', type: 'Full Day', reason: 'Personal Going to Mysore', workAssigned: 'Hanumant Madhu', status: 'Approved' },
  { id: 6, from: '06-06-2025', to: '06-06-2025', totalDays: '1 WD', type: 'Full Day', reason: 'Personal Reason', workAssigned: 'Hanumant Madhu', status: 'Approved' },
  { id: 7, from: '12-05-2025', to: '12-05-2025', totalDays: '1 WD', type: 'Full Day', reason: 'Sister Marrige Work', workAssigned: 'Hanumant', status: 'Approved' },
  { id: 8, from: '15-05-2025', to: '15-05-2025', totalDays: '1 WD', type: 'Full Day', reason: 'Sister Marrige Work', workAssigned: 'Hanumant', status: 'Approved' },
  { id: 9, from: '12-04-2025', to: '12-04-2025', totalDays: '1 WD', type: 'Full Day', reason: 'Sister Engagement', workAssigned: 'Ashok sir and pavan sir', status: 'Approved' },
  { id: 10, from: '10-04-2025', to: '10-04-2025', totalDays: '0.5 WD', type: 'First Half', reason: 'Passport', workAssigned: 'Ashok sir and pavan sir', status: 'Approved' },
];

const today = new Date().toISOString().split('T')[0];

const TOTAL_LEAVES = 8;

const calcApplied = (leaves) =>
  leaves.reduce((sum, l) => sum + parseFloat(l.totalDays), 0);

const LeavePage = () => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [form, setForm] = useState({ from: '', to: '', type: '', reason: '', workAssigned: '' });
  const [errors, setErrors] = useState({});

  const leavesApplied = calcApplied(leaves);
  const remainingBalance = Math.max(0, TOTAL_LEAVES - leavesApplied);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.from) errs.from = 'From date is required.';
    if (!form.to) errs.to = 'To date is required.';
    if (form.from && form.to && form.to < form.from) errs.to = 'To date must be after From date.';
    if (!form.type) errs.type = 'Type is required.';
    if (!form.reason.trim()) errs.reason = 'Reason is required.';
    return errs;
  };

  const calcDays = (from, to, type) => {
    if (!from || !to) return '1 WD';
    const [fd, fm, fy] = from.split('-').map(Number);
    const [td, tm, ty] = to.split('-').map(Number);
    const fromDate = new Date(fy, fm - 1, fd);
    const toDate = new Date(ty, tm - 1, td);
    const diff = Math.round((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
    if (type === 'First Half' || type === 'Second Half') return '0.5 WD';
    return `${diff} WD`;
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const [y, m, d] = isoDate.split('-');
    return `${d}-${m}-${y}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const totalDays = calcDays(formatDate(form.from), formatDate(form.to), form.type);
    const newEntry = {
      id: leaves.length + 1,
      from: formatDate(form.from),
      to: formatDate(form.to),
      totalDays,
      type: form.type,
      reason: form.reason,
      workAssigned: form.workAssigned,
      status: 'Pending',
    };
    setLeaves((prev) => [newEntry, ...prev]);
    setForm({ from: '', to: '', type: '', reason: '', workAssigned: '' });
  };

  const columns = useMemo(
    () => [
      {
        header: 'S.No',
        accessorKey: 'id',
        cell: ({ row }) => <span className="fw-medium">{row.index + 1}</span>,
      },
      {
        header: 'From',
        accessorKey: 'from',
        cell: ({ getValue }) => <span className="fw-medium text-nowrap">{getValue()}</span>,
      },
      {
        header: 'To',
        accessorKey: 'to',
        cell: ({ getValue }) => <span className="text-nowrap">{getValue()}</span>,
      },
      {
        header: 'Total Days',
        accessorKey: 'totalDays',
        cell: ({ getValue }) => <span className="text-nowrap">{getValue()}</span>,
      },
      {
        header: 'Type',
        accessorKey: 'type',
        cell: ({ getValue }) => (
          <Badge bg={getValue() === 'Full Day' ? 'primary' : 'info'} className="px-2 py-1">
            {getValue()}
          </Badge>
        ),
      },
      {
        header: 'Reason',
        accessorKey: 'reason',
      },
      {
        header: 'Work Assigned to',
        accessorKey: 'workAssigned',
        cell: ({ getValue }) => <span className="text-muted">{getValue() || '—'}</span>,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ getValue }) => (
          <Badge
            bg={getValue() === 'Approved' ? 'success' : getValue() === 'Rejected' ? 'danger' : 'warning'}
            className="px-2 py-1"
          >
            {getValue()}
          </Badge>
        ),
      },
      {
        header: 'Action',
        id: 'action',
        cell: ({ row }) =>
          row.original.status === 'Approved' ? (
            <Button variant="outline-info" size="sm" className="py-0">
              <IconifyIcon icon="bx:show" height={16} width={16} />
            </Button>
          ) : (
            <Button variant="outline-danger" size="sm" className="py-0">
              <IconifyIcon icon="bx:trash" height={16} width={16} />
            </Button>
          ),
      },
    ],
    []
  );

  return (
    <>
      <PageMetaData title="Leaves" />

      <Row>
        {/* Summary Stats */}
        <Col xs={12} className="mb-3">
          <Card className="border-0 bg-light">
            <CardBody className="py-3">
              <div className="d-flex flex-wrap gap-4 align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <IconifyIcon icon="bx:envelope" className="text-primary fs-4" />
                  <span className="fw-semibold text-muted">Leaves</span>
                </div>
                <div className="vr d-none d-sm-block" />
                <div>
                  <span className="text-muted">Total Leaves : </span>
                  <span className="fw-bold fs-5">{TOTAL_LEAVES}</span>
                </div>
                <div className="vr d-none d-sm-block" />
                <div>
                  <span className="text-muted">Leaves Applied : </span>
                  <span className="fw-bold fs-5 text-warning">{leavesApplied}</span>
                </div>
                <div className="vr d-none d-sm-block" />
                <div>
                  <span className="text-muted">Remaining Leave Balance : </span>
                  <span className="fw-bold fs-5 text-success">{remainingBalance}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Apply Leave Form */}
        <Col xs={12}>
          <Card>
            <CardHeader className="border-bottom">
              <h5 className="mb-0">Apply for Leave</h5>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit} noValidate>
                <Row className="g-3">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">From</Form.Label>
                      <Form.Control
                        type="date"
                        name="from"
                        value={form.from}
                        min={today}
                        onChange={handleChange}
                        isInvalid={!!errors.from}
                      />
                      <Form.Control.Feedback type="invalid">{errors.from}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">To</Form.Label>
                      <Form.Control
                        type="date"
                        name="to"
                        value={form.to}
                        min={today}
                        onChange={handleChange}
                        isInvalid={!!errors.to}
                      />
                      <Form.Control.Feedback type="invalid">{errors.to}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Type</Form.Label>
                      <Form.Select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        isInvalid={!!errors.type}
                      >
                        <option value="">--Select--</option>
                        {leaveTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Reason For Leave</Form.Label>
                      <Form.Control
                        type="text"
                        name="reason"
                        placeholder="Enter reason..."
                        value={form.reason}
                        onChange={handleChange}
                        isInvalid={!!errors.reason}
                      />
                      <Form.Control.Feedback type="invalid">{errors.reason}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={9}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Work Assigned to</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="workAssigned"
                        placeholder="Enter work assigned to..."
                        value={form.workAssigned}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3} className="d-flex flex-column justify-content-end">
                    <Button type="submit" variant="primary" className="w-100">
                      <IconifyIcon icon="bx:check" className="me-1" />
                      Apply For Leave
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>

        {/* Leaves List Table */}
        <Col xs={12}>
          <Card>
            <CardHeader className="border-bottom">
              <h5 className="mb-0 text-center">List of Leaves</h5>
            </CardHeader>
            <CardBody className="p-0">
              <ReactTable
                columns={columns}
                data={leaves}
                pageSize={10}
                showPagination
                rowsPerPageList={[5, 10, 25, 50]}
                tableClass="table-centered mb-0"
                theadClass="table-light"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LeavePage;
