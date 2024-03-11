import React from "react";

function FallbackComponent({ error }) {
  return (
    <div className="container m-5">
      <div className="alert alert-danger" role="alert">
        Something horrible completely crashed the page.  Sorry about that.
      </div>
      <div className="row m-3">
        <button role="button" className="btn btn-primary">
          <a className="navbar-brand" href="/">Go back home</a>
        </button>
      </div>
      <div className="alert alert-info" role="alert">
        Some helpful info for the developers is below.  Feel free to copy and paste this, along with whatever you were trying to do, in a new issue here: <a href="https://github.com/kphurley/swlcgdb">GitHub</a>
      </div>
      <div className="alert alert-info" role="alert">
        { error.name }
        { error.message }
        { error.stack }
      </div>
    </div>
  )
}


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the FallbackComponent.
    return { hasError: true, error: error };
  }

  // TODO - this will be useful if/when we set up logging
  // componentDidCatch(error, info) {
  //   // Example "componentStack":
  //   //   in ComponentThatThrows (created by App)
  //   //   in ErrorBoundary (created by App)
  //   //   in div (created by App)
  //   //   in App
  //   // logErrorToMyService(error, info.componentStack);
  // }

  render() {
    if (this.state.hasError) {
      return <FallbackComponent error={this.state.error} />
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
