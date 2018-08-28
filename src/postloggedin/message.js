import React from 'react';
import axios from 'axios';

export default class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  };

//delete button deletes items in the database, but it does not render properly. something weird going on with get Request FORSURE
  onDecline(item, e){
    e.preventDefault();
    console.log(item);
    axios.delete('/messagedelete?id=' + item)
  }

  // componentDidMount(){
  //   fetch('/currentUserMessage', {
  //     method: 'GET',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(res=> res.json())
  //   .then(res => {
  //      this.setState({
  //       messages: res.messages
  //     })
  //     console.log(this.state.messages)
  //   }).catch(err => console.log(err))
  // }
componentDidMount(){
  axios.get('/currentUserMessage').then(res=>
    this.setState({ messages: res.data.messages}))
};

  render() {
    const renderitems = () => {
      return this.state.messages.map((item, i)=> {
        return (
          <div key={i}>
            <p>{item.messagefrom} wants to pick up your {item.item} at {item.hour}: {item.minutes} {item.amorpm}<button onClick={(e)=> this.onDecline(item._id, e)}>Decline</button></p>
          </div>
        )
      })
  }
  return (
    <div className="postanitempage">
      <div className="titles"><p>Messages</p></div>
      {renderitems()}
      <div className="messagebelow"></div>
    </div>
  );
}
}
