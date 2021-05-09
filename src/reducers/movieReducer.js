import {
    GET_ALL_MOVIES,
} from "../actions/types";

const initialState = {
    movies: []
}

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_MOVIES:
            return {
                ...state,
                movies: action.payload.movies
            }
            break;
        default:
            return state;
            break;
    }
}

export default moviesReducer;