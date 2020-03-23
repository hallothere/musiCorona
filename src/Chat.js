import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector, useDispatch } from "react-redux";
import { ConcertHall } from "./ConcertHall";
// import { chooseVideo, video, videos } from "./actions";

export function Chat() {
    const dispatch = useDispatch();
    const chatMessages = useSelector(state => state && state.chatMessages);
    const videos = useSelector(state => state && state.videos);
    console.log("here are my last 10 chat messages");

    const elementRef = useRef();

    useEffect(() => {
        console.log("chat component mounted!");
        console.log("elementRef: ", elementRef.current);
        console.log("cleint height: ", elementRef.current.clientHeight);
        console.log("scroll height: ", elementRef.current.scrollHeight);
        console.log("scroll top: ", elementRef.current.scrollTop);
        elementRef.current.scrollTop =
            elementRef.current.scrollHeight - elementRef.current.clientHeight;
    }, []);

    useEffect(() => {
        console.log("chat component mounted!");
        console.log("elementRef: ", elementRef.current);
        console.log("cleint height: ", elementRef.current.clientHeight);
        console.log("scroll height: ", elementRef.current.scrollHeight);
        console.log("scroll top: ", elementRef.current.scrollTop);
        elementRef.current.scrollTop =
            elementRef.current.scrollHeight - elementRef.current.clientHeight;
    }, [chatMessages]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value: ", e.target.value);
            socket.emit("newMessage", e.target.value);
            // chatMessage;
            e.target.value = "";
        }
        // console.log("e.target: ", e.target);
        // console.log("e.key: ", e.key);
    };

    const handleChange = e => {
        console.log("handleChange is running");
        // this.setState({ file: e.target.files[0] });
    };

    const handleClick = e => {
        console.log("e.target.value: ", e.target.value);
        console.log("e.target.file: ", e.target.file);
        socket.emit("newVideo", e.target.value);
        // chatMessage;
        e.target.value = "";
    };

    return (
        <div>
            <div id="upload-video">
                <h1>Upload your video here:</h1>
                <form>
                    <input type="text" name="title" placeholder="title" />
                    <input
                        type="text"
                        name="description"
                        placeholder="description"
                    />
                    <input
                        onChange="handleChange"
                        id="file"
                        className="inputfile"
                        type="file"
                        name="file"
                    />
                    <button onClick="handleClick">submit</button>
                </form>
            </div>
            <div className="ConcertHallContainer">
                <div className="chat">
                    <h1>Chat room </h1>
                    <div className="chat-container" ref={elementRef}>
                        {chatMessages &&
                            chatMessages.map(user => (
                                <div className="chatMessages" key={user.date}>
                                    <img
                                        className="imagesInChat"
                                        src={user.url || "/default.jpg"}
                                        alt={`${user.first} ${user.last}`}
                                    />
                                    <div className="rightSide">
                                        <p className="nameInChat">{`${user.first} ${user.last}`}</p>
                                        <p className="dateInChat">
                                            {user.created_at}
                                        </p>

                                        <p className="messageInChat">
                                            {user.message_text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <textarea
                        placeholder="Add your message here"
                        onKeyDown={keyCheck}
                    />
                </div>
                <ConcertHall />
            </div>
        </div>
    );
}

// handleChange(e) {
//     console.log("handleChange is running");
//     this.setState({ file: e.target.files[0] });
// }
//
// handleClose() {
//     console.log("handleClose is running");
//     this.setState({
//         uploaderVisible: false
//     });
// }
//
// handleClick(e) {
//     e.preventDefault();
//     console.log("handle click fn after submitting file is working");
//     var formData = new FormData();
//     formData.append("file", this.state.file);
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
//         })
//         .catch(function(err) {
//             console.log("err in POST /upload: ", err);
//         });
// }

// <form>
//     <img
//         id="ppBig"
//         src={url || "/default.jpg"}
//         alt={`${first} ${last}`}
//     />
//     <input
//         onChange={handleChange}
//         id="fileUploader"
//         type="file"
//         name="file"
//         accept="image/*"
//     />
//     <button id="submitUploader" onClick={handleClick}>
//         submit
//     </button>
//     <button id="closeUploader" onClick={handleClose}>
//         close
//     </button>
// </form>
