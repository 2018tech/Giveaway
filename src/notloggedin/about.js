import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';


export default class About extends React.Component {

  render() {
    return (
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
            <NavItem  eventKey={2} onSelect={()=>this.props.redirect('Login')}>
              LOGIN
            </NavItem>
          </Nav>
        </Navbar>

      <div className="aboutpage">
          <div className="aboutpagetitles">Story</div>
          <div className="detail">
I remember sitting in Macroeconomics class my Junior year in college and learning about the concept of money.

Money, money, money...Why is it so important and why do we even have it to begin with?

The textbook answer (literally) was because it's rare to have double coincidence of wants. It's a coincidence that occurs when two people have goods or services that they want to trade with one another.

So I started thinking "OK...then what's the caveat of money...?" The textbook just described to us why we need it in our society, but is there any downside to it?

Of course, there is.

Here's my theory. I believe that money make goods to lose its value rapidly.

For instance, if you were to sell the t-shirt that you bought for 20 dollars, you are likely to not get even half of the original price...

It's for that reason why we throw stuff away and waste. As a matter of fact, in the U.S. alone, we waste more than 150,000 tons of food a day.
You heard me, 150,000 tons of food a day. I haven't even started talking about all the other categories of waste yet.

I built this website to combat the issue. If I have convinced you in any part of my story, please register and give it a shot!
          </div>

          <div className="aboutpagetitles">Team</div>
          <div className="detail">Founder: Jon Lee</div>

      </div>
    </div>
    );
  }
}
