import { useState } from 'react';

import './Register.css';

const Regiter = () => {

  // States for registration
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };

  const handleMobileNumber = (e) => {
    setMobileNumber(e.target.value);
    setSubmitted(false);
  };
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (firstName === '' || lastName === '' || mobileNumber === '' || email === '' || password === '' || age === '')
        setError(true)

      let res = await fetch("regUser", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          mobileNumber,
          email,
          password,
          age

        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setFirstName("")
        setLastName("")
        setMobileNumber("")
        setEmail("")
        setPassword("")
        setAge("")

        successMessage("User created successfully");
        setSubmitted(true);
        console.log(resJson)
        setError(false);
      } else {
        successMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }

  }

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h2>User {firstName + " " + lastName} registered  successfully !!</h2>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h3>User Registration Form</h3>
      </div>


      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        <ul>
          <label className="label">First Name </label>
          <input onChange={handleFirstName} className="input"
            value={firstName} type="text" />
        </ul><ul>
          <label className="label">Last Name</label>
          <input onChange={handleLastName} className="input"
            value={lastName} type="text" />
        </ul><ul>
          <label className="label">Mobile Number</label>
          <input onChange={handleMobileNumber} className="input"
            value={mobileNumber} type="text" />
        </ul><ul>
          <label className="label">Email</label>
          <input onChange={handleEmail} className="input"
            value={email} type="email" />
        </ul><ul>
          <label className="label">Password</label>
          <input onChange={handlePassword} className="input"
            value={password} type="password" />
        </ul><ul>
          <label className="label">Age</label>
          <input onChange={handleAge} className="input"
            value={age} type="text" />
        </ul>
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Regiter