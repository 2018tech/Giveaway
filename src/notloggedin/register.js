import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordconfirm: '',
      yourshopname: '',
      street: '',
      city: '',
      state: '',
      zipcode: 0
    };
  };

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

  onPasswordConfirm(e) {
    this.setState({
      passwordconfirm: e.target.value
    });
  };

  onyourshopnameChange(e) {
    this.setState({
      yourshopname: e.target.value
    });
  };

  onstreetChange(e) {
    this.setState({
      street: e.target.value
    });
  };

  oncityChange(e) {
    this.setState({
      city: e.target.value
    });
  };

  onstateChange(e) {
    this.setState({
      state: e.target.value
    });
  };

  onzipcodeChange(e) {
    this.setState({
      zipcode: e.target.value
    });
  };


  onRegister(e) {
    e.preventDefault();
    if (this.state.zipcode.length !== 5){
      alert('Invalid Zipcode!')
    }
    else if(this.state.password !== this.state.passwordconfirm){
      alert('Passwords did not match')
    }else if(this.state.state.length !== 2){
      alert('Invalid State')
    }
    else if(this.state.password.length <= 5){
      alert("Your password is too short")
    }
    else
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        yourshopname: this.state.yourshopname,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode
      })
    })
    .then(res => {
      switch(res.status) {
        case 200:
        console.log(res);
        console.log('User added: ', this.state.username);
        this.props.app.setState({currentPage: "Login"});
        break;
        default:
        console.log(res.status);
      }
    })
    .catch(err => console.log('Error ', err));
  }

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
            <NavItem eventKey={4} onSelect={()=>this.props.redirect('Login')}>
              LOGIN
            </NavItem>
          </Nav>
        </Navbar>

      <div className="loginregister">
        <h2 >Register</h2>
        <div>
          <form>
            <div>
              <label>ID: </label>
              <input type="email" onChange={e => this.onUsernameChange(e)} placeholder='Username'></input>
            </div>
            <div>
              <label>Password: </label>
              <input type="password" onChange={e => this.onPasswordChange(e)} placeholder='Password'></input>
            </div>
            <div>
              <label>Password Confirmation: </label>
              <input type="passwordconfirm" onChange={e => this.onPasswordConfirm(e)} placeholder='Password Confirmation'></input>
            </div>
            <div>
              <label>Your Shop Name: </label>
              <input type="yourshopname" onChange={e => this.onyourshopnameChange(e)} placeholder='Your Shop'></input>
            </div>
            <div>
              <label>Street: </label>
              <input type="street" onChange={e => this.onstreetChange(e)} placeholder='Street'></input>
            </div>
            <div>
              <label>City: </label>
              <input type="city" onChange={e => this.oncityChange(e)} placeholder='City'></input>
            </div>
            <div>
              <label>State: </label>
              <input type="state" onChange={e => this.onstateChange(e)} placeholder='State'></input>
            </div>
            <div>
              <label>Zipcode: </label>
              <input type="zipcode" onChange={e => this.onzipcodeChange(e)} placeholder='Zipcode'></input>
            </div>
            <button type="submit" onClick={e => this.onRegister(e)} className="btn btn-default">Register</button>
          </form>
        </div>
      </div>
    </div>
    );
  }
}
