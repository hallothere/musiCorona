import React from "react";
import axios from "axios";

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
        this.setState(
            {
                [e.target.name]: e.target.value
            }
            // () => console.log("this.state: ", this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        // console.log("handleSubmit running, this.state: ", this.state);
        let userDetails = this.state;
        axios
            .post("/welcome", userDetails)
            .then(resp => {
                console.log("resp.data: ", resp.data);
                if (resp.data.filledForms === false) {
                    console.log("error in filledForms");
                } else if (resp.data.matchedPass === false) {
                    console.log("error in matchedPass");
                } else {
                    location.replace("/");
                }
            })
            .catch(function(err) {
                // this.setState({
                //
                // })
                console.log("err in POST /welcome: ", err);
            });
    }

    render() {
        return (
            <div>
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
                </form>
            </div>
        );
    }
}
