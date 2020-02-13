import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllMyBlogs } from "../../redux/actions/blogActions";
import Blog from "./Blog";
import { getCurrentUser } from "../../redux/actions/authActions";

export class Blogs extends Component {
  componentDidMount() {
    this.props.getCurrentUser(this.props.history);

    this.props.getAllMyBlogs(this.props.match.params.uid);
  }

  render() {
    const { myBlogs, buttonLoading, errors } = this.props;

    return (
      <div>
        <h5>total number of blogs : {myBlogs && myBlogs.length}</h5>

        {myBlogs &&
          myBlogs.map((blog, idx) => (
            <Blog
              key={idx}
              blog={blog}
              buttonLoading={buttonLoading}
              uid={this.props.match.params.uid}
            />
          ))}
        <div>
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  buttonLoading: state.errors.buttonLoading,
  myBlogs: state.blog.myBlogs,
  errors: state.errors.errors
});

export default connect(mapStateToProps, { getAllMyBlogs, getCurrentUser })(
  Blogs
);
