import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class Firstpage extends React.Component {
  render(){
    return(
    <div>
      <Navbar>
        <Nav activeKey={1} pullLeft bsstyle="pills">
            <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
              Win-Win
            </NavItem>
          </Nav>
      <Nav activeKey={1} pullRight bsstyle="pills">
          <NavItem eventKey={2}  onSelect={()=>this.props.redirect('Firstpage')}>
            Home
          </NavItem>
          <NavItem eventKey={2}  onSelect={()=>this.props.redirect('About')}>
            About
          </NavItem>
          <NavItem eventKey={2} onSelect={()=>this.props.redirect('Register')}>
            Register
          </NavItem>
          <NavItem eventKey={2} onSelect={()=>this.props.redirect('Login')}>
            Login
          </NavItem>
        </Nav>
      </Navbar>

        <div className="frontpage"><br></br><br></br><br></br><br></br>Trade Anything. Stop Waste. <br></br><br></br><br></br><br></br></div>
    </div>
  )}
  }
