import React, { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrored: false,
      error: ""
    };
  }
  componentDidCatch(error, info) {
    if (error) {
      this.setState({
        error,
        hasErrored: true
      });
    }
  }
  render() {
    if (this.state.hasErrored) {
      return <div>something went wrong, try refreshing the page...</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
