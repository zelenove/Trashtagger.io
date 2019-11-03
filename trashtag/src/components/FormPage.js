import React from 'react';
import { Link } from "react-router-dom";

class FormPage extends React.Component {
    render() {
        const form = this.props.form;

        return (
            // Load rest of elements here and insert the form somewhere
            <div className="form-page-container">
                <div className="user-form-container border-gray">
                    {form}
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
            password: "",
        }
    }

    render() {
        const emailEmpty = checkNotEmpty.bind(this)("email")
        const passwordEmpty = checkNotEmpty.bind(this)("password")

        const form = (
            <div>
                <h2 className="user-form-header">Sign In</h2>
                <form id="sign-in" className="user-form"
                    onSubmit={this.props.userLogIn}>
                    <div className="form-input">
                        <input className={`form-field ${emailEmpty}`}
                            type="text"
                            name="email"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.email} />
                        <label>Email</label>
                    </div>
                    <div className="form-input">
                        <input className={`form-field ${passwordEmpty}`}
                            type="text"
                            name="password"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.password} />
                        <label>Password</label>
                    </div>
                    <Link to="reset-password">
                        <div className="user-form-subtext">
                            Forgot your password?
                        </div>
                    </Link>
                    <input type="submit"
                        className="form-submit button-border-g"
                        value="Sign In" />
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
            password: "", // Can add date of birth and other stuff later
        }
    }

    render() {
        const emailEmpty = checkNotEmpty.bind(this)("email")
        const passwordEmpty = checkNotEmpty.bind(this)("password")

        const form = (
            <div>
                <h2 className="user-form-header">Register</h2>
                <form id="register" className="user-form">
                    <div className="form-input">
                        <input className={`form-field ${emailEmpty}`}
                            type="text"
                            name="email"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.email} />
                        <label>Email</label>
                    </div>
                    <div className="form-input">
                        <input className={`form-field ${passwordEmpty}`}
                            type="text"
                            name="password"
                            onChange={onFormInputChange.bind(this)}
                            value={this.state.password} />
                        <label>Password</label>
                    </div>
                    <input type="submit"
                        className="form-submit button-border-g"
                        value="Register" />
                </form>
            </div>
        );

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

// To make the form labels work
function checkNotEmpty(name) {
    return this.state[name].length === 0 ? "" : "not-empty"
}

export {
    SignIn,
    Register
}
