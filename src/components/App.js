import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import "./App.css";

class PrivateRoute extends Component {
  render() {
    const { isAuthenticated, component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}

class Login extends Component {
  render() {
    const { isAuthenticated, login } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="page">
        <h1>Login</h1>

        <p>You are currently not authenticated.</p>

        <button onClick={login}>Login</button>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div className="page">
        <h1>Code Playground</h1>
        <p>Welcome to the private Code Playground!</p>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  handleLogin = () => {
    this.setState({
      isAuthenticated: true
    });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <div className="main-container">
          <nav>
            <Link to="/">Code Playground</Link>
            {" | "}
            <Link to="/login">Login</Link>
          </nav>

          <p className="status">
            Authentication status:{" "}
            <strong>
              {isAuthenticated ? "Authenticated" : "Not Authenticated"}
            </strong>
          </p>

          <Switch>
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  isAuthenticated={isAuthenticated}
                  login={this.handleLogin}
                />
              )}
            />

            <PrivateRoute
              exact
              path="/"
              component={Home}
              isAuthenticated={isAuthenticated}
            />

            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
