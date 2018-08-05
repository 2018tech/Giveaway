import React from 'react';

export default class PostanItem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        description: "",
        value: 0
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
          this.props.app.setState({currentPage: "Collection"});
          break;
          default:
          console.log(res.status);
        }
      })
      .catch(err => console.log('Error ', err));
    }

  render() {
    return (
      <div className="postanitempage">
        <form>
          <div>POST YOUR ITEM HERE</div>
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
      </div>

    );
  }
}
