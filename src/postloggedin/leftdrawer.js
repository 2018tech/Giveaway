import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

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

  onMessagePage(e){
    this.props.redirect('MessagePage')
  }


//for icons in this case, just use material-ui stuff. HTML things do not work.
  render() {
    return (
      <Drawer>
        <RaisedButton style={{display: 'flex', alignItems: 'center'}} label='Logout' onMouseDown={e => this.onLogout(e)} primary={true} />
        <div className= "tradingground" onClick={e=> this.onMain(e)}>Map</div>
        <div className= "profile" onClick={e=> this.onProfile(e)}>Profile</div>
        <div className="postanitem" onClick={e=>this.onPostanItem(e)}>Item</div>
        <div className="messagepage" onClick={e=>this.onMessagePage(e)}>Message</div>
      </Drawer>
    )}};
