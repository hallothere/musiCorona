import React from "react";
import { ProfilePic } from "./ProfilePic";
import { BioEditor } from "./BioEditor";
import { Wall } from "./Wall";

export function Profile({ url, first, last, clickHandler, setBio, bio }) {
    return (
        <div id="prof">
            <div id="musicLover">
                Hello music lover, <br></br> tell us something about yourself
                and about your musical test by adding profile pic and bio!
            </div>
            <div className="profile-container">
                <div id="ppAndName">
                    <ProfilePic
                        first={first}
                        last={last}
                        url={url}
                        clickHandler={clickHandler}
                    />
                    <p id="fullName">
                        {first} {last}
                    </p>
                </div>
                <Wall />
                <BioEditor
                    first={first}
                    last={last}
                    setBio={setBio}
                    bio={bio}
                />
            </div>
        </div>
    );
}
