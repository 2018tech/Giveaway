import React from 'react';
import axios from 'axios'

export default class PostanItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      value: 0,
      items: []
    };
  };

  onNamechange(e) {
    this.setState({
      name: e.target.value
    });
  };

  onDescriptionchange(e){
    this.setState({
      description: e.target.value
    })
  }

  onValuechange(e){
    this.setState({
      value: e.target.value
    })
  }

  componentDidMount() {
    axios.get('/collection').then(res=> this.setState({ items: res.data}))
  };

  onPostanItem(e) {
    e.preventDefault();
    fetch('/postitem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        value: this.state.value
      })
    })
    .then(res => {
      switch(res.status) {
        case 200:
        console.log(res);
        console.log('User added: ', this.state.username);
        this.props.app.setState({currentPage: "Mainpage"});
        break;
        default:
        console.log(res.status);
      }
    })
    .catch(err => console.log('Error ', err));
  }

  render() {
    const renderitems = () => {
      return this.state.items.map((item, i)=> {
        return (
          <div key={i}>
            <p>Item Name: {item.name}</p>
            <p>Item Description: {item.description}</p>
            <p>Item Value: {item.value}</p>
          </div>
        )
      })
    }
    return (
      <div className="postanitempage">
        <form>
          <div>Post Your Item</div>
          <div>
            Name:
            <input type="name" onChange={e => this.onNamechange(e)} placeholder='Name of Your Item'></input>
          </div>
          <div>
            Description:
            <input type="description" onChange={e => this.onDescriptionchange(e)} placeholder='Item Description'></input>
          </div>
          <div>
            Value:
            <input type="value" onChange={e => this.onValuechange(e)} placeholder='How much is your good?'></input>
          </div>
          <button type="submit" onClick={e => this.onPostanItem(e)} className="btn btn-default">Post an Item</button>
        </form>
        <br></br>
        All Items
        {renderitems()}
      </div>

    );
  }
}
