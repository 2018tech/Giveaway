import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';

export default class LeftDrawer extends React.Component {


  onLogout(e) {
    fetch('/logout', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      switch(res.status) {
        case 200:
        this.props.setLogin(false)
        this.props.redirect('Login')
        break
        default:
        console.log(res.status)
      }
    }).catch(err => console.log(err))
  };

  onProfile(e) {
    this.props.redirect('Profile')
  }

  onMain(e) {
    this.props.redirect('Home')
  }

  onPostanItem(e){
    this.props.redirect('PostanItem')
  }

  onCollection(e){
    this.props.redirect('Collection')
  }

  render() {
    return (
      <Drawer className="container">
        <RaisedButton style={{display: 'flex', alignItems: 'center'}} label='Logout' onMouseDown={e => this.onLogout(e)} primary={true} />
        <div className="intro"><p>Welcome to Trade!</p></div>
        <div className= "tradingground" onClick={e=> this.onMain(e)}>TradingGround</div>
        <div className= "profile" onClick={e=> this.onProfile(e)}>Profile</div>
        <div className="postanitem" onClick={e=>this.onPostanItem(e)}>Post an Item!</div>
        <div className="collection" onClick={e=>this.onCollection(e)}>Collection</div>
        <div className="tradehistory">Trade History</div>
      </Drawer>
    )}};
