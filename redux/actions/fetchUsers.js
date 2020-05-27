import { db } from "../../config/index"

const fetchUsers = (currentUserUid) => {
    console.log("fetch user call---------------");

    return async (dispatch) => {
        let tempUsers;
        let allUsers = [];
        let dbRef = db.ref('Users/');
        dbRef.on('value', (users) => {
            tempUsers = users.val();
            if (tempUsers) {
                for (let [key, value] of Object.entries(tempUsers)) {
                    if (value.uid != currentUserUid) {
                        allUsers.push(value)
                    }
                }
                dispatch({ type: "FETCH_USERS", payload: allUsers })
            }
        });
    }
}

export default fetchUsers;






