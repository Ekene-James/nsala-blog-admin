import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import "./style.css";
import { connect } from "react-redux";

import { Container, Col } from "reactstrap";

import UserDetails from "./components/createProfile/UserDetails";
import SideBar from "./components/sideBar/SideBar";
import Addblog from "./components/addblog/Addblog";
import Login from "./components/createProfile/Login";
import UpdateUser from "./components/createProfile/UpdateUser";
import Home from "./components/Home";
import Blogs from "./components/blogs/Blogs";

import ErrorBoundary from "./components/ErrorBoundary";
import { getCurrentUser } from "./redux/actions/authActions";

class App extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser(this.props.history);
  }
  render() {
    const { user, isUser } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <ErrorBoundary>
            <div id="App">
              <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />

              <div id="page-wrap">
                <Container className="my-3 mr-4 pr-4">
                  <Col>
                    <Route path="/login" component={Login} />
                    {isUser ? (
                      <div>
                        <Route exact path="/" component={Home} />

                        <Route path="/add-blog" component={Addblog} />

                        <Route path="/my-blogs/:uid" component={Blogs} />

                        <Route
                          path="/update-profile/:uid"
                          component={UpdateUser}
                        />

                        <Route
                          path="/create-profile/:uid"
                          component={UserDetails}
                        />
                      </div>
                    ) : (
                      <Redirect to="/login" />
                    )}
                  </Col>
                </Container>
              </div>
            </div>
          </ErrorBoundary>
        </Switch>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.profileInfo,
  isUser: state.auth.user
});

export default connect(mapStateToProps, { getCurrentUser })(App);
