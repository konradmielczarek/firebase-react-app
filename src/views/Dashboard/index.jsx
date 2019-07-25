import React from 'react';

// REACTSTRAP
import { Col, Row } from 'reactstrap';

const Dashboard = () => {
  return (
    <>
      <Row className="mb-3">
        <Col>
          <small className="breadcrumbs text-muted">
            Home
          </small>
        </Col>
      </Row>
      <Row className="pb-1">
        <Col>
          <h2 className="page-title">Welcome!</h2>
          <hr />
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
