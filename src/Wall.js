import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useDispatch, useSelector } from "react-redux";
// import {
//     receiveFriendsWannabes,
//     acceptFriendsRequest,
//     unfriend
// } from "./actions";

export function Wall({
    handleClick,
    handleChange,
    handleClose,
    url,
    first,
    last
}) {
    const posts = useSelector(state => state && state.posts);
    // const chatMessage = useSelector(state => state && state.chatMessage);
    // console.log("here are my last 10 posts");
    //
    // const dispatch = useDispatch();
    // const friends = useSelector(
    //     // state => state.friendsWannabes
    //     state => state.images
    // );
    //
    // useEffect(() => {
    //     dispatch(receiveFriendsWannabes());
    // }, []);
    //
    // if (!receiveFriendsWannabes) {
    //     return null;
    // }

    // const elementRef = useRef();

    // useEffect(() => {
    //     console.log("chat component mounted!");
    //     console.log("elementRef: ", elementRef.current);
    //     console.log("cleint height: ", elementRef.current.clientHeight);
    //     console.log("scroll height: ", elementRef.current.scrollHeight);
    //     console.log("scroll top: ", elementRef.current.scrollTop);
    //     elementRef.current.scrollTop =
    //         elementRef.current.scrollHeight - elementRef.current.clientHeight;
    // }, []);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value: ", e.target.value);
            socket.emit("newPost", e.target.value);
            // chatMessage;
            e.target.value = "";
        }
        // console.log("e.target: ", e.target);
        // console.log("e.key: ", e.key);
    };

    // const handleChangeImage = e => {
    //     console.log("handleChange is running");
    //     console.log("file: ", e.target.files[0]);
    //     const images = useSelector(state => state && state.posts);
    //     // socket.emit("newImage", e.target.files[0]);
    //     e.target.value = "";
    // };
    //
    // const handleClickImage = e => {
    //     e.preventDefault();
    //     console.log("handle click fn after submitting file is working");
    //     var formData = new FormData();
    //     formData.append("title", this.title);
    //     formData.append("description", this.description);
    //     formData.append("username", this.username);
    //     formData.append("file", this.file);
    // var me = this;
    // axios
    //     .post("/upload", formData)
    //     .then(function(resp) {
    //         var imageObj = resp.data.rows[0];
    //         me.images.unshift(imageObj);
    //         me.title = "";
    //         me.description = "";
    //         me.username = "";
    //         // me.file = null;
    //     })
    //     .catch(function(err) {
    //         console.log("err in POST /upload: ", err);
    //     });
    // };

    return (
        <div className="wall">
            <h1>Wall </h1>
            <div className="wall-container">
                <textarea
                    placeholder="Add your message here"
                    onKeyDown={keyCheck}
                />
                {posts &&
                    posts.map(user => (
                        <div key={user.msgId}>
                            <img
                                className="imagesInChat"
                                src={user.url || "/default.jpg"}
                                alt={`${user.first} ${user.last}`}
                            />
                            <p className="nameInChat">{`${user.first} ${user.last}`}</p>
                            <p className="messageInChat">{user.post_text}</p>
                            <p className="dateInChat">
                                posted at: {user.created_at}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
}

// <form>
//     <input
//         v-model="title"
//         type="text"
//         name="title"
//         placeholder="title"
//     />
//     <input
//         v-model="description"
//         type="text"
//         name="description"
//         placeholder="description"
//     />
//     <input
//         v-model="username"
//         type="text"
//         name="username"
//         placeholder="username"
//     />
//     <input
//         onChange={handleChangeImage}
//         id="file"
//         className="inputfile"
//         type="file"
//         name="file"
//         accept="image/*"
//     />
//     <button onClick={handleClickImage}>submit</button>
// </form>
