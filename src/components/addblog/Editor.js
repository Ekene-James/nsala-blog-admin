import React from "react";

import {
  Card,
  CardBody,
  Form,
  Input,
  Button,
  Col,
  CardHeader,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./quill.css";
import { modules } from "./quill";
import { postBlog } from "../../redux/actions/blogActions";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      category: "",
      file: "",
      stateError: ""
    };
  }
  handleImageChange = e => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];
      this.setState({
        file
      });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onTextChange = value => {
    this.setState({
      text: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const blog = {
      ...this.state,
      bloggerId: this.props.auth.profileInfo.bloggerId,
      bloggerProfileImgUrl: this.props.auth.profileInfo.bloggerProfileImgUrl,
      name : this.props.auth.profileInfo.name
    };
    if (
      this.state.category.length === 0 ||
      this.state.text.length === 0 ||
      this.state.file.length === 0
    ) {
      return this.setState({
        stateError: "Some Fields Are Empty, please fill them before proceeding"
      });
    }
    this.props.postBlog(blog, this.props.history);
  };

  render() {
    const { title, stateError } = this.state;
    const { buttonLoading, errors } = this.props;

    return (
      <Col>
        <Col>
          <form className="m-4">
            <strong className="d-block">upload this blog post cover img</strong>
            <input type="file" onChange={this.handleImageChange} required />
          </form>
        </Col>
        <Card className="mb-3">
          <CardHeader className="border-bottom">
            <h6 className="m-0">category</h6>
          </CardHeader>
          <CardBody className="p-0">
            <Input
              type="select"
              onChange={this.onChange}
              name="category"
              size="lg"
              className="mb-2"
            >
              <option value="0">--Select--</option>
              <option value="Tech">Tech</option>
              <option value="LifeStyle">LifeStyle</option>
              <option value="Food">Food</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Sports">Sports</option>
              <option value="Others">Others</option>
            </Input>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardBody>
            <Form className="add-new-post" onSubmit={this.onSubmit}>
              <Input
                size="lg"
                className="mb-3"
                placeholder="Your Post Title"
                name="title"
                value={title}
                onChange={this.onChange}
                required
              />
              <ReactQuill
                className="add-new-post__editor"
                modules={modules}
                onChange={this.onTextChange}
                theme={"snow"}
              />
              <Col className=" mt-3">
                {buttonLoading ? (
                  <Button disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      variant="primary"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Publish
                  </Button>
                ) : (
                  <Button type="secondary" className="ml-auto">
                    Publish
                  </Button>
                )}
              </Col>
            </Form>
          </CardBody>
        </Card>
        <Col>
          {errors.errorCode === "unavailable" ||
          errors.errorCode === "auth/network-request-failed" ||
          errors.errorCode === "storage/object-not-found" ? (
            <p style={{ color: "red" }}>
              Is like there is something wrong with your network connection,
              please refresh or try again
            </p>
          ) : (
            ""
          )}
        </Col>
        <Col>
          {stateError ? <p style={{ color: "red" }}>{stateError}</p> : ""}
        </Col>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  buttonLoading: state.errors.buttonLoading,
  errors: state.errors.errors
});
export default connect(mapStateToProps, { postBlog })(withRouter(Edit));
