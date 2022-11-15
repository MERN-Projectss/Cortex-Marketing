import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <NavLink  className="header">
        <ul >
          <li>
        <Link to = "/">Home </Link>
        </li>
        <li>
        <Link to = "//regUser">Register </Link>
        </li>
        <li>
        <Link to = "/login">Login </Link>
        </li>
       
        <li>
        <Link to = "/createTask">Create Task </Link>
        </li>
        <li>
        <Link to = "/updateTask">Update Tasks </Link>
        </li>
        <li>
        <Link to = "/deleteATask">Delete a Task</Link>
        </li>
        <li>
        <Link to = "getAllTask">Get All Task</Link>
        </li>

         </ul>
      
      </NavLink>
    </div>
  )
}

export default Navbar