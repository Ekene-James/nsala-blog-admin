import React from "react";
import { Container, Row, Col } from "reactstrap";

import { connect } from "react-redux";

import Blog from "../blogs/Blog";

function SearchCompo({ searchItems, loading, match, buttonLoading }) {
  if (loading || searchItems === null) {
    return <h1>Loading....</h1>;
  }
  return (
    <Container>
      {searchItems.length === 0 ? (
        <div style={{ marginTop: "90px", marginBottom: "200px" }}>
          <h4>Found No Result For This Search Items</h4>
        </div>
      ) : (
        <div>
          <Row>
            <Col className="page-header py-4">
              <h4>{`Found ${searchItems.length} Result(s) For Your Search : `}</h4>
              <h5>{match.params.searchItem}</h5>
            </Col>{" "}
          </Row>
          <Row>
            {" "}
            {searchItems &&
              searchItems.map((blog, idx) => {
                return (
                  <Col key={idx} sm="12" md="6" lg="4" className="mb-4">
                    <Blog blog={blog} buttonLoading={buttonLoading} />
                  </Col>
                );
              })}
          </Row>
        </div>
      )}
    </Container>
  );
}
const mapStateToProps = state => ({
  loading: state.errors.loading,
  searchItems: state.blog.searchItems,
  buttonLoading: state.errors.buttonLoading
});
export default connect(mapStateToProps)(SearchCompo);
