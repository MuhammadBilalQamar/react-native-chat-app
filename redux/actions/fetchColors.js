import { db } from "../../config/index"

const fetchColors = () => {
    console.log("fetch colors call---------------");

    return async (dispatch) => {

        let dbRef = db.ref('RemoteConfig/');
        let tempColor;
        dbRef.on('value', (colors) => {
            // console.log(colors.val().color)
            if (colors.val()) {
                tempColor = colors.val().color
                dispatch({ type: "FETCH_COLORS", payload: colors.val().color })
            }
            else {
                dispatch({ type: "FETCH_COLORS", payload: "#E5634D" })
            }
        });
        // console.log(tempColor)
        dispatch({ type: "FETCH_COLORS", payload: "#E5634D" })
    }
}

export default fetchColors;






