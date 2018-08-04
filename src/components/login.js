import React from 'react';
// import Button from 'react-semantic-ui';

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
        this.props.app.setState({currentPage: "Home"})
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
        <div><button onClick={() => this.props.redirect('Register')}>Register</button>
        <button onClick={() => this.props.redirect('About')}>About</button>
      </div>
        <h1 className="loginregister">Login</h1>
        <form>
          <div className="loginregister">
            <label>ID</label>
            <input type="email" onChange={e => this.onUsernameChange(e)} className="form-control" placeholder='email address'></input>
          </div>
          <div className="loginregister">
            <label>Password</label>
            <input type="password" onChange={e => this.onPasswordChange(e)} className="form-control" placeholder='password'></input>
          </div>
          <div className="loginregister">
            <button type="submit" onClick={e => this.onLogin(e)} className="btn btn-default">Login</button>
          </div>
        </form>
      </div>
    );
  }
}
