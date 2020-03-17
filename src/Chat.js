import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatMessages);
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

    const keyCheck = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e.target.value: ", e.target.value);
            socket.emit("muffin", e.target.value);
            e.target.value = "";
        }
        // console.log("e.target: ", e.target);
        // console.log("e.key: ", e.key);
    };

    return (
        <div className="chat">
            <h1>Chat room </h1>
            <div className="chat-container" ref={elementRef}>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
                <p>Chat messages will go here...</p>
            </div>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheck}
            />
        </div>
    );
}
