import React, { Component } from "react";
import { signUp, login } from "./auth";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextes/AuthContext";
import { Redirect } from "react-router";

function Element(props) {
  return (
    <div className={style.element}>
      <label htmlFor={props.name}>{props.name}: </label>
      <input
        className={style.inputText}
        type={props.name.startsWith("Password") ? "password" : "text"}
        name={props.name}
        id={props.name}
        placeholder={props.name}
        onChange={props.changehandler}
      />
    </div>
  );
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    if (this.props.type === "signup") {
      this.state = {
        buttonText: "Sign Up",
        redirectName: "Login",
        redirectLink: "/login",
        redirectMessage: "Already have an account? ",
        details: {
          Username: "",
          "E-mail": "",
          Password: "",
          "Password Confirmation": "",
        },
      };
    } else if (this.props.type === "login") {
      this.state = {
        buttonText: "Login",
        redirectName: "Sign Up",
        redirectLink: "/signup",
        redirectMessage: "don't have an account? ",
        details: {
          "E-mail": "",
          Password: "",
        },
      };
    }
    this.changehandler = this.changehandler.bind(this);
  }

  changehandler(e) {
    this.setState((state) => (state.details[e.target.name] = e.target.value));
  }

  toggleLoading() {
    this.setState((state) => (state.loading = !state.loading));
  }

  render() {
    let details = [];
    for (const [key] of Object.entries(this.state.details)) {
      details.push(
        <Element name={key} key={key} changehandler={this.changehandler} />
      );
    }

    return (
      <>
        {this.context.user ? (
          <Redirect to="/home" />
        ) : (
          <form
            onSubmit={this.props.submitHandler.bind(
              this,
              this.state.details,
              this.toggleLoading.bind(this)
            )}
            className={style.form}
          >
            <img
              src={`${process.env.PUBLIC_URL}/img/tweeter-small.svg`}
              alt="icon"
            />
            <h1 className={style.title}>{this.state.buttonText}</h1>
            <div className={style.details}>{details}</div>
            <div className={style.footer}>
              <button
                disabled={this.state.loading}
                onClick={this.clickHandler}
                type="submit"
                className={`${style.x} pr`}
              >
                {this.state.loading ? "Loading..." : this.state.buttonText}
              </button>
              <span className={style.muted}>
                {this.state.redirectMessage}
                <Link className={style.link} to={this.state.redirectLink}>
                  {this.state.redirectName}
                </Link>
              </span>
            </div>
          </form>
        )}
      </>
    );
  }
}
Form.contextType = AuthContext;

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(details, toggleLoading, e) {
    e.preventDefault();
    let errors = [];

    if (errors.length === 0) {
      signUp(
        details.Username,
        details["E-mail"],
        details["Password"],
        toggleLoading
      );
    }
  }
  render() {
    return <Form type="signup" submitHandler={this.submitHandler} />;
  }
}

export class Login extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(details, setState, e) {
    e.preventDefault();
    const errors = [];
    if (errors.length === 0) {
      login(details["E-mail"], details["Password"], this.context, setState);
    }
  }
  render() {
    return <Form type="login" submitHandler={this.submitHandler} />;
  }
}
Login.contextType = AuthContext;
