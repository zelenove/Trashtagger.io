import React from 'react';
import { Link, Redirect } from "react-router-dom";

class FormPage extends React.Component {
    render() {
        const form = this.props.form;

        return (
            // Load rest of elements here and insert the form somewhere
            <div className="form-page-container">
                <div className="user-form-container border-gray">
                    <div>
                        {this.props.userErrorMessage ?
                                <div className="user-form-error">
                                    {this.props.userErrorMessage}
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
            email: "",
            password: ""
        }
    }

    signIn = (e) => {
      e.preventDefault();
      this.props.signInCallback(this.state.email, this.state.password)
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
                            name="email"
                            placeholder="Email"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.email} />
                    </div>
                    <div className="form-input">
                        <input className="form-field"
                            type="text"
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

        return <FormPage form={form} />;
    }
}

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: ""
        }
    }

    signUp = (e) => {
      e.preventDefault()
      this.props.signUpCallback(this.state.email, this.state.password)
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
                            name="email"
                            placeholder="Email"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.email} />
                    </div>
                    <div className="form-input">
                        <input className="form-field"
                            type="text"
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
        if(this.state.signedUp){
          return <Redirect to="/sign-in" />
        }
        return <FormPage form={form} />;
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

export {
    SignIn,
    Register
}
