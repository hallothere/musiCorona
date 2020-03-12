import React from "react";
import axios from "./axioscopy";
// import { Link } from "react-router-dom";
import { ProfilePic } from "./ProfilePic";
import { Uploader } from "./Uploader";
import { Profile } from "./Profile";
import { OtherProfile } from "./OtherProfile";
import { FindPeople } from "./FindPeople";
import { BrowserRouter, Route } from "react-router-dom";
// import { BioEditor } from "./BioEditor";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.clickHandler = this.clickHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                // console.log("data after get /user: ", data.details);
                this.setState({
                    first: data.details.first,
                    last: data.details.last,
                    bio: data.details.bio,
                    id: data.details.id,
                    url: data.details.url
                });
            })
            .then(() =>
                console.log(
                    "this.state after get /user: ",
                    this.state.first,
                    this.state.last,
                    this.state.bio
                )
            );
    }

    clickHandler() {
        this.setState({
            uploaderVisible: true
        });
    }

    handleChange(e) {
        console.log("handleChange is running");
        this.setState({ file: e.target.files[0] });
    }

    handleClose() {
        console.log("handleClose is running");
        this.setState({
            uploaderVisible: false
        });
    }

    handleClick(e) {
        e.preventDefault();
        console.log("handle click fn after submitting file is working");
        var formData = new FormData();
        formData.append("file", this.state.file);
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
            })
            .catch(function(err) {
                console.log("err in POST /upload: ", err);
            });
    }

    setBio(newBio) {
        this.setState({
            bio: newBio
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
                <div id="app">
                    <img id="logo" src="/logo.png" alt="logo" />
                    <ProfilePic
                        id={this.state.id}
                        first={this.state.first}
                        last={this.state.last}
                        url={this.state.url}
                        bio={this.state.bio}
                        clickHandler={this.clickHandler}
                        setBio={this.setBio}
                    />
                    <p>
                        {this.state.first} {this.state.last}
                    </p>
                </div>
                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    url={this.state.url}
                                    bio={this.state.bio}
                                    clickHandler={this.clickHandler}
                                    setBio={this.setBio}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/users"
                            render={props => (
                                <FindPeople
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>

                {this.state.uploaderVisible && (
                    <Uploader
                        first={this.state.first}
                        last={this.state.last}
                        url={this.state.url}
                        handleChange={this.handleChange}
                        handleClose={this.handleClose}
                        handleClick={this.handleClick}
                    />
                )}
            </div>
        );
    }
}

// <ProfilePic
//     first={this.state.first}
//     last={this.state.last}
//     url={this.state.url}
//     clickHandler={() =>
//         this.setState({
//             uploaderVisible: true
//         })
//     }
// />

// finishedUploading={newUrl =>
//     this.setState({
//         image: newUrl
//     })
// }

// <BrowserRouter>
//     <Route
//         exact path="/" render={
//             () => <Profile
//             first={this.state.first}
//             last={this.state.last}
//             url={this.state.url}
//             bio={this.state.bio}
//             clickHandler={this.clickHandler}
//             setBio={this.setBio}
//             />
//     <Route component={OtherProfile} path="/user/:id" />
// </BrowserRouter>

// <BrowserRouter>
//     <div>
//         <Route
//             exact
//             path="/"
//             render={() => (
//                 <Profile
//                     id={this.state.id}
//                     first={this.state.first}
//                     last={this.state.last}
//                     url={this.state.url}
//                     bio={this.state.bio}
//                     clickHandler={this.clickHandler}
//                     setBio={this.setBio}
//                 />
//             )}
//         />
//         <Route path="/user/:id" component={OtherProfile} />
//     </div>
// </BrowserRouter>
//
// <Link to="/user/5">Name of the person</a>
//old profile

// <Profile
//     first={this.state.first}
//     last={this.state.last}
//     url={this.state.url}
//     bio={this.state.bio}
//     clickHandler={this.clickHandler}
//     setBio={this.setBio}
// />

// {this.state.bio && (
//     <BioEditor
//         first={this.state.first}
//         last={this.state.last}
//         bio={this.state.bio}
//         setBio={this.setBio}
//     />
// )}
