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
                console.log("data from get /user: ", data.result[0]);
                let result = data.result[0];
                // if ((data.redirectTo = "/")) {
                //     this.props.history.push("/");
                // } else {
                this.setState({
                    id: result.id,
                    first: result.first,
                    last: result.last,
                    url: result.url
                });
                // }
            });
    }
    render() {
        return (
            <div>
                <div className="otherUser">
                    <p>{this.state.first}</p>
                    <p>{this.state.last}</p>
                    <p>{this.state.bio}</p>
                    <p>OtherProfile text here</p>
                </div>
            </div>
        );
    }
}

//on the render: image tag, bio, first and last

// this.props.history.push("/");
