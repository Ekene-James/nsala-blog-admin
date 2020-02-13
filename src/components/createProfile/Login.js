import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/actions/authActions";

import { Button, Spinner } from "reactstrap";

class Login extends Component {
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

    this.props.login(this.state, this.props.history);
  };
  render() {
    const { email, password } = this.state;
    const { buttonLoading, errors } = this.props;
    return (
      <div className="md-6">
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
              Login
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">
              Login
            </Button>
          )}
        </form>

        {errors.errorCode === "unavailable" ||
        errors.errorCode === "auth/network-request-failed" ? (
          <p style={{ color: "red" }}>
            Is like there is something wrong with your network connection,
            please refresh and try again later
          </p>
        ) : (
          ""
        )}
        <div>
          {errors.errorCode === "auth/wrong-password" ? (
            <p style={{ color: "red" }}>{errors.errorMessage}</p>
          ) : (
            ""
          )}
        </div>
        <div>
          {errors.errorCode === "auth/user-not-found" ? (
            <p style={{ color: "red" }}>{errors.errorMessage}</p>
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
  errors: state.errors.errors
});
export default connect(mapStateToProps, { login })(Login);
