import {
    CLEAR_LOADING,
    SET_LOADING
} from "../actions/types";

const initialState = {
    loading: true
}

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_LOADING:
            return {
                ...state,
                loading: false
            }
            break;
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
            break;
        default:
            return state;
            break;
    }
}

export default loadingReducer;