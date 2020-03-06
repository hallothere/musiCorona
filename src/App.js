import React from "react";
import axios from "./axioscopy";
// import { Link } from "react-router-dom";
import { ProfilePic } from "./ProfilePic";
import { Uploader } from "./Uploader";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data.details);
            console.log("this.state after get /user: ", this.state);
        });
    }

    render() {
        if (!this.state.id) {
            return (
                <img
                    src="https://giphy.com/gifs/uFymrKF1jQZ9K/html5"
                    alt="loading"
                />
            );
        }
        return (
            <div>
                <img id="logo" src="/logo.png" alt="logo" />
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    url={this.state.url}
                    clickHandler={() =>
                        this.setState({
                            uploaderVisible: true
                        })
                    }
                />
                {this.state.uploaderVisible && (
                    <Uploader
                        first={this.state.first}
                        last={this.state.last}
                        url={this.state.url}
                        handleChange={e => {
                            console.log("handleChange is running");
                            this.file = e.target.files[0];
                        }}
                        handleClose={() => {
                            console.log("handleClose is running");
                            this.setState({
                                uploaderVisible: false
                            });
                        }}
                        handleClick={e => {
                            e.preventDefault();
                            console.log(
                                "handle click fn after submitting file is working"
                            );
                            var formData = new FormData();
                            formData.append("file", this.file);
                            // formData.append("id", this.id);
                            axios
                                .post("/upload", formData)
                                .then(resp => {
                                    console.log(
                                        "resp after post /upload; ",
                                        resp.data.result.rows[0].url
                                    );
                                    this.setState({
                                        url: resp.data.result.rows[0].url
                                    });
                                    // console.log(
                                    //     "this.state after uploading: ",
                                    //     this.state
                                    // );
                                })
                                .catch(function(err) {
                                    console.log("err in POST /upload: ", err);
                                });
                        }}
                        finishedUploading={newUrl =>
                            this.setState({
                                image: newUrl
                            })
                        }
                    />
                )}
            </div>
        );
    }
}
