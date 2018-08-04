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
          <div>
          <p key={i}>Item Name: {item.name}</p>
          <p key={i}>Item Description: {item.description}</p>
          <p key={i}>Item Value: {item.value}</p>
        </div>
        )
      })
    }
    return (
      <div className="profilepage">
        all items
        {renderitems()}
      </div>
    );
  }
}
