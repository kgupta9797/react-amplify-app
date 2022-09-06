import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import "./common.css"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
class Login extends Component {

  constructor(props) {
    super(props);
    
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e) {//handle login start
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(//calling login method(username,password)
        () => {
          this.props.history.push("/home");
          window.location.reload();
        },
        error => { //ask to pratik
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else { //ask to pratik
      this.setState({
        loading: false
      });
    }
  } //handle login end
  render() {
    return (
      
        <div className="loginForm">
         
          <Form
            onSubmit={this.handleLogin} //longin->onsubmit->handleLogin
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label id="email" htmlFor="emailId">EmailID</label>
              <Input
                id="t1"
                type="text"
                className="form-control"
                name="emailID"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label id="email" htmlFor="password">Password</label>
              <Input
              id="t2"
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <button id="b1"
                className="btn btn-primary btn-block  me-md-2"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />

               <p id="forget"className="forgot-password text-right">
                    <a href="/forgotPass">Forgot password?</a>  <p>OR</p>
                </p>
                <p id="forget"className="SignUp text-right">
                    New ?<a href="/signUp"><strong>SignUp</strong></a>
                </p>
          </Form>
        </div>
      
    );
  }
}

export default withRouter(Login)