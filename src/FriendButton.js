import React, { useEffect, useState } from "react";
import axios from "./axioscopy";

export function FriendButton(otherUserId) {
    const [buttonText, setButtonText] = useState("Make Friend Request");
    useEffect(() => {
        console.log("useEffect  in FriendButton is running");
        console.log("otherUserId: ", otherUserId);
        // return () => {
        axios
            .get(`/initial-friendship-status/${otherUserId.otherUserId}`)
            .then(({ data }) => {
                console.log("DATA: ", data.buttonText);
                setButtonText(data.buttonText);
            })
            .catch(err => {
                console.log("err after get /FriendButtonMount: ", err);
                // setButtonText(err.ButtonText);
            });
    }, []);

    const handleClick = () => {
        console.log("buttonText testing: ", buttonText);
        if (buttonText == "Make Friend Request") {
            axios
                .post("/make-friend-request", otherUserId)
                .then(({ data }) => {
                    console.log(
                        "data after post /make-friend-request: ",
                        data.result
                    );
                    setButtonText("Cancel Friend Request");
                })
                .catch(err => {
                    console.log("err after post /make-friend-request: ", err);
                });
        } else if (buttonText == "Cancel Friend Request") {
            axios
                .post("/cancel-friend-request", otherUserId)
                .then(({ data }) => {
                    console.log(
                        "data after post /cancel-friend-request: ",
                        data.result
                    );
                    setButtonText("Make Friend Request");
                })
                .catch(err => {
                    console.log("err after post /make-friend-request: ", err);
                });
        } else if (buttonText == "Accept Friend Request") {
            axios
                .post("/accept-friend-request", otherUserId)
                .then(({ data }) => {
                    console.log(
                        "data after post /cancel-friend-request: ",
                        data.result
                    );
                    setButtonText("End Friendship");
                })
                .catch(err => {
                    console.log("err after post /make-friend-request: ", err);
                });
        } else if (buttonText == "End Friendship") {
            axios
                .post("/end-friendship", otherUserId)
                .then(({ data }) => {
                    console.log(
                        "data after post /end-friendship: ",
                        data.result
                    );
                    setButtonText("Make Friend Request");
                })
                .catch(err => {
                    console.log("err after post /end-friendship: ", err);
                });
        }
    };

    return <button onClick={handleClick}>{buttonText}</button>;
}
