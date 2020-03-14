import React from "react";
// import { ProfilePic } from "./ProfilePic";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <div>
            <div>
                <Link id="usersLink" to="/users">
                    search
                </Link>
                <Link id="friendsLink" to="/friends">
                    friends
                </Link>
            </div>
        </div>
    );
}
