import React from 'react';
import Home from './components/./home.js';
import Login from './components/./login.js';
import Register from './components/./register.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftDrawer from './leftdrawer/./leftdrawer.js';
import Profile from './leftdrawer/./profile.js';
import PostanItem from './leftdrawer/./postanitem.js';
import Collection from './leftdrawer/./collection.js';
import About from './components/./about.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Login",
      loggedIn: false
    };
    this.setLogin = this.setLogin.bind(this)
    this.redirect = this.redirect.bind(this);
  };
  //page is like 'Home'
  redirect(page, options) {
    /** Redirect the application to a specified page.
    * @param page - A page to which the application is to redirect.
    */
    this.setState({currentPage: page, options: options})
  }
  setLogin(b) {
    this.setState({loggedIn: b})
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div>
              {this.state.loggedIn ?
                <LeftDrawer redirect={this.redirect} setLogin={this.setLogin} loggedIn={this.state.loggedIn} />
                : null}
              </div>
              {this.state.currentPage === 'Register' ? <Register redirect={this.redirect} app={this}/> : null}
              {this.state.currentPage === 'Login' ? <Login redirect={this.redirect} app={this} setLogin={this.setLogin} /> : null}
              {this.state.currentPage === 'Home' ? <Home redirect={this.redirect} setLogin={this.setLogin} app={this}/>: null}
              {this.state.currentPage === 'Profile' ? <Profile redirect={this.redirect} setLogin={this.setLogin} app={this}/>: null}
              {this.state.currentPage === 'PostanItem' ? <PostanItem redirect={this.redirect} setLogin={this.setLogin} app={this}/>: null}
              {this.state.currentPage === 'Collection' ? <Collection redirect={this.redirect} setLogin={this.setLogin} app={this}/>: null}
              {this.state.currentPage === 'About' ? <About redirect={this.redirect} setLogin={this.setLogin} app={this}/>: null}

            </div>
          </MuiThemeProvider>
        </div>
      );
    }
  }
