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
          <Nav activeKey={1} pullLeft bsstyle="pills">
            <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
              Win-Win
            </NavItem>
          </Nav>

          <Nav activeKey={1} pullRight bsstyle="pills">
            <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
              Home
            </NavItem>
            {/* <NavItem eventKey={2}  onSelect={()=>this.props.redirect('About')}>
            About
          </NavItem> */}
          <NavItem eventKey={2} onSelect={()=>this.props.redirect('Register')}>
            Register
          </NavItem>
          <NavItem eventKey={2} onSelect={()=>this.props.redirect('Login')}>
            Login
          </NavItem>
        </Nav>
      </Navbar>
      <div className="container">
        <h2 className="row">Login</h2>
        <form>
          <div className="col-25">
            <label>Email:</label><br></br>
            <input type="email" onChange={e => this.onUsernameChange(e)}  ></input>
          </div>
          <div className="col-25">
            <label>Password</label><br></br>
            <input type="password" onChange={e => this.onPasswordChange(e)} ></input>
          </div>
            <button type="submit" onClick={e => this.onLogin(e)} className="btn btn-default">Login</button>
        </form>
      </div>
    </div>
  );
}
}
