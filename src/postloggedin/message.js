import React from 'react';
import axios from 'axios';

export default class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      state: '',
      user: '',
      accepted: []
    };
  };

  onDecline(item, e){
    e.preventDefault();
    axios.delete('/messagedelete?id=' + item)
  }

  onAccept(item, e){
    e.preventDefault();
    fetch('/onAccept?id=' + item.user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        item: item.item,
        location: this.state.user.locations.yourshopname
      })
    })
    axios.delete('/messagedelete?id=' + item._id)
  }

  componentDidMount(){
    fetch('/currentUser', {
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

    axios.get('/currentUserMessage').then(res=>
      // console.log(res.data))}
      this.setState({ message: res.data}))

    axios.get('/acceptedRequests').then(res=>
      // console.log(res.data))
      this.setState({accepted: res.data}))
}
    render() {
      const renderitems = this.state.message.map((item, i)=> {
          return (
            <div key={i}>
              <p>
                {item.messagefrom} wants to pick up your {item.item} at {item.hour}: {item.minutes} {item.amorpm}
                <button onClick={(e)=> this.onAccept(item, e)}>Accept</button>
                <button onClick={(e)=> this.onDecline(item._id, e)}>Decline</button>
              </p>
            </div>
          )
        })

      const renderAccepted = this.state.accepted.map((item, i)=> {
          return (
            <div>
              <p>
                {item.accept}
              </p>
            </div>
          )
        })

      return (
        <div className="postanitempage">
          <div className="titles"><p>Messages</p></div>
          {renderitems}
          <div classNAME ="titles"><p>Accepted Requests</p></div>
          {renderAccepted}
          <div className="messagebelow"></div>
        </div>
      );
    }
  }
