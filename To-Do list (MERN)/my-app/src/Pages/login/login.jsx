import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import "./style.css";
import axios from "axios";
import { Redirect } from "react-router";
import Header from "../../component/header/header";
export default class login extends Component {
  constructor() {
    super();
    this.state = {
      usernameS: "",
      emailS: "",
      passwordS: "",
      usernameL: "",
      passwordL: "",
      redirect: false,
      userErrorL: "",
      userErrorS: "",
      passwordErrorL: "",
    };
    // this.
  }
  hchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitS = (event) => {
    this.setState({
      userErrorS: "",
      userErrorL: "",
      passwordErrorL: "",
    });
    event.preventDefault();
    const registered = {
      username: this.state.usernameS,
      email: this.state.emailS,
      password: this.state.passwordS,
    };
    axios.post("http://localhost:8000/users/signup", registered).then((res) => {
      if (res.data === "user already registered") {
        this.setState({
          userErrorS: "User already registered",
        });
      } else {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userId", res.data.user.id);

        this.setState({
          redirect: true,
        });
      }
    });
  };

  onSubmitL = (e) => {
    this.setState({
      userErrorS: "",
      userErrorL: "",
      passwordErrorL: "",
    });
    e.preventDefault();
    const user = {
      username: this.state.usernameL,
      password: this.state.passwordL,
    };
    axios.post("http://localhost:8000/users/Login", user).then((res) => {
      if (res.data === "user not found") {
        this.setState({
          userErrorL: "User not found",
        });
      } else if (res.data === "wrong password") {
        this.setState({
          passwordErrorL: "Wrong password",
        });
      } else {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userId", res.data.user.id);

        this.setState({
          redirect: true,
        });
      }
    });
  };
  // ---------------------------------------------
  responseSuccessGoogle = (res) => {
    console.log(res);
    console.log(res.tokenId);
    axios
      .post("http://localhost:8000/users/GoogleLogin", {
        tokenId: res.tokenId,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userId", res.data.user.id);
        this.setState({
          redirect: true,
        });
      });
  };
  responseFailureGoogle = (res) => {
    console.log(res);
  };
  // -----------------------------------------
  render() {
    if (this.state.redirect) {
      return <Redirect to="/todo" />;
    }
    return (
      <>
        <Header isLogin={false} />
        <div>
          <div className="container">
            <div className="form-div">
              <h2>Create An Account</h2>
              <form onSubmit={this.onSubmitS}>
                <input
                  name="usernameS"
                  type="text"
                  placeholder="Username"
                  onChange={this.hchange}
                  className={
                    this.state.userErrorS
                      ? "form-control form-group is-invalid"
                      : "form-control form-group"
                  }
                />
                <div
                  className={
                    this.state.userErrorS
                      ? "invalid-feedback error"
                      : "invalid-feedback"
                  }
                >
                  {this.state.userErrorS}
                </div>
                <input
                  name="emailS"
                  type="email"
                  placeholder="Email"
                  onChange={this.hchange}
                  className="form-control form-group"
                />
                <input
                  name="passwordS"
                  type="password"
                  placeholder="Password"
                  onChange={this.hchange}
                  className="form-control form-group"
                />
                <button type="submit" className="btn btn-info btn-block">
                  Sign Up
                </button>
              </form>
            </div>
            <div className="line"></div>
            {/* ---------------------------------- */}
            <div className="form-div">
              <h2>Already have an account just sign in</h2>
              <form onSubmit={this.onSubmitL}>
                <input
                  name="usernameL"
                  type="text"
                  placeholder="Username"
                  onChange={this.hchange}
                  className={
                    this.state.userErrorL
                      ? "form-control form-group is-invalid"
                      : "form-control form-group"
                  }
                />
                <div
                  className={
                    this.state.userErrorL
                      ? "invalid-feedback error"
                      : "invalid-feedback"
                  }
                >
                  {this.state.userErrorL}
                </div>
                <input
                  name="passwordL"
                  type="password"
                  placeholder="Password"
                  onChange={this.hchange}
                  className={
                    this.state.passwordErrorL
                      ? "form-control form-group is-invalid"
                      : "form-control form-group"
                  }
                />
                <div
                  className={
                    this.state.passwordErrorL
                      ? "invalid-feedback error"
                      : "invalid-feedback"
                  }
                >
                  {this.state.passwordErrorL}
                </div>

                <button type="submit" className="btn btn-info btn-block">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
        <GoogleLogin
          clientId="99398379882-rgd084aj9nvmn18uhio87pa6cq31jov2.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseSuccessGoogle}
          onFailure={this.responseFailureGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </>
    );
  }
}
