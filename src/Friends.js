import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    receiveFriendsWannabes,
    acceptFriendsRequest,
    unfriend
} from "./actions";

export function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        // state => state.friendsWannabes
        state =>
            state.friendsWannabes &&
            state.friendsWannabes.filter(friend => friend.accepted == true)
    );

    const wannabes = useSelector(
        // state => state.friendsWannabes
        state =>
            state.friendsWannabes &&
            state.friendsWannabes.filter(friend => friend.accepted == false)
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    if (!receiveFriendsWannabes) {
        return null;
    }

    // const acceptFriend = e => {
    //     // console.log("e.target: ", e.target);
    //     // if (e.target == "<button>Accept Friend Request</button>") {
    //     //     console.log("this works");
    //     // }
    // };

    return (
        <div>
            <div id="wannabesContainer">
                <div className="wannabes">
                    <p>these people want to be your friends: </p>
                    <div>
                        {wannabes &&
                            wannabes.map(user => (
                                <div className="chosenList" key={user.id}>
                                    <img
                                        className="imageInList"
                                        src={user.url || "/default.jpg"}
                                        alt={`${user.first} ${user.last}`}
                                    />
                                    <Link to={`/user/:${user.id}`}>
                                        {user.first} {user.last}
                                    </Link>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                acceptFriendsRequest(user.id)
                                            )
                                        }
                                    >
                                        Accept Friend Request
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div id="friendsContainer">
                <div className="confirmedFriends">
                    <p>your friends: </p>
                    <div>
                        {friends &&
                            friends.map(user => (
                                <div className="chosenList" key={user.id}>
                                    <img
                                        className="imageInList"
                                        src={user.url || "/default.jpg"}
                                        alt={`${user.first} ${user.last}`}
                                    />
                                    <Link to={`/user/:${user.id}`}>
                                        {user.first} {user.last}
                                    </Link>
                                    <button
                                        onClick={() =>
                                            dispatch(unfriend(user.id))
                                        }
                                    >
                                        End Friendship
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// {wannabes &&
//     wannabes.map(user => (
//         <div className="chosenList" key={user.id}>
//             <img
//                 className="imageInList"
//                 src={user.url || "/default.jpg"}
//                 alt={`${user.first} ${user.last}`}
//             />
//             <Link to={`/user/:${user.id}`}>
//                 {user.first} {user.last}
//             </Link>
//         </div>
//     ))}

// <div id="friendsContainer">
//     <div className="friend">
//         <img src={friends[0].url} />
//     </div>
// </div>
