import React, { Component } from "react";
import { connect } from "react-redux";


import { Button, Spinner } from "reactstrap";
import { createUser } from "../../redux/actions/authActions";

export class Forms extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.createUser(this.state, this.props.history);
  };
  render() {
    const { email, password } = this.state;
    const { buttonLoading, errors } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={this.onChange}
              name="password"
              value={password}
              required
            />
          </div>

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
        </form>
        <div>
          {errors.errorCode === "unavailable" ||
          errors.errorCode === "auth/network-request-failed" ? (
            <p style={{ color: "red" }}>
              Is like there is something wrong with your network connection,
              please refresh and try again later
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  buttonLoading: state.errors.buttonLoading,
  errors: state.errors.errors,
  success: state.errors.success
});

export default connect(mapStateToProps, { createUser })(Forms);
