import axios from "./axioscopy";

//
export async function receiveFriendsWannabes() {
    const { data } = await axios.get(`/friends-wannabes`);
    console.log("data after get /friends.json: ", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsWannabes: data
    };
}
export async function acceptFriendsRequest(otherUserId) {
    const { data } = await axios.post("/accept-friend-request", {
        otherUserId: otherUserId
    });
    console.log("otherUserId: ", otherUserId);
    console.log("data after get /accept-friend-request: ", otherUserId);
    return {
        type: "ACCEPT_FRIEND",
        id: otherUserId
    };
}
//
export async function unfriend(otherUserId) {
    const { data } = await axios.post("/end-friendship", otherUserId);
    console.log("data after get /accept-friend-request: ", otherUserId);
    return {
        type: "DELETE_FRIEND",
        id: otherUserId
    };
}
