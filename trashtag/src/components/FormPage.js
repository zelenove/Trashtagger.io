import React from 'react';

class FormPage extends React.Component {
    render() {
        const {form} = this.props.form;

        return (
            // Load rest of elements here and insert the form somewhere
            <div>
                {form}
            </div>
        )
    }
}

class SignIn extends React.Component {
    render() {
        const form = <div>Sign In Form</div>; // Create the form here
        return (
            <FormPage form={form} />
        )
    }
}

class Register extends React.Component {
    render() {
        const form = <div>Register Form</div>; // Create the form here

        return (
            <FormPage form={form} />
        )
    }
}

export {
    SignIn,
    Register
}