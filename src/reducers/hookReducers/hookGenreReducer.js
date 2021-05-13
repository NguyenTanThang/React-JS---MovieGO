import {
    GET_ALL_GENRES
} from "./types";

const reducer = (state, action) => {
    switch (action.type) {
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload.genres
            };
            break;
        default:
            return state;
            break;
    }
}

export default reducer;