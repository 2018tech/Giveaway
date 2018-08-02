import React from 'react';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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

  onRegister(e) {
    e.preventDefault();
    console.log(this.state.username, this.state.password)

    fetch('/register', {
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
        <div><button onClick={() => this.props.redirect('Login')}>Login</button></div>

        <h2 className="register">Register</h2>
        <div>
          <form>
            <div>
              <label>ID</label>
              <input type="email" onChange={e => this.onUsernameChange(e)} placeholder='username'></input>
            </div>
            <div>
              <label>Password</label>
              <input type="password" onChange={e => this.onPasswordChange(e)} placeholder='password'></input>
            </div>
            <button type="submit" onClick={e => this.onRegister(e)} className="btn btn-default">Register</button>
          </form>
        </div>
      </div>
    );
  }
}
