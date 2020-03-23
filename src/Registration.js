import React from "react";
import axios from "./axioscopy";
import { Link } from "react-router-dom";

export class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        // console.log("handleChange running");
        // console.log("e.target.value: ", e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log("this.state: ", this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        let userDetails = this.state;
        axios
            .post("/welcome", userDetails)
            .then(resp => {
                console.log("resp.data: ", resp.data);
                if (resp.data.filledForms === false) {
                    console.log("error in filledForms");
                    this.setState({
                        errorForms: true
                    });
                } else if (resp.data.filledForms === true) {
                    this.setState({
                        errorForms: false
                    });
                } else if (resp.data.matchedPass === false) {
                    console.log("error in matchedPass");
                    this.setState({
                        errorPass: true
                    });
                } else if (resp.data.matchedPass === true) {
                    this.setState({
                        errorPass: false
                    });
                } else if (resp.data.hashedPass === false) {
                    this.setState({
                        errorHashedPass: true
                    });
                } else if (resp.data.hashedPass === true) {
                    this.setState({
                        errorHashedPass: false
                    });
                } else {
                    location.replace("/");
                }
            })
            .catch(function(err) {
                console.log("err in POST /welcome: ", err);
            });
    }

    render() {
        return (
            <div>
                <p id="introduction">
                    MusiCorona - the platform that allows you to hear and
                    perform live music without ever needing to leave your home
                </p>
                <p id="int2">
                    now more than ever we need some music in our lives, here is
                    the perferkt place to hear great musicians without ever
                    getting out from you pJs!
                </p>
                <h1 className="register">Register</h1>
                <form>
                    <input
                        onChange={this.handleChange}
                        name="first"
                        type="text"
                        placeholder="first name"
                    />
                    <input
                        onChange={this.handleChange}
                        name="last"
                        type="text"
                        placeholder="last name"
                    />
                    <input
                        onChange={this.handleChange}
                        name="email"
                        type="text"
                        placeholder="email"
                    />
                    <input
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <input
                        onChange={this.handleChange}
                        name="password2"
                        type="password"
                        placeholder="confirm password"
                    />
                    <button onClick={this.handleSubmit}>submit</button>
                    {this.state.errorForms && (
                        <p>please fill out all fileds before submiting </p>
                    )}

                    {this.state.errorPass && (
                        <p>please type in the same password twice</p>
                    )}
                    {this.state.errorHashedPass && (
                        <p>please type a password</p>
                    )}
                    <p>
                        Already registered? Log in &nbsp;
                        <Link id="linkLogin" to="/login">
                            here
                        </Link>
                    </p>
                </form>
            </div>
        );
    }
}
