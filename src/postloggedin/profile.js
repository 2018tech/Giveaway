import React from 'react';


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  };

componentDidMount(){
    fetch('/currentUser', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=> res.json())
    .then(res => {
      this.setState({
        user: res
      })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div className="profilepage">
        <p>Email: {this.state.user.username}</p>
        <p>Password</p>
      </div>
    );
  }
}
