import React from "react";
import axios from "./axioscopy";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonAdd: true,
            textareaAndEdit: true
        };
        this.showArea = this.showArea.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveBio = this.saveBio.bind(this);
    }
    // componentDidMount() {
    //     axios.get("/user").then(({ data }) => {
    //         this.setState(data.details);
    //         console.log("this.state after get /user: ", this.state);
    //     });
    // }
    showArea() {
        this.setState({
            textAreaAppear: true,
            buttonAdd: false
        });
    }

    handleChange(e) {
        console.log("handleChange is running");
        this.setState({ bio: e.target.value });
        console.log("this.state.bio: ", this.state.bio);
    }

    saveBio() {
        // const newBio = this.state.bio;
        axios.post("/bio", this.state).then(resp => {
            console.log("resp after post /bio; ", resp.data);
            this.setState(resp.data);
        });
    }

    render() {
        return (
            <div>
                {this.props.bio && (
                    <div>
                        <div className="textareaIfBioExists">
                            {this.state.textareaAndEdit && (
                                <div>
                                    <textarea
                                        defaultValue={this.props.bio}
                                    ></textarea>
                                    <button
                                        onClick={() => {
                                            this.showArea();
                                            this.setState({
                                                textareaAndEdit: false
                                            });
                                            this.setState({
                                                bioExist: false
                                            });
                                        }}
                                        id="addBio"
                                    >
                                        edit
                                    </button>
                                </div>
                            )}

                            {this.state.textAreaAppear && (
                                <div>
                                    <h1>Hello {this.props.first}</h1>
                                    <textarea
                                        onChange={this.handleChange}
                                        id="textarea"
                                        value={this.props.bio}
                                    ></textarea>
                                    <button
                                        onClick={() => {
                                            this.saveBio();
                                            this.props.setBio(
                                                this.state.newBio
                                            );
                                            this.setState({ bioExist: true });
                                        }}
                                    >
                                        save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {!this.props.bio && (
                    <div className="bio">
                        {this.state.buttonAdd && (
                            <button onClick={this.showArea} id="addBio">
                                Add bio
                            </button>
                        )}
                        {this.state.textAreaAppear && (
                            <div>
                                <h1>Hello {this.props.first}</h1>
                                <textarea
                                    onChange={this.handleChange}
                                    id="textarea"
                                ></textarea>
                                <button
                                    onClick={() => {
                                        this.saveBio();
                                        this.props.setBio(this.state.newBio);
                                        this.setState({ bioExist: true });
                                        this.setState({
                                            textAreaAppear: false
                                        });
                                    }}
                                >
                                    save
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

// <textarea id="textarea"></textarea>

// first={this.state.first}
// last={this.state.last}
// handleChange={e => {
//     console.log("handleChange is running");
//     this.file = e.target.files[0];
// }}
// handleClose={() => {
//     console.log("handleClose is running");
//     this.setState({
//         uploaderVisible: false
//     });
// }}
// handleClick={e => {
//     e.preventDefault();
//     console.log(
//         "handle click fn after submitting file is working"
//     );
//     var formData = new FormData();
//     formData.append("file", this.file);
//     // formData.append("id", this.id);
//     axios
//         .post("/upload", formData)
//         .then(resp => {
//             console.log(
//                 "resp after post /upload; ",
//                 resp.data.result.rows[0].url
//             );
//             this.setState({
//                 url: resp.data.result.rows[0].url
//             });
//             // console.log(
//             //     "this.state after uploading: ",
//             //     this.state
//             // );
//         })
//         .catch(function(err) {
//             console.log("err in POST /upload: ", err);
//         });
// }}
