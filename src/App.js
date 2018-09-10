import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Register from "./components/register/Register"
import Login from "./components/register/Login"
import ApplicationViews from "./components/ApplicationViews"

class App extends Component {

  state = {
    login: true
  }

  handleLogout = () => {
    sessionStorage.removeItem("user");
    this.setState({ login: false })
  }

  isAuthenticated = () => sessionStorage.getItem("user") !== null

  render() {
    return (
      <React.Fragment>
        {!this.isAuthenticated() &&
        <div>
            <Route exact path="/login" render={props => {
              return <Login {...props} />
            }} />
          <Route path="/register" render={props => {
            return < Register {...props} />
          }} />
          </div>
        }
        {
          <ApplicationViews isAuthenticated={this.isAuthenticated} handleLogout={this.handleLogout} />

        }
      </React.Fragment>
    );
  }
}

export default App;
