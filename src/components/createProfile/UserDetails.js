import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Form,
  Input,
  Button,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";
import { authCreateProfileInfo } from "../../redux/actions/authActions";

class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      job: "",
      bio: "",

      twitter: "",
      facebook: "",
      instagram: "",
      file: "",
      stateError: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { name, job, bio, twitter, facebook, instagram, file } = this.state;

    if (!file || !instagram || !facebook || !twitter || !bio || !job || !name) {
      return this.setState({
        stateError: "some fields are blanck, please fill them to continue"
      });
    } else {
      return this.props.authCreateProfileInfo(
        this.props.match.params.uid,
        this.state,
        this.props.history
      );
    }
  };

  handleImageChange = e => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];
      this.setState({
        file
      });
    }
  };
  render() {
    const {
      name,
      bio,
      job,
      twitter,
      instagram,
      facebook,
      stateError
    } = this.state;
    //const { userProfileImg } = this.props.auth.profileInfo;
    const { buttonLoading, errors } = this.props.errors;
    return (
      <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              src={"dummyImg"}
              alt={`dummyImg`}
              width="190"
            />
          </div>
          <Col>
            <form className="m-4">
              <strong className="d-block">Edit Profile image</strong>
              <input type="file" onChange={this.handleImageChange} required />
            </form>
          </Col>
        </CardHeader>
        <CardBody>
          <Form className="add-new-post" onSubmit={this.onSubmit}>
            <Input
              size="lg"
              className="mb-3"
              placeholder="Your Full Name"
              name="name"
              value={name}
              onChange={this.onChange}
            />
            <Input
              size="lg"
              className="mb-3"
              placeholder="Job Title"
              name="job"
              value={job}
              onChange={this.onChange}
            />
            <Input
              type="textarea"
              className="mb-3"
              placeholder="A Brief Bio of Yourself"
              name="bio"
              value={bio}
              onChange={this.onChange}
            />
            <Input
              size="lg"
              className="mb-3"
              placeholder="Link to Facebook Profile"
              name="facebook"
              value={facebook}
              onChange={this.onChange}
            />
            <Input
              size="lg"
              className="mb-3"
              placeholder="Link to Twitter Profile"
              name="twitter"
              value={twitter}
              onChange={this.onChange}
            />
            <Input
              size="lg"
              className="mb-3"
              placeholder="Link to Instagram Profile"
              name="instagram"
              value={instagram}
              onChange={this.onChange}
            />
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
                Submit
              </Button>
            ) : (
              <Button type="submit" className="ml-auto">
                Submit
              </Button>
            )}
          </Form>
        </CardBody>
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
        <div>
          {stateError || errors.errorCode === "storage/invalid-argument" ? (
            <p style={{ color: "red" }}>{stateError || errors.errorMessage}</p>
          ) : (
            ""
          )}
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  authCreateProfileInfo
})(UserDetails);
