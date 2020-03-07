import React from "react";
import axios from "./axioscopy";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // buttonAdd: true,
            bioAndEdit: true
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
            textAreaAppear: true
            // buttonAdd: false
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
            console.log("this.state after saveBio: ", this.state);
        });
    }

    // onClickSaveBtn( {
    //     axios.post("/bio", this.state).then(resp => {
    //         console.log("resp after post /bio; ", resp.data);
    //         this.setState(resp.data).then() {
    //             this.props.setBio(this.state.newBio);
    //         }
    //         this.setState({ bioAndEdit: true });
    //         this.setState({ textAreaAppear: false });
    //         console.log(
    //             "this.state.textAreaAppear: ",
    //             this.state.textAreaAppear
    //         );
    //         console.log(
    //             "this.props.bio: ",
    //             this.props.bio
    //         );
    // })

    //     render() {
    //         return (
    //             <div>
    //                 {this.props.bio && (
    //                     <div>
    //                         <div className="textareaIfBioExists">
    //                             {this.state.textareaAndEdit && (
    //                                 <div>
    //                                     <textarea
    //                                         defaultValue={this.props.bio}
    //                                     ></textarea>
    //                                     <button
    //                                         onClick={() => {
    //                                             this.showArea();
    //                                             this.setState({
    //                                                 textareaAndEdit: false
    //                                             });
    //                                             this.setState({
    //                                                 bioExist: false
    //                                             });
    //                                         }}
    //                                         id="addBio"
    //                                     >
    //                                         edit
    //                                     </button>
    //                                 </div>
    //                             )}
    //
    //                             {this.state.textAreaAppear && (
    //                                 <div>
    //                                     <h1>Hello {this.props.first}</h1>
    //                                     <textarea
    //                                         onChange={this.handleChange}
    //                                         id="textarea"
    //                                         defaultValue={this.props.bio}
    //                                     ></textarea>
    //                                     <button
    //                                         onClick={() => {
    //                                             this.saveBio();
    //                                             this.props.setBio(
    //                                                 this.state.newBio
    //                                             );
    //                                             this.setState({ bioExist: true });
    //                                         }}
    //                                     >
    //                                         save
    //                                     </button>
    //                                 </div>
    //                             )}
    //                         </div>
    //                     </div>
    //                 )}
    //
    //                 {!this.props.bio && (
    //                     <div className="bio">
    //                         {this.state.buttonAdd && (
    //                             <button onClick={this.showArea} id="addBio">
    //                                 Add bio
    //                             </button>
    //                         )}
    //                         {this.state.textAreaAppear && (
    //                             <div>
    //                                 <h1>Hello {this.props.first}</h1>
    //                                 <textarea
    //                                     onChange={this.handleChange}
    //                                     id="textarea"
    //                                 ></textarea>
    //                                 <button
    //                                     onClick={() => {
    //                                         this.saveBio();
    //                                         this.props.setBio(this.state.newBio);
    //                                         this.setState({ bioExist: true });
    //                                         this.setState({
    //                                             textAreaAppear: false
    //                                         });
    //                                     }}
    //                                 >
    //                                     save
    //                                 </button>
    //                             </div>
    //                         )}
    //                     </div>
    //                 )}
    //             </div>
    //         );
    //     }
    // }
    //// secondTry
    render() {
        return (
            <div>
                {this.props.bio && this.state.bioAndEdit && (
                    <div>
                        <div className="textareaIfBioExists">
                            <p>{this.props.first}`s bio: </p>

                            <p> {this.props.bio}</p>
                            <button
                                onClick={() => {
                                    this.showArea();
                                    this.setState({
                                        bioAndEdit: false
                                    });
                                }}
                                id="editBio"
                            >
                                edit
                            </button>
                        </div>
                    </div>
                )}

                {this.state.textAreaAppear && (
                    <div>
                        <div className="textarea">
                            <textarea
                                onChange={this.handleChange}
                                id="textarea"
                                defaultValue={this.props.bio}
                            ></textarea>
                            <h1>Hello {this.props.first}</h1>

                            <button
                                onClick={() => {
                                    this.saveBio();
                                    this.props.setBio(this.state.bio);
                                    this.setState({ bioAndEdit: true });
                                    this.setState({ textAreaAppear: false });
                                    console.log(
                                        "this.state.textAreaAppear: ",
                                        this.state.textAreaAppear
                                    );
                                    console.log(
                                        "this.props.bio: ",
                                        this.props.bio
                                    );
                                }}
                            >
                                save
                            </button>
                        </div>
                    </div>
                )}

                {!this.props.bio && this.state.bioAndEdit && (
                    <div>
                        <div className="bio">
                            <p>
                                hallo {this.props.first}, would you like to add
                                a bio?
                            </p>
                            <button
                                onClick={() => {
                                    this.showArea();
                                    this.setState({
                                        bioAndEdit: false
                                    });
                                }}
                                id="addBio"
                            >
                                Add bio
                            </button>
                            {this.state.textAreaAppear && (
                                <div>
                                    <textarea
                                        onChange={this.handleChange}
                                        id="textarea"
                                    ></textarea>
                                    <button
                                        onClick={() => {
                                            this.saveBio();
                                            this.props.setBio(this.state.bio);
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
                    </div>
                )}
            </div>
        );
    }
}

// {this.state.textareaAndEdit && (
//     <div>
//         <textarea defaultValue={this.props.bio}></textarea>
//         <button
//             onClick={() => {
//                 this.showArea();
//                 this.setState({
//                     textareaAndEdit: false
//                 });
//                 this.setState({
//                     bioExist: false
//                 });
//             }}
//             id="addBio"
//         >
//             edit
//         </button>
//     </div>
// )}
