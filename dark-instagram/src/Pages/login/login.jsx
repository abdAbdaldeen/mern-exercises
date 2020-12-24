import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import "./style.css";
import axios from "axios";
import { Redirect } from "react-router";
export default class login extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    // this.
  }

  // ---------------------------------------------
  responseSuccessGoogle = (res) => {
    console.log(res);
    console.log(res.tokenId);
    axios
      .post("http://localhost:8000/users/GoogleLogin", {
        tokenId: res.tokenId,
      })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("imgUrl", res.data.imgUrl);
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("name", res.data.name);
        sessionStorage.setItem("userID", res.data._id);
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
      return <Redirect to="/home" />;
    }
    return (
      <>
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
