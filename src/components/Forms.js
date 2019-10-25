import React, { Component } from 'react';
import Select from 'react-select';

import '../styles/forms.css';

// Years for calender
var startYear = 2019;
var numYears = 110;
var yearArr = [];

for (var i = 0; i < numYears; i++) {
    var year = startYear - i;
    var yearObj = {value: year, label: year.toString()};

    yearArr.push(yearObj);
}

// Days for calender
var startDay = 1;
var numDays = 31;
var dayArr = [];

for (i = 0; i < numDays; i++) {
    var days = startDay + i;
    var dayObj = {value: days, label: days.toString()};

    dayArr.push(dayObj);
}

// Months for calender
let month = [
    { value: 1, label: 'Januari'},
    { value: 2, label: 'Februari'},
    { value: 3, label: 'Mars'},
    { value: 4, label: 'April'},
    { value: 5, label: 'Maj'},
    { value: 6, label: 'Juni'},
    { value: 7, label: 'Juli'},
    { value: 8, label: 'Augusti'},
    { value: 9, label: 'September'},
    { value: 10, label: 'Oktober'},
    { value: 11, label: 'November'},
    { value: 12, label: 'December'},
];

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {}
        };

    this.yearChange = this.yearChange.bind(this);
    this.monthChange = this.monthChange.bind(this);
    this.dayChange = this.dayChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Requirements for a valid email
    validateEmail(email) {
        /* eslint-disable */
        var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        /* eslint-enable */
        return regEmail.test(String(email).toLowerCase());
    }

    // Requirements for a valid name
    validateName(name) {
        var regName = /^[a-zA-ZåäöÅÄÖ '!]+$/;

        return regName.test(String(name).toLowerCase());
    }

    // Requirements for a valid password
    validatePass(pass) {
        return pass.length >= 6;
    }

    handleChange(field, e) {
        let fields = this.state.fields;

        fields[field] = e.target.value;
        this.setState({
            fields
        });
    }

    fieldChange(field, e) {
        let fields = this.state.fields;

        fields[field] = e.target.value;
        this.setState({
            fields
        });
    }

    fieldDateChange(field, e) {
        let fields = this.state.fields;

        fields[field] = e.value;
        this.setState({
            fields
        });
    }

    yearChange(field, e) {
        this.fieldDateChange(field, e);
        this.checkDate(this.state.fields["year"],
            this.state.fields["month"], this.state.fields["day"]);
    }

    monthChange(field, e) {
        this.fieldDateChange(field, e);
        this.checkDate(this.state.fields["year"],
            this.state.fields["month"], this.state.fields["day"]);
    }

    dayChange(field, e) {
        this.fieldDateChange(field, e);
        this.checkDate(this.state.fields["year"],
            this.state.fields["month"], this.state.fields["day"]);
    }

    // Check if date is valid
    checkDate(y, m, d) {
        let errors = this.state.errors;
        let presumedDate = new Date(y, m-1, d);

        if (presumedDate.getDate() !== d) {
            let dateValid = "dateInvalid";

            this.setState({
                dateValid
            });
            errors["dateError"] = "Invalid date";
            this.setState({
                errors
            });
        } else {
            let dateValid = "dateValid";

            this.setState({
                dateValid
            });
            errors["dateError"] = "";
            this.setState({
                errors
            });
        }
    }

    // Check if email is valid
    emailChange(field, e) {
        let errors = this.state.errors;

        this.fieldChange(field, e);
        let validEmail = this.validateEmail(e.target.value);

        if (validEmail) {
            let emailValid = "emailValid";

            this.setState({
                emailValid
            });
            errors["emailError"] = "";
            this.setState({
                errors
            });
        } else {
            let emailValid = "emailInvalid";

            this.setState({
                emailValid
            });
            errors["emailError"] = "Ogiltig Epost";
            this.setState({
                errors
            });
        }
    }

    // Check if name is valid
    nameChange(field, e) {
        let errors = this.state.errors;

        this.fieldChange(field, e);
        let validName = this.validateName(e.target.value);

        if (validName) {
            let nameValid = "nameValid";

            this.setState({
                nameValid
            });
            errors["nameError"] = "";
            this.setState({
                errors
            });
        } else {
            let nameValid = "nameInvalid";

            this.setState({
                nameValid
            });
            errors["nameError"] = "Ogiltigt Namn";
            this.setState({
                errors
            });
        }
    }

    // Check if password is valid
    passChange(field, e) {
        let errors = this.state.errors;

        this.fieldChange(field, e);
        let validField = this.validatePass(e.target.value);

        if (validField) {
            let passValid = "passValid";

            this.setState({
                passValid
            });
            errors["passError"] = "";
            this.setState({
                errors
            });
        } else {
            let passValid = "passInvalid";

            this.setState({
                passValid
            });
            errors["passError"] = "Ogiltigt Lösenord";
            this.setState({
                errors
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.checkDate(this.state.fields["year"],
            this.state.fields["month"], this.state.fields["day"]);
        if (this.state.errors["dateError"]) {
            alert('Du måste ange ett giltigt födelsedatum');
        } else if (this.state.errors["passError"]) {
            alert('Lösenordet måste vara minst 6 karaktärer');
        } else if (this.state.errors["emailError"]) {
            alert('Du måste ange en giltigt Epost');
        } else if (this.state.errors["nameError"]) {
            alert('Du måste ange ett giltigt namn');
        } else {
            const url = "https://proj-api.emelieaslund.me/auth/register";
            const dob = this.state.fields["year"].toString() + "-" +
                this.state.fields["month"].toString() + "-" + this.state.fields["day"].toString();

            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.fields["name"],
                    email: this.state.fields["email"],
                    password: this.state.fields["pass"],
                    birthdate: dob }),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json());
            alert('Du har registrerat en användare!');
            window.location.href="/login";
        }
    }

    render() {
        return (
            <div className="Form1">
            <h2>Registrera en ny Användare</h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                Namn: <br/>
                <input name="names" className={this.state.nameValid} type="text"
                    value={this.state.name} onChange={this.nameChange.bind(this, "name")} />
                </label><br/>

                <label>
                E-post: <br/>
                <input name="email" className={this.state.emailValid} type="email"
                    value={this.state.email} onChange={this.emailChange.bind(this, "email")} />
                </label><br/>

                <label>
                Lösenord (minst 6 karaktärer): <br/>
                <input name="pass" className={this.state.passValid} type="password"
                    value={this.state.pass} onChange={this.passChange.bind(this, "pass")} />
                </label><br/>

                <label>
                Födelsedatum: <br/>
                </label>

                <div className="selectOption">
                <Select className={this.state.dateValid} options ={yearArr} placeholder="År"
                    onChange={this.yearChange.bind(this, "year")} />
                </div>

                <div className="selectOption1">
                <Select className={this.state.dateValid} options ={month} placeholder="Månad"
                    onChange={this.monthChange.bind(this, "month")} />
                </div>

                <div className="selectOption2">
                <Select className={this.state.dateValid} options ={dayArr} placeholder="Dag"
                    onChange={this.dayChange.bind(this, "day")} />
                </div>
                <br/>

                <label>
                <a href={"https://www.vpnmentor.com/wp-content/" +
                    "uploads/2016/06/vpnMentor-free-privacy-policy.pdf"}
                    className="accept">{"Jag godkänner användarvillkoren"}</a>
                <input name="check" className="input-field-check" type="checkbox"
                    value={this.state.check} onChange={this.handleChange.bind(this, "check")}
                    required />
                </label><br/>

                <input type="submit" className="input-submit" value="Registrera" />
            </form>
            </div>
        );
    }
}

export default Forms;
