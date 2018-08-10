import React from 'react';


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      yourshopname: '',
      street: '',
      city: '',
      state: '',
      zipcode: 0
    };
  };

  onLocation(e) {
    e.preventDefault();
    console.log(this.state)
    console.log('enters onLocation');
    fetch('/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        yourshopname: this.state.yourshopname,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode
      })
    })
    .then(res => {
      switch(res.status) {
        case 200:
        console.log(res);
        break;
        default:
        console.log(res.status);
      }
    })
    .catch(err => console.log('Error ', err));
  }


  onyourshopnameChange(e) {
    this.setState({
      yourshopname: e.target.value
    });
  };

  onstreetChange(e) {
    this.setState({
      street: e.target.value
    });
  };

  oncityChange(e) {
    this.setState({
      city: e.target.value
    });
  };

  onstateChange(e) {
    this.setState({
      state: e.target.value
    });
  };

  onzipcodeChange(e) {
    this.setState({
      zipcode: e.target.value
    });
  };

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
  }

  render() {
    return (
      <div className="postanitempage">
        <p >Email: {this.state.user.username}</p>
        {/* <p >Password: {this.state.user.password}</p> */}
        <label>Your Shop Name: </label><br></br>
        <input type="yourshopname" onChange={e => this.onyourshopnameChange(e)} placeholder='Your Shop'></input>
        <div>
          <label>Street: </label><br></br>
          <input type="street" onChange={e => this.onstreetChange(e)} placeholder='Street'></input>
        </div>
        <div>
          <label>City: </label><br></br>
          <input type="city" onChange={e => this.oncityChange(e)} placeholder='City'></input>
        </div>
        <div>
          <label>State: </label><br></br>
          <input type="state" onChange={e => this.onstateChange(e)} placeholder='State'></input>
        </div>
        <div>
          <label>Zipcode: </label><br></br>
          <input type="zipcode" onChange={e => this.onzipcodeChange(e)} placeholder='Zipcode'></input>
        </div>
        <div>
          <button type="submit" onClick={e => this.onLocation(e)} className="btn btn-default">Submit</button>
        </div>
      </div>
    );
  }
}
