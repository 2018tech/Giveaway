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
    axios.delete('/messagedelete?id=' + item).then(
      axios.get('/currentUserMessage').then(res=>
        this.setState({ message: res.data}))
    )
  }

  onClear(item, e){
    e.preventDefault();
    axios.delete('/requestclear?id=' + item._id).then(
      axios.get('/acceptedRequests').then(res=>
        this.setState({accepted: res.data}))
    )
  }

  onAccept(item, e){
    e.preventDefault();
    fetch('/onAccept?id=' + item.user,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        item: item.item,
        location: this.state.user.locations.yourshopname
      })
    }).then(axios.delete('/messagedelete?id=' + item._id))
    .then(axios.get('/currentUserMessage').then(res=>
        this.setState({ message: res.data})))
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
      this.setState({ message: res.data}))

    axios.get('/acceptedRequests').then(res=>
      this.setState({accepted: res.data}))
}
    render() {
      const renderitems = this.state.message.map((item, i)=> {
          return (
            <div key={i}>
              <p>
                {item.messagefrom} wants to pick up your {item.item}. On this date: {item.month}/{item.date}. At this time: {item.hour}: {item.minutes} {item.amorpm}
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
                {item.accepts}
                <button onClick={(e)=> {this.onClear(item, e)}}>Clear</button>
              </p>
            </div>
          )
        })

      return (
        <div className="postanitempage">
          <div className="titles"><p>Messages</p></div>
          <h5>**Once you accept the request, please go to "Your Items" and delete respective item! I will fix the technical issue soon :)** </h5>
          {renderitems}
          <div className ="titles"><p>Accepted Requests</p></div>
          {renderAccepted}
          <div className="messagebelow"></div>
        </div>
      );
    }
  }
