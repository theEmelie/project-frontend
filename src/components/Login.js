import React, { Component } from 'react';

import '../styles/forms.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {}
        };
        this.fieldChange = this.fieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

        fieldChange(field, e) {
            let fields = this.state.fields;

            fields[field] = e.target.value;
            this.setState({
                fields
            });
        }

        handleLoginResponse(response) {
            // console.log(response);
            if (Object.prototype.hasOwnProperty.call(response, "data")) {
                sessionStorage.setItem('jwtToken', response.data.token);
                alert('Du har loggat in!');
                window.location.href="/";
            } else {
                alert('Fel inloggningsuppgifter');
            }
        }

    handleSubmit(e) {
        e.preventDefault();
        const url = "https://proj-api.emelieaslund.me/auth/login";

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.fields["email"],
                password: this.state.fields["pass"]
            }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(response => this.handleLoginResponse(response));
    }

    render() {
        return (
            <div className="Form1">
            <h2>Logga In</h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                E-post: <br/>
                <input name="email" className={this.state.emailValid} type="email"
                    value={this.state.email} onChange={this.fieldChange.bind(this, "email") } />
                </label><br/>

                <label>
                Lösenord: <br/>
                <input name="pass"className={this.state.passValid} type="password"
                    value={this.state.pass} onChange={this.fieldChange.bind(this, "pass")} />
                </label><br/>
                <br/>

                <input type="submit" className="input-submit" value="Logga In" />
            </form>
            </div>
        );
    }
}

export default Login;
