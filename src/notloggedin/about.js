import React from 'react';
import {Navbar, Nav, NavItem, Grid, Row, Col, Thumbnail} from 'react-bootstrap';


export default class About extends React.Component {

  render() {
    return (
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
          {/* <NavItem eventKey={2}  onSelect={()=>this.props.redirect('About')}>
            About
          </NavItem> */}
          <NavItem eventKey={2} onSelect={()=>this.props.redirect('Register')}>
            Register
          </NavItem>
          <NavItem eventKey={2} onSelect={()=>this.props.redirect('Login')}>
            Login
          </NavItem>
        </Nav>
      </Navbar>
      <div className="ourteam">About Win-Win</div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Grid>
        <Row>
          <Col xs={6} md={4}>
            <Thumbnail src="https://media.licdn.com/dms/image/C5603AQFXBZ_B-a0chg/profile-displayphoto-shrink_200_200/0?e=1539216000&v=beta&t=P56_gkE28NeYpEu5WnpzWr6vIup13jWQAmMyQih3FbM" alt="242x200" rounded>
            <h4><center>Jon Lee</center></h4>
            <p >I started this website because I realized that money has a big drawback. Money makes goods to lose value as soon as it is used to purchase something.
            Once things lose value, we are less inclinced to reuse and/or recycle but rather be more wasteful. I hope Win-Win solves this issue by motivating
            everyone enough to make the world a cleaner place. Interested in my project? Contact me at jleeei@gmail.com or jlee@colby.edu</p>
          </Thumbnail>
        </Col>
      </Row>
    </Grid>
  </div>
);
}
}
