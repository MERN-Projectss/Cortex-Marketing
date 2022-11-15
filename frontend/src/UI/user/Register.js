import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

//import './Signup.css';

import axios from 'axios';

export default class Register extends Component {

  componentDidMount() {

    window.scrollTo(0, 0)

  }

  constructor(props) {

    super(props);

    this.state = {

      email: '',

      name: '',

      mobile: '',

      password: '',

      errors: {}

    }

    this.handleChangeName = this.handleChangeName.bind(this);

    this.handleChangeMobile = this.handleChangeMobile.bind(this);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);

    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

  }

  handleChangeName(e) {

    this.setState({ name: e.target.value });

  }

  handleChangeEmail(e) {

    this.setState({ email: e.target.value });

  }

  handleChangeMobile(e) {

    this.setState({ mobile: e.target.value });

  }

  handleChangePassword(e) {

    this.setState({ password: e.target.value });

  }

  submituserRegistrationForm(e) {

    e.preventDefault();

    if (this.validateForm()) {

      console.log(this.state);

      var apiBaseUrl = "http://localhost:3000";

      var data = {

        "name": this.state.name,

        "user_email": this.state.email,

        "mobile_number": this.state.mobile,

        "password": this.state.password

      }

      var headers = {

        'Content-Type': 'application/json',

      }

      console.log(data);

      axios.post(apiBaseUrl + 'createUsers', data, { headers: headers }).then(function (response) {

        console.log(response);

        if (response.data.success) {

          localStorage.setItem("u_code", encodeURIComponent(JSON.stringify(response.data.data)));

          localStorage.setItem('is_done', true);

          window.location.href = "/";

          console.log("Login successfull");

        } else {

          alert(response.data.message);

        }

      }).catch(function (error) {

        console.log(error);

      });

    }

  }

  validateForm() {

    let errors = {};

    let formIsValid = true;

    if (!this.state.name) {

      formIsValid = false;

      errors["username"] = "*Please enter your username.";

    }

    if (typeof this.state.name !== "undefined") {

      if (!this.state.name.match(/^[a-zA-Z ]*$/)) {

        formIsValid = false;

        errors["username"] = "*Please enter alphabet characters only.";

      }

    }

    if (!this.state.email) {

      formIsValid = false;

      errors["email"] = "*Please enter your email-ID.";

    }

    if (typeof this.state.email !== "undefined") {

      //regular expression for email validation

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

      if (!pattern.test(this.state.email)) {

        formIsValid = false;

        errors["email"] = "*Please enter valid email-ID.";

      }

    }

    if (!this.state.mobile) {

      formIsValid = false;

      errors["mobileno"] = "*Please enter your mobile no.";

    }

    if (typeof this.state.mobile !== "undefined") {

      if (!this.state.mobile.match(/^[0-9]{10}$/)) {

        formIsValid = false;

        errors["mobileno"] = "*Please enter valid mobile no.";

      }

    }

    if (!this.state.password) {

      formIsValid = false;

      errors["password"] = "*Please enter your password.";

    }

    if (typeof this.state.password !== "undefined") {

      if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {

        formIsValid = false;

        errors["password"] = "*Please enter secure and strong password.";

      }

    }

    this.setState({

      errors: errors

    });

    return formIsValid;

  }

  render() {

    return (

      <div>

        <div className="container">

          <div className="row">

            <div className="col-md-4 login-sec">

              <h2 className="text-center">Signup Codesolution</h2>

              <Form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>

                <FormGroup>

                  <Label for="exampleName">Name</Label>

                  <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChangeName} placeholder="Enter a name" />

                  <div className="errorMsg">{this.state.errors.name}</div>

                </FormGroup>

                <FormGroup>

                  <Label for="exampleMobile">Mobile No.</Label>

                  <Input type="text" name="mobile" id="exampleMobile" value={this.state.mobile} onChange={this.handleChangeEmail} placeholder="Enter a Mobile No." />

                  <div className="errorMsg">{this.state.errors.mobileno}</div>

                </FormGroup>

                <FormGroup>

                  <Label for="exampleEmail">Email</Label>

                  <Input type="email" name="email" id="exampleEmail" value={this.state.email} onChange={this.handleChangeMobile} placeholder="Enter a email" />

                  <div className="errorMsg">{this.state.errors.emailid}</div>

                </FormGroup>

                <FormGroup>

                  <Label for="examplePassword">Password</Label>

                  <Input type="password" name="password" id="examplePassword" value={this.state.password} onChange={this.handleChangePassword} placeholder="Enter a password" />

                  <div className="errorMsg">{this.state.errors.password}</div>

                </FormGroup>

                <div className="d-flex justify-content-center mt-3 login_container">

                  <Button type="submit" className="btn btn-login">Submit</Button>

                </div>

                <div className="mt-4">

                  <div className="d-flex justify-content-center links">

                    <Link href="/login" to="/login" className="linka">Already Account Login </Link>

                  </div>

                </div>

              </Form>

            </div>

            <div className="col-md-8 banner-sec"></div>

          </div>

        </div>

      </div>

    )

  }

}