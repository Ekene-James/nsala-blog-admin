import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../../redux/actions/authActions";
import { connect } from "react-redux";

class SideBar extends React.Component {
  render(props) {
    let View;
    const { user, isUser, uid } = this.props;
    if (isUser) {
      View = (
        <Menu {...this.props}>
          <ol>
            <li className="mt-4">
              <Link className="menu-item" to="/">
                Home
              </Link>
            </li>
            <li className="mt-4">
              <Link className="menu-item" to="/add-blog">
                Add Blog
              </Link>
            </li>
            {this.props.user.bloggerId ? (
              <li className="mt-4">
                <Link
                  className="menu-item"
                  to={`/update-profile/${user.bloggerId}`}
                >
                  UpdateProfile
                </Link>
              </li>
            ) : (
              <li className="mt-4">
                <Link className="menu-item" to={`/create-profile/${uid}`}>
                  create Profile
                </Link>
              </li>
            )}

            <li className="mt-4">
              <Link
                className="menu-item"
                to={`/my-blogs/${this.props.user.bloggerId}`}
              >
                My Blogs
              </Link>
            </li>
            <li className="mt-4">
              <Link
                className="menu-item"
                onClick={() => this.props.logout(this.props.history)}
              >
                Logout
              </Link>
            </li>

            <li className="mt-4">
              <h5 className="menu-item"> welcome : {this.props.user.name}</h5>
            </li>
          </ol>
        </Menu>
      );
    } else {
      View = (
        <Menu {...props}>
          <Link className="menu-item" to="/login">
            Login
          </Link>
        </Menu>
      );
    }
    return <div className="menu-item"> {View}</div>;
  }
}
const mapStateToProps = state => ({
  user: state.auth.profileInfo,
  isUser: state.auth.user,
  uid: state.auth.uid
});

export default connect(mapStateToProps, { getCurrentUser, logout })(SideBar);
