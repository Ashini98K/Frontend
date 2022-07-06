import React, { Component } from "react";
import { Button, Col, Row } from "reactstrap";
import axios from "axios";
import LoginCss from "../Stylesheets/login.css";
import { Mail } from "react-feather";
import login from "../Components/actions/auth";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.navigateResearcher = this.navigateResearcher.bind(this);
    this.navigateAllUserDetails = this.navigateAllUserDetails.bind(this);
    this.navigateToUserInformation = this.navigateToUserInformation.bind(this);
    this.state = {
      id: "",
      email: "",
      password: "",
    };
  }
  //
  // componentDidMount(){
  //     axios.get('http://localhost:5000)
  // }

  onSubmit(e) {
    e.preventDefault();
    let loginForm = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(loginForm);

    axios
      .post("http://localhost:8080/login/user", loginForm)
      .then((response) => {
        alert("Login Successful");
        console.log(response.data);
        let data = response.data;
        console.log(data);

        localStorage.setItem("Login message", response.data.message);
        localStorage.setItem("UserToken", response.data.token);

        let userType = response.data.result.accountType;
        let status = response.data.result.status;

        if (status == false) {
          console.log(status);
          this.setState = {
            id: response.data.result._id,
          };
          this.navigateToUserInformation(e, response.data.result._id);
          localStorage.setItem("Login message", response.data.message);
          localStorage.setItem("UserToken", response.data.token);
        } else if (userType == "Student") {
          console.log(userType);
          //   this.navigateAttendee(e);
          //   localStorage.setItem("Login message", response.data.message);
          //   localStorage.setItem("UserToken", response.data.token);
        } else if (userType == "Admin") {
          console.log(userType);
          this.navigateAllUserDetails(e);
          localStorage.setItem("Login message", response.data.message);
          localStorage.setItem("UserToken", response.data.token);
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert("Invalid Login. Please retry again");
      });
  }

  //   navigateResearcher(e) {
  //     window.location = "/sample";
  //   }

  navigateAllUserDetails(e) {
    window.location = "/all/userdetails";
  }

  navigateToUserInformation(e, id) {
    window.location = `/user/information/${id}`;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div style={{ paddingTop: "1rem" }}>
        <Row>
          <Col sm="1"></Col>
          <Col sm="5">
            {/* <h1 className="topic">ICAF</h1>
                <h3 className="subTopic">
                  International Conference on Application Frameworks
                </h3> */}

            <div>
              <Player
                autoplay
                loop
                src="https://assets4.lottiefiles.com/packages/lf20_jcikwtux.json"
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
          <Col sm="4">
            <h3 className="login">Login</h3>
            <h3 className="instructions">
              Please enter Email and Password to login
            </h3>
            <form onSubmit={this.onSubmit}>
              {/*<AiOutlineMail/>*/}
              {/*<Mail size={25} className='mailIcon'/>*/}
              <input
                className="input_field"
                placeholder="Enter Email here"
                name="email"
                id="email"
                value={this.state.email}
                onChange={this.onChange}
              ></input>
              {/*<Mail size={25}/>*/}
              <input
                className="input_field"
                placeholder="Enter Password here"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.onChange}
                type="password"
              ></input>

              <row className="d-flex justify-content-center">
                <Col sm="5"></Col>
                <button className="loginbutton">
                  <span className="btnTxt">LOGIN</span>
                </button>
              </row>
            </form>
          </Col>
          <Col sm="2"></Col>
        </Row>
      </div>
    );
  }
}

export default Login;
