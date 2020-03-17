// export default function(state = {}, action) {
//     return state;
// }

export default function(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes
        };
    }
    if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(friend => {
                if (friend.id == action.id) {
                    return { ...friend, accepted: true };
                } else {
                    return friend;
                }
            })
        };
    }
    if (action.type == "DELETE_FRIEND") {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(
                friend => friend.id != action.id
            )
        };
    }
    if (action.type == "RECEIVE_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }
    if (action.type == "ADD_MESSAGE") {
        state = {
            ...state,
            // arr: [...state.arr, action.newItem]
            chatMessages: [...state.chatMessages, action.chatMessage]
        };
    }
    return state;
}
