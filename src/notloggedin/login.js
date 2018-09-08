import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state ={
      username: '',
      password: ''
    }
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  };

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  };

  onLogin(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(res => {
      switch(res.status) {
        case 200:
        this.props.setLogin(true)
        this.props.app.setState({currentPage: "Profile"})
        break;
        case 401:
        alert("There was a problem with your login")
        break;
        default:
      }
    })
    .catch(err => console.log('Error ', err));
  }

  render() {
    return (
      <div className="mainfrontpage">
        <Navbar>
          <Nav activeKey={1} pullLeft bsstyle="pills">
            <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
              Welcome to Giveaway
            </NavItem>
          </Nav>
          <Nav activeKey={1} pullRight bsstyle="pills">
            <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
              Home
            </NavItem>
            <NavItem eventKey={2} onSelect={()=>this.props.redirect('Register')}>
              Register
            </NavItem>
            <NavItem eventKey={2} onSelect={()=>this.props.redirect('Login')}>
              Login
            </NavItem>
          </Nav>
        </Navbar>
        <div className="lightgreen">
          <div className="container" id="lightgreen">
            <h2  class="spielbox">Login</h2>
            <form action="">
              <div className="field">
                <input type="email" onChange={e => this.onUsernameChange(e)}  ></input>
                <label>Username</label><br></br>

              </div>
              <div className="field">

                <input type="password" onChange={e => this.onPasswordChange(e)} ></input>
                <label>Password</label><br></br>

              </div><br></br>
              <button type="submit" onClick={e => this.onLogin(e)} className="btn btn-default">Login</button>
              {/* <Button variant="contained" color="secondary" onClick={e => this.onLogin(e)}>Login </Button> */}
            </form>
          </div>
          <div className="loginbelow"></div>
        </div>
      </div>
    );
  }
}
