
import React from 'react';
import './App.css';
import GetUser from './UI/user/GetUser';

import Register from './UI/user/Register.js';

class User extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>First Name </th>
            <th> Last Name</th>
            <th> Mobile Number</th>
            <th> Email</th>
            <th>Password</th>
            <th> Age</th>
          </tr>
        </thead>
        <tbody>
          {this.props.Users && this.props.Users.map(user => {
            return <tr>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.age}</td>

            </tr>
          })}
        </tbody>
      </table>
    );
  }
}

// App component

function App() {
  return <div> <ul>
      <GetUser />
    <User />
    <Register />
    </ul>

  </div>
}

export default App;
