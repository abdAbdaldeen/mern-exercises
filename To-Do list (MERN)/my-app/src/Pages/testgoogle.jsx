import GoogleLogin from "react-google-login";
import React from "react";
import axios from "axios";
import { Component } from "react";
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  responseSuccessGoogle = (res) => {
    console.log(res);
    console.log(res.tokenId);
    axios.post("http://localhost:8000/users/GoogleLogin", {
      tokenId: res.tokenId,
    });
  };
  responseFailureGoogle = (res) => {
    console.log(res);
  };

  render() {
    return (
      <GoogleLogin
        clientId="99398379882-rgd084aj9nvmn18uhio87pa6cq31jov2.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseSuccessGoogle}
        onFailure={this.responseFailureGoogle}
        cookiePolicy={"single_host_origin"}
      />
    );
  }
}

export default Test;
