// import React from 'react';
//
//
// export default class PostanItem extends React.Component {
//
// componentDidMount(){
//     fetch('/currentUser', {
//       method: 'GET',
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then(res=> res.json())
//     .then(res => {
//       this.setState({
//         user: res
//       })
//     }).catch(err => console.log(err))
//   }
//
//
//
//
//   render() {
//     return (
//       <div className="postanitempage">
//         <p>Email: {this.state.user.username}</p>
//         <p>Password</p>
//       </div>
//     );
//   }
// }
