import {
    GET_ALL_IMAGES,
} from "../actions/types";

const initialState = {
    images: []
}

const imagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_IMAGES:
            return {
                ...state,
                images: action.payload.images
            }
            break;
        default:
            return state;
            break;
    }
}

export default imagesReducer;