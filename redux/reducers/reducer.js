const iState = {
    name: "Bilal",
    currentUser: null,
    uid: null,
    allUsers: [],
    color: "#E5634D",
    darkColor: "#C31C0D"

}


const reducer = (state = iState, action) => {
    // console.log("payload-------------", action.payload)
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
        case "FETCH_COLORS":
            return {
                ...state,
                color: action.payload
            }
            // code block
            break;
        // default:
        //   // code block
    }
}

export default reducer;