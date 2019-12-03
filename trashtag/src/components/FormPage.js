import React from 'react';
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class FormPage extends React.Component {
    render() {
        const form = this.props.form;

        return (
            // Load rest of elements here and insert the form somewhere
            <div className="form-page-container">
                <div className="user-form-container border-gray">
                    <div>
                        {this.props.errorMessage ?
                                <div className="user-form-error">
                                    {this.props.errorMessage}
                                </div> : ""}
                        {form}
                    </div>
                </div>
            </div>
        )
    }
}

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            userErrorMessage: ""
        }
    }

    signIn = (e) => {
        e.preventDefault()

        axios.post("/users/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then((user) => {
          this.props.loginCallback(user)
        })
        .catch((error) => {
          setErrorMessage.bind(this)(error)
        })
      }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/" />
        }

        const form = (
            <div>
                <h2 className="user-form-header">Sign In</h2>
                <form id="sign-in" className="user-form"
                    onSubmit={this.signIn.bind(this)}>
                    <div className="form-input">
                        <input className="form-field"
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.username} />
                    </div>
                    <div className="form-input">
                        <input className="form-field"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.password} />
                    </div>
                    <Link to="reset-password">
                        <div className="user-form-subtext">
                            Forgot your password?
                        </div>
                    </Link>
                    <input type="submit"
                        className="form-submit button-border-g"
                        value="Sign In"
                        />
                </form>
            </div>
        );

        return <FormPage form={form} errorMessage={this.state.userErrorMessage}
                    {...this.props} />;
    }
}

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            username: "",
            email: "",
            password: "",
            userErrorMessage: ""
        }
    }

    signUp = (e) => {
      e.preventDefault()

      axios.post("/users/register", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then((user) => {
        this.props.loginCallback(user)
      })
      .catch((error) => {
        setErrorMessage.bind(this)(error)
      })
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/" />
        }

        const form = (
            <div>
                <h2 className="user-form-header">Register</h2>
                <form id="register" className="user-form" onSubmit={this.signUp.bind(this)}>
                    <div className="form-input">
                        <input className="form-field"
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.username} />
                    </div>
                    <div className="form-input">
                        <input className="form-field"
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.email} />
                    </div>
                    <div className="form-input">
                        <input className="form-field"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.password} />
                    </div>
                    <input type="submit"
                        className="form-submit button-border-g"
                        value="Register"
                         />
                </form>
            </div>
        );

        return <FormPage form={form} errorMessage={this.state.userErrorMessage}
                    {...this.props} />;
    }
}

// To handle changes to form inputs
function onFormInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
        [name]: value
    })
}

function setErrorMessage(error) {
    // Server errors
    if (error.response && (error.response.status === 400
        || error.response.status === 404 || error.response.status === 401)) {
        // Log in errors, could display an alert for them
        this.setState({
            userErrorMessage: error.response.data
        })
    }
    else {
        this.setState({
            userErrorMessage: "There was an error logging in"
        })
    }
}

export {
    SignIn,
    Register
}