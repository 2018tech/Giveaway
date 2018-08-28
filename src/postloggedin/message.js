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
       this.setState({
        messages: res.messages
      })
    }).catch(err => console.log(err))
  }

  render() {
    const renderitems = this.state.messages.map((item, i)=> {
        return (
          <div key={i}>
            <p>{item.messagefrom} wants to pick up your {item.item} at {item.hour}: {item.minutes} {item.amorpm}</p>
          </div>
        )
      })

  return (
    <div className="postanitempage">
      <div className="titles"><p>Messages</p></div>
      {renderitems}
      <div className="messagebelow"></div>
    </div>
  );
}
}
