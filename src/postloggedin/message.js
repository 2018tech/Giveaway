import React from 'react';

export default class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  };

  componentDidMount(){
    fetch('/currentUserMessage', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res=> res.json())
    .then(res => {
      this.setState({
        user: res
      })
    }).catch(err => console.log(err))
  }

  render() {
    {console.log(this.state.user)}
    {console.log(this.state.user.messages)}
  //this.state.user.messages.map(item=> {
    //   return hours: item["hour"]
    // })
    // {console.log(eachmessage)}

  return (
    <div className="postanitempage">
    </div>
  );
}
}
