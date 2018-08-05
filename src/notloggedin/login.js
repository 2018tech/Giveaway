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
        console.log(res);
        console.log('User validated: ', this.state.username);
        this.props.setLogin(true)
        this.props.app.setState({currentPage: "Mainpage"})
        break;
        default:
        console.log(res.status);
      }
    })
    .catch(err => console.log('Error ', err));
  }
  // <Button onClick={()=> this.props.redirect('Register')}>Register</Button>
  // <Button onClick={()=> this.props.redirect('About')}>About</Button>

  render() {
    return (
      <div>

        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a>Win-Win</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav activeKey={1} pullRight bsstyle="pills">
            <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
              HOME
            </NavItem>
            <NavItem eventKey={2}  onSelect={()=>this.props.redirect('About')}>
              ABOUT
            </NavItem>
            <NavItem eventKey={2} onSelect={()=>this.props.redirect('Register')}>
              REGISTER
            </NavItem>
            <NavItem eventKey={2} onSelect={()=>this.props.redirect('Login')}>
              LOGIN
            </NavItem>
          </Nav>
        </Navbar>

        <h1 className="loginregister">Login</h1>
        <form>
          <div className="loginregister">
            <label>ID:    </label>
            <input type="email" onChange={e => this.onUsernameChange(e)} className="form-control" placeholder='ID'></input>
          </div>
          <div className="loginregister">
            <label>Password</label>
            <input type="password" onChange={e => this.onPasswordChange(e)} className="form-control" placeholder='Password'></input>
          </div>
          <div className="loginregister">
            <button type="submit" onClick={e => this.onLogin(e)} className="btn btn-default">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
