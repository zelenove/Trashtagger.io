import React from 'react';

class FormPage extends React.Component {
    render() {
        const form = this.props.form;

        return (
            // Load rest of elements here and insert the form somewhere
            <div className = "page">
                {form}
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
        const form = (
            <form id="sign-in" className = "user-form">
                <div className="form-input">
                    <input className="form-field" type="text"
                        name="email"
                        onChange={onFormInputChange.bind(this)}
                        onBlur={checkNotEmpty}/>
                    <label>Email</label>
                </div>
                <div className="form-input">
                    <input className="form-field" type="text"
                        name="password"
                        onChange={onFormInputChange.bind(this)}
                        onBlur={checkNotEmpty}/>
                    <label>Password</label>
                </div>
                <input className="form-submit" type="submit" value="Sign In"/>
            </form>
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
        const form = (
            <form id="register" className = "user-form">
                <div className="form-input">
                    <input className="form-field" type="text"
                        name="email"
                        onChange={onFormInputChange.bind(this)}
                        onBlur={checkNotEmpty}/>
                    <label>Email</label>
                </div>
                <div className="form-input">
                    <input className="form-field" type="text"
                        name="password"
                        onChange={onFormInputChange.bind(this)}
                        onBlur={checkNotEmpty}/>
                    <label>Password</label>
                </div>
                <input className="form-submit button-transparent button-border-white" type="submit" value="Register"/>
            </form>
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
function checkNotEmpty(event) {
    const element = event.target;
    if(element.value) {
        element.classList.add("not-empty");
    }
    else {
        element.classList.remove("not-empty");
    }
}

export {
    SignIn,
    Register
}