import React from "react";
import axios from "./axioscopy";
import { FriendButton } from "./FriendButton";

export class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("this.props.match: ", this.props.match);
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
                    <FriendButton otherUserId={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}

//otherUserId={this.props.match.params.id}

//                    <FriendButton otherUserId={this.props.match.params.id} />
