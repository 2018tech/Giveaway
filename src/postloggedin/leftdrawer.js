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
    this.props.redirect('Mainpage')
  }

  onPostanItem(e){
    this.props.redirect('PostanItem')
  }

  onCollection(e){
    this.props.redirect('Collection')
  }
  


  render() {
    return (
      <Drawer>
        <RaisedButton style={{display: 'flex', alignItems: 'center'}} label='Logout' onMouseDown={e => this.onLogout(e)} primary={true} />
        <div className="intro"><p>Win-Win</p></div>
        <div className= "tradingground" onClick={e=> this.onMain(e)}>Map Home</div>
        <div className= "profile" onClick={e=> this.onProfile(e)}>User Profile</div>
        <div className="postanitem" onClick={e=>this.onPostanItem(e)}>Post an Item!</div>
        <div className="collection" onClick={e=>this.onCollection(e)}>Collection</div>
        <div className="tradehistory">Trade History</div>
      </Drawer>
    )}};
