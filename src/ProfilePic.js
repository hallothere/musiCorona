import React from "react";

export function ProfilePic({ url, first, last, clickHandler }) {
    return (
        <img
            id="profilePic"
            src={url || "/default.jpg"}
            alt={`${first} ${last}`}
            onClick={clickHandler}
        />
    );
}
