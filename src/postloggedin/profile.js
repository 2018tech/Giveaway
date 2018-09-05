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
      zipcode: 0,
      message: false
    };
  };

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

  onLocation(e) {
    e.preventDefault();
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
        this.setState({message: true})
        break;
        default:
      }
    })
    .catch(err => console.log('Error ', err));
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

    // axios.get('/')

  }

  render() {
    return (

      <div className="postanitempage">
        <div className="titles"><p>Welcome, {this.state.user.firstname}! To giveaway your stuff, please enter your address!</p></div>
        <label>Dorm & Room: </label><br></br>
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
        {this.state.message ? <p className="message">Your Location has been added! To edit, simply re-enter your address.</p>: null}
        <div className="registerbelow"></div>
      </div>
    );
  }
}
