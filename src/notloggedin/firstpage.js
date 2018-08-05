import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class Firstpage extends React.Component {
  render(){
    return(
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Win-Win</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav activeKey={1} pullRight bsstyle="pills">
          <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
            HOME
          </NavItem>
          <NavItem eventKey={2}  onSelect={()=>this.props.redirect('About')}>
            ABOUT
          </NavItem>
          <NavItem eventKey={2} onSelect={()=>this.props.redirect('Register')}>
            REGISTER
          </NavItem>
          <NavItem eventKey={2} onSelect={()=>this.props.redirect('Login')}>
            LOGIN
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )}
  }
