import {
    GET_ALL_IMAGES
} from "./types";

const reducer = (state, action) => {
    switch (action.type) {
        case GET_ALL_IMAGES:
            return {
                ...state,
                images: action.payload.images
            };
            break;
        default:
            return state;
            break;
    }
}

export default reducer;