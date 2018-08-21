import React from 'react';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from '@material-ui/core/MenuItem';
import Appbar from 'material-ui/AppBar';
import { black } from 'material-ui/styles/colors';
import { Home, Gift, Account, Message } from 'mdi-material-ui';


export default class LeftDrawer extends React.Component {
  constructor(props) {
          super(props)
          this.state = {
              drawerOpen: true
          }
      };

      toggleDrawer(e) {
          e.preventDefault()
          this.setState({drawerOpen: !this.state.drawerOpen})
      };

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
    const denseStyle = {
      minHeight:"10px",
      lineHeight: "25px",
      fontSize: "23px"
    }

    return (
      <div>
        {this.props.loggedIn ?
          <div className="App">
            <Appbar onLeftIconButtonClick={(e) => this.toggleDrawer(e)} style={{background: black}} />
            <Drawer open={this.state.drawerOpen}>
            <Appbar title="Giveaway" onLeftIconButtonClick={(e) => this.toggleDrawer(e)} style={{background: black}} />
            <MenuItem  style={denseStyle} onClick={e=> this.onMain(e)}><Home />Home</MenuItem>
            <MenuItem style={denseStyle} onClick={e=> this.onProfile(e)}><Account />Your Profile</MenuItem>
            <MenuItem style={denseStyle} onClick={e=>this.onPostanItem(e)}><Gift />Your Items</MenuItem>
            <MenuItem style={denseStyle} onClick={e=>this.onMessagePage(e)}><Message />Message</MenuItem>
            <RaisedButton style={{display: 'flex', alignItems: 'center'}} label='Logout' onMouseDown={e => this.onLogout(e)} primary={true} />
          </Drawer></div> : null}
        </div>
      )}};
