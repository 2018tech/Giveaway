import React from 'react';

export default class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  };

  componentWillMount(){
    fetch('/currentUserMessage', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res=> res.json())
    .then(res => {
      console.log(res.messages)
       this.setState({
        messages: res.messages
      })
      console.log(this.state.messages);
    }).catch(err => console.log(err))
  }

  render() {
    const renderitems = this.state.messages.map((item, i)=> {
        return (
          <div key={i}>
            <p>Someone will pick up your item at {item.hour}: {item.minutes} {item.amorpm}</p>
          </div>
        )
      })


  return (
    <div className="postanitempage">
      <h2>Messages</h2>
      {renderitems}
    </div>
  );
}
}
