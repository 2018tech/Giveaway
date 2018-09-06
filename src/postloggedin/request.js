import React from 'react';

export default class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minutes: 0,
      amorpm: '',
      item: '',
      month: '',
      date: 0,
      message: false,
      itemclick: props.options.eachitem
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

  onitemChange(e){
    this.setState({
      item: e.target.value
    });
  };

  onmonthChange(e){
    this.setState({
      month: e.target.value
    })
  }

  ondateChange(e){
    this.setState({
      date: e.target.value
    })
  }

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
        item: this.state.item,
        hour: this.state.hour,
        minutes: this.state.minutes,
        amorpm: this.state.amorpm,
        month: this.state.month,
        date: this.state.date
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

  render() {
    {console.log(this.state.itemclick)}
    return (
      <div className="timecontainer">
        <div className="row">
          <h2>You are almost there!</h2>
          <div className="timecontainer">
            <form>
              <br></br>
              <h4>Which Item?</h4>
              <div className="timecontainer">
                <br></br>
                <input type="item" onChange={e => this.onitemChange(e)}></input>
              </div>
              <h4>Select Your Date</h4>
              <div className="timecontainer">
                <select onChange={e => this.onmonthChange(e)}>
                  <option value="Month">Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                 </select>
                <select onChange={e => this.ondateChange(e)}>
                  <option value="Date">Date</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                 </select>
              </div>
              <br></br>
              <h4>Select Your Time</h4>
              <div className="timecontainer">
                <label>Hour<p></p>
                  <select onChange={e => this.onhourChange(e)}>
                    <option value="0">Hour:</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </label>
                <label>Minutes<p></p>
                  <select onChange={e => this.onminutesChange(e)}>
                    <option value="0">Minutes:</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                  </select>
                </label>
                <label>AM/PM<p></p>
                  <select onChange={e => this.onamorpmChange(e)}>
                    <option value="none">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </label>
              </div>
              <br></br>
              <button type="submit" onClick={e => this.ontimeSubmit(e)} className="btn btn-default">Submit</button>
              <button type="gobacktomaps" onClick={e => this.ongobacktoMaps(e)} className="btn btn-default">Go Back To Maps</button>
              <div className="titles">{this.state.message ? <p className="message">Your request has been sent!</p>: null}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
