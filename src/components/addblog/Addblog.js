import React from "react";
import { Container, Row, Col } from "reactstrap";

import Edit from "./Editor";

const Addblog = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row className="page-header py-4">
      <h5>Add New Blog</h5>
    </Row>

    <Row>
      {/* Editor */}
      <Col lg="9" md="12">
        <Edit />
      </Col>

      {/* Sidebar Widgets */}
      <Col lg="3" md="12" />
    </Row>
  </Container>
);

export default Addblog;
