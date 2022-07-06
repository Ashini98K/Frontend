import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import RegisterCss from "../Stylesheets/register.css";
import axios from "axios";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { matchRoutes, useParams } from "react-router-dom";

class userInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      fullName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      status: "",
      dateOfBirth: "",
      accountType: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.navigateToLogin = this.navigateToLogin.bind(this);
    // this.state = initialState;
  }

  componentDidMount() {
    // this.state.id = this.props.match.params.id;
    // console.log("User ID :", this.props.match.params.id);
    const path = window.location.pathname.split("/");
    const id = path[path.length - 1];

    axios.get(`http://localhost:8080/user/get/id/${id}`).then((response) => {
      this.setState({
        id: id,
        email: response.data.data.email,
        password: response.data.data.password,
        status: response.data.data.status,
        accountType: response.data.data.accountType,
      });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let user = {
      fullName: this.state.fullName,
      lastName: this.state.lastName,
      dateOfBirth: this.state.dateOfBirth,
      mobile: this.state.mobile,
      status: true,
      password: this.state.password,
    };
    console.log("User Data", user);
    axios
      .put(`http://localhost:8080/user/update/${this.state.id}`, user)
      .then((response) => {
        console.log("Data :", response);
        this.state.id = response.data.data._id;
        console.log("UserID :", this.state.id);
        alert("Completed");

        this.navigateToLogin(e);
      })
      .catch((error) => {
        console.log(error.message);
        alert("Please fill the required details");
      });
  }

  navigateToLogin(e) {
    window.location = `/`;
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
            <h3 className="register">Fill your Details</h3>
            <h6 className="instructions">
              Please fill the following form and go through the guided process
            </h6>
            <form onSubmit={this.onSubmit}>
              <input
                className="inputfield"
                placeholder="Full Name"
                name="fullName"
                value={this.state.fullName}
                required
                onChange={this.onChange}
              ></input>
              <input
                className="inputfield"
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                required
                onChange={this.onChange}
              ></input>
              <input
                className="inputfield"
                placeholder="Date Of Birth"
                type="date"
                id="date"
                name="dateOfBirth"
                value={this.state.dateOfBirth}
                onChange={this.onChange}
              ></input>
              <input
                type="email"
                className="inputfield"
                placeholder="Email"
                name="email"
                value={this.state.email}
                required
                onChange={this.onChange}
                disabled
              ></input>
              <input
                type="number"
                className="inputfield"
                placeholder="Mobile Number"
                name="mobile"
                value={this.state.mobile}
                required
                onChange={this.onChange}
              ></input>
              <input
                className="inputfield"
                placeholder="New Password"
                name="password"
                // value={this.state.password}
                required
                onChange={this.onChange}
              ></input>
              <input
                className="inputfield"
                placeholder="Account Type"
                name="accountType"
                value={this.state.accountType}
                required
                onChange={this.onChange}
                disabled
              ></input>

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
        </Row>
      </div>
    );
  }
}

export default userInformation;
