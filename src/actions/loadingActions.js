import {
    SET_LOADING,
    CLEAR_LOADING
} from "./types";   

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

export const clearLoading = () => {
    return {
        type: CLEAR_LOADING
    }
}