import React, { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { useSelector, useDispatch } from "react-redux";
// import { ConcertHall } from "./ConcertHall";
import { video, videos } from "./actions";

export function Chat() {
    const dispatch = useDispatch();
    const chatMessages = useSelector(state => state && state.chatMessages);
    const oldVideos = useSelector(state => state && state.videos);
    const newVideo = useSelector(state => state && state.video);
    // console.log("here are my last 10 chat messages");
    const [searchVideos, setSearchVideos] = useState({});
    const [error, setError] = useState();

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
        // console.log("e.target.name: ", e.target.name);
        // console.log("e.target.value: ", e.target.value);

        setSearchVideos({
            ...searchVideos,
            [e.target.name]: e.target.value
        });
        console.log("searchVideos after useStatefulFields: ", searchVideos);
    };

    const handleClick = e => {
        e.preventDefault();
        console.log("searchVideos.file.type: ", searchVideos.file.type);
        if (
            searchVideos.file.type != "video/mp4" &&
            searchVideos.file.type != "video/quicktime"
        ) {
            console.log("error, the file must be a video file");
            setError({ error: true });
            return;
        } else {
            // console.log("e.target.value: ", e.target.value);
            var formData = new FormData();
            formData.append("file", searchVideos.file);
            formData.append("title", searchVideos.title);
            formData.append("description", searchVideos.description);
            console.log("formData: ", formData);
            dispatch(video(formData));
        }
    };

    return (
        <div id="chat-out">
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
                {error && (
                    <div id="video-error">please upload a video file</div>
                )}
            </div>
            <div id="videoAndChat">
                <h1>Video Library</h1>
                <h1>Chat Room</h1>
            </div>

            <div id="chat-in">
                <div className="chat">
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

                                        <p className="msgInChat">
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
                    {oldVideos &&
                        oldVideos.map(user => (
                            <div className="videos" key={user.date}>
                                <div className="rightSideVideo">
                                    <div className="imgNameDate">
                                        <img
                                            className="imagesInVideo"
                                            src={user.url || "/default.jpg"}
                                            alt={`${user.first} ${user.last}`}
                                        />
                                        <div className="nameAndDate">
                                            <p className="nameInVideo">{`${user.first} ${user.last}`}</p>
                                            <p className="dateInVideo">
                                                {user.created_at}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="video-title">{user.title}</p>
                                    <p className="video-description">
                                        {user.description}
                                    </p>
                                    <video
                                        className="videoInLibrary"
                                        id="samp"
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
