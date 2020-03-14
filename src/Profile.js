import React from "react";
import { ProfilePic } from "./ProfilePic";
import { BioEditor } from "./BioEditor";

export function Profile({ url, first, last, clickHandler, setBio, bio }) {
    return (
        <div id="prof">
            <ProfilePic
                first={first}
                last={last}
                url={url}
                clickHandler={clickHandler}
            />
            <p id="fullName">
                {first} {last}
            </p>
            <BioEditor first={first} last={last} setBio={setBio} bio={bio} />
        </div>
    );
}
