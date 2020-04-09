const iState = {
    name: "Bilal",
    currentUser: null,
    uid: null,
    allUsers: []
}


const reducer = (state = iState, action) => {
    switch (action.type) {
        case "UPDATE_USER":
            return {
                ...state,
                currentUser: action.payload,
                uid: action.payload.uid
            }
        case "FETCH_USERS":
            return {
                ...state,
                allUsers: action.payload
            }
            // code block
            break;
        // default:
        //   // code block
    }
}

export default reducer;