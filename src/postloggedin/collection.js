import React from 'react';
import axios from 'axios'

export default class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  };

  componentDidMount() {
    axios.get('/collection').then(res=> this.setState({ items: res.data}))
  };

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
        All Items
        {renderitems()}
      </div>
    );
  }
}
