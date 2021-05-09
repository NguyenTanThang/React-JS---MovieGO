import {
    GET_ALL_GENRES,
} from "../actions/types";

const initialState = {
    genres: []
}

const genresReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload.genres
            }
            break;
        default:
            return state;
            break;
    }
}

export default genresReducer;