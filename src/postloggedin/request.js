import React from 'react';

export default class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minutes: 0,
      amorpm: ''
    };
  };

  onhourChange(e) {
    this.setState({
      hour: e.target.value
    });
  };

  onminutesChange(e) {
    this.setState({
      minutes: e.target.value
    });
  };

  onamorpmChange(e) {
    this.setState({
      amorpm: e.target.value
    });
  };

  ongobacktoMaps(e){
    this.props.redirect('MainPage')
  }

  ontimeSubmit(e) {
    e.preventDefault();
    fetch('/timesubmit?id=' + this.props.app.state.station["yourshopname"], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        hour: this.state.hour,
        minutes: this.state.minutes,
        amorpm: this.state.amorpm
      })
    })
    .then(res => {
      switch(res.status) {
        case 200:
        this.props.app.setState({currentPage: "MainPage"});
        break;
        default:
        console.log(res.status);
      }
    })
    .catch(err => console.log('Error ', err));
  }

  render() {
    {console.log(this.props.app.state.station)}
    return (
      <div className="timecontainer">
        <div className="row">
          <h2>You are almost there!</h2>
          <h3>Please select your time</h3>
          <div className="timecontainer">
            <form>
              <div className="timecontainer">
                <label>Hour: </label><br></br>
                <input type="hour" onChange={e => this.onhourChange(e)}></input>
              </div>
              <div className="timecontainer">
                <label>Minutes: </label><br></br>
                <input type="minutes" onChange={e => this.onminutesChange(e)}></input>
              </div>
              <div className="timecontainer">
                <label>AM or PM?: </label><br></br>
                <input type="amorpm" onChange={e => this.onamorpmChange(e)}></input>
              </div>
              <br></br>
              <button type="submit" onClick={e => this.ontimeSubmit(e)} className="btn btn-default">Submit</button>
              <button type="gobacktomaps" onClick={e => this.ongobacktoMaps(e)} className="btn btn-default">Go Back To Maps</button>
            </form>
          </div>
        </div>
      </div>
  );
}
}
