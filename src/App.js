import React from 'react';
import Mainpage from './postloggedin/./main.js';
import Login from './notloggedin/./login.js';
import Register from './notloggedin/./register.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftDrawer from './postloggedin/./leftdrawer.js';
import Profile from './postloggedin/./profile.js';
import PostanItem from './postloggedin/./postanitem.js';
import Collection from './postloggedin/./collection.js';
import Firstpage from './notloggedin/./firstpage.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Firstpage",
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
              {this.state.currentPage === 'Mainpage' ? <Mainpage redirect={this.redirect} setLogin={this.setLogin} app={this}/>: null}
              {this.state.currentPage === 'Profile' ? <Profile redirect={this.redirect} setLogin={this.setLogin} app={this}/>: null}
              {this.state.currentPage === 'PostanItem' ? <PostanItem redirect={this.redirect} setLogin={this.setLogin} app={this}/>: null}
              {this.state.currentPage === 'Collection' ? <Collection redirect={this.redirect} setLogin={this.setLogin} app={this}/>: null}
              {this.state.currentPage === 'Firstpage' ? <Firstpage redirect={this.redirect} setLogin={this.setLogin} app={this}/>: null}

            </div>
          </MuiThemeProvider>
        </div>
      );
    }
  }
