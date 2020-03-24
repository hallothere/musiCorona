import React, { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { useSelector, useDispatch } from "react-redux";
import { ConcertHall } from "./ConcertHall";
import { video, videos } from "./actions";

export function Chat() {
    const dispatch = useDispatch();
    const chatMessages = useSelector(state => state && state.chatMessages);
    const oldVideos = useSelector(state => state && state.videos);
    const newVideo = useSelector(state => state && state.video);
    // console.log("here are my last 10 chat messages");
    const [searchVideos, setSearchVideos] = useState({});

    const elementRef = useRef();

    useEffect(() => {
        // console.log("chat component mounted!");
        // console.log("elementRef: ", elementRef.current);
        // console.log("cleint height: ", elementRef.current.clientHeight);
        // console.log("scroll height: ", elementRef.current.scrollHeight);
        // console.log("scroll top: ", elementRef.current.scrollTop);
        elementRef.current.scrollTop =
            elementRef.current.scrollHeight - elementRef.current.clientHeight;
    }, []);

    useEffect(() => {
        // console.log("chat component mounted!");
        // console.log("elementRef: ", elementRef.current);
        // console.log("cleint height: ", elementRef.current.clientHeight);
        // console.log("scroll height: ", elementRef.current.scrollHeight);
        // console.log("scroll top: ", elementRef.current.scrollTop);
        elementRef.current.scrollTop =
            elementRef.current.scrollHeight - elementRef.current.clientHeight;
    }, [chatMessages]);

    // useEffect(() => {
    //     console.log("useEffect is running");
    //     // return () => {
    //     axios
    //         .get("/receiveVideos")
    //         .then(({ data }) => {
    //             console.log("data after get /receiveVideos: ", data.result);
    //             // setSearchVideos(data.result);
    //             // };
    //         })
    //         .catch(err => {
    //             console.log("err after get /videos.json: ", err);
    //         });
    // }, []);

    useEffect(() => {
        dispatch(videos());
    }, []);

    useEffect(() => {
        dispatch(videos());
    }, [newVideo]);

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            // console.log("e.target.value: ", e.target.value);
            socket.emit("newMessage", e.target.value);
            // chatMessage;
            e.target.value = "";
        }
        // console.log("e.target: ", e.target);
        // console.log("e.key: ", e.key);
    };

    const useStatefulFields = e => {
        console.log("e.target.name: ", e.target.name);
        console.log("e.target.value: ", e.target.value);

        setSearchVideos({
            ...searchVideos,
            [e.target.name]: e.target.value
        });
        console.log("searchVideos after useStatefulFields: ", searchVideos);
    };

    // const handleChange = e => {
    //     console.log("handleChange is running");
    //     console.log("e.target.file: ", e.target.file);
    //     setSearchVideos({ file: e.target.files[0] }); //useState
    // };

    const handleClick = e => {
        e.preventDefault();
        console.log("searchVideos: ", searchVideos);

        // console.log("e.target.value: ", e.target.value);
        var formData = new FormData();
        formData.append("file", searchVideos.file);
        formData.append("title", searchVideos.title);
        formData.append("description", searchVideos.description);
        console.log("formData: ", formData);
        dispatch(video(formData));
        // console.log("e.target.file: ", e.target.file);
        // // socket.emit("newVideo", e.target.file);
        // // chatMessage;
        // e.target.value = "";
    };

    return (
        <div>
            <div id="upload-video">
                <h1>Upload your video here:</h1>
                <form>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        onChange={e => useStatefulFields(e)}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="description"
                        onChange={e => useStatefulFields(e)}
                    />
                    <input
                        onChange={e =>
                            setSearchVideos({
                                ...searchVideos,
                                file: e.target.files[0]
                            })
                        }
                        placeholder="choose video"
                        id="file"
                        className="inputfile"
                        type="file"
                        name="file"
                    />
                    <button onClick={handleClick}>submit</button>
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
                <div id="ConcertHallsmallContainer">
                    <h1>library</h1>
                    <p>
                        here will stand the videos like in imageboard where
                        people can choose and add comments
                    </p>
                    {oldVideos &&
                        oldVideos.map(user => (
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
                                    <p className="video-title">
                                        title: {user.title}
                                    </p>
                                    <p className="video-description">
                                        {user.description}
                                    </p>
                                    <video
                                        className="videoInLibrary"
                                        id="samp"
                                        width="400"
                                        height="400"
                                        controls
                                        src={user.video}
                                        type="video/mp4"
                                    ></video>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

// accept="video/mp4/*"

// <img
//     className="videoInLibrary"
//     src={user.video || "/default.jpg"}
//     alt={`${user.first} ${user.last}`}
// />

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
