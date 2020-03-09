import React from "react";
import axios from "./axioscopy";

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios
            .get(`/user/${this.props.match.params.id}.json`)
            .then(({ data }) => {
                console.log("data from get /user: ", data);
                if (data.redirecting === true) {
                    // console.log("redirecting to /");
                    this.props.history.push("/");
                } else {
                    let result = data.result[0];
                    this.setState({
                        id: result.id,
                        first: result.first,
                        last: result.last,
                        url: result.url,
                        bio: result.bio
                    });
                }
            });
    }
    render() {
        return (
            <div>
                <div className="otherUser">
                    <p>{this.state.first}</p>
                    <p>{this.state.last}</p>
                    <img
                        id="ppBig"
                        src={this.state.url || "/default.jpg"}
                        alt={`${this.state.first} ${this.state.last}`}
                    />

                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}

//on the render: image tag, bio, first and last

// this.props.history.push("/");
