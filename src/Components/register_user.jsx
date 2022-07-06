import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import RegisterCss from "../Stylesheets/register.css";
import axios from "axios";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { matchRoutes, useParams } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      status: "",
      options: [
        { value: "Admin", label: "Admin" },
        { value: "Reviewer", label: "Reviewer" },
        { value: "Editor", label: "Editor" },
      ],
      selectedOption: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.navigateToUserDetails = this.navigateToUserDetails.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
      status: false,
      accountType: this.state.selectedOption,
    };
    console.log("User Data", user);
    axios
      .post("http://localhost:8080/user/create", user)
      .then((response) => {
        console.log("Data :", response);
        this.state.id = response.data.data._id;
        console.log("UserID :", this.state.id);
        alert("Completed");

        this.navigateToUserDetails(e);
      })
      .catch((error) => {
        console.log(error.message);
        alert("Please fill the required details");
      });
  }

  navigateToUserDetails(e) {
    window.location = `/all/userdetails`;
  }

  render() {
    return (
      <div style={{ paddingTop: "1rem" }}>
        <Row>
          <Col sm="1"></Col>
          <Col sm="5">
            <div className="imagebackground">
              <Player
                autoplay
                loop
                src="https://assets4.lottiefiles.com/packages/lf20_u8o7BL.json"
                style={{
                  height: "40rem",
                  width: "40rem",
                  paddingTop: "2rem",
                  paddingLeft: "2rem",
                }}
              >
                <Controls
                  visible={false}
                  buttons={["play", "repeat", "frame", "debug"]}
                />
              </Player>
            </div>
          </Col>
          <Col sm="5">
            <h3 className="register">New User Registration</h3>
            <form onSubmit={this.onSubmit}>
              <input
                type="email"
                className="inputfield"
                placeholder="Email"
                name="email"
                value={this.state.email}
                required
                onChange={this.onChange}
              ></input>
              <input
                className="inputfield"
                placeholder="New Password"
                name="password"
                value={this.state.password}
                required
                onChange={this.onChange}
              ></input>

              <row className="d-flex justify-content-center">
                <Col sm="1"></Col>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="Student"
                      checked={this.state.selectedOption === "Student"}
                      onChange={this.onValueChange}
                    />
                    Student
                  </label>
                </div>

                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      value="Admin"
                      checked={this.state.selectedOption === "Admin"}
                      onChange={this.onValueChange}
                    />
                    Admin
                  </label>
                </div>
                <Col sm="1"></Col>
              </row>
              <row className="d-flex justify-content-center">
                <Col sm="1"></Col>
                <button
                  type="submit"
                  className="registerButton"
                  //onClick={(e) => this.navigateToUserType(e, this.state.id)}
                >
                  Save
                </button>
              </row>
            </form>
          </Col>
          <Col sm="1"></Col>
        </Row>
      </div>
    );
  }
}

export default Register;
