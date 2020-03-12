import React from "react";
import { ProfilePic } from "./ProfilePic";
// import { BioEditor } from "./BioEditor";

export function Header({ url, first, last, clickHandler }) {
    return (
        <div className="header">
            <img id="logo" src="/logo.png" alt="logo" />
            <ProfilePic
                first={first}
                last={last}
                url={url}
                clickHandler={clickHandler}
            />
            <p>
                {" "}
                Hello {first} {last}{" "}
            </p>
        </div>
    );
}
