import React from 'react';
import axios from 'axios';

export default class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: []
    };
  };

  onDecline(item, e){
    e.preventDefault();
    // console.log(item);
    axios.delete('/messagedelete?id=' + item)
  }

//the person who wrote the message's id comes as "user". 그러면
//use that id to find that person's accept schema then push into interval it;

  onAccept(item, e){
    e.preventDefault();
    // console.log(item)
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
    this.setState({ message: res.data}))
};

  render() {
    const renderitems = () => {
      return this.state.message.map((item, i)=> {
        return (
          <div key={i}>
            {console.log(this.state.message)}
            {/* {console.log(item)} */}
            <p>
              {item.messagefrom} wants to pick up your {item.item} at {item.hour}: {item.minutes} {item.amorpm}

              <button onClick={(e)=> this.onAccept(item.user, e)}>Accept</button>
              <button onClick={(e)=> this.onDecline(item._id, e)}>Decline</button>

          </p>

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
