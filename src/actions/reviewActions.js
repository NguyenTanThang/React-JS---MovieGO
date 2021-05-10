import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    ADD_REVIEW,
    EDIT_REVIEW,
    GET_REVIEWS_BY_MOVIES_ID
} from "./types";   
import {
    setLoading,
    clearLoading
} from "./loadingActions";

const REVIEWS_URL = `${MAIN_PROXY_URL}/rates`;

export const getReviewsByMovieID = (movieID) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading());

            const res = await axios.get(`${REVIEWS_URL}/movieID/${movieID}`);
    
            const {rates} = res.data.data;

            dispatch(clearLoading());

            return dispatch({
                type: GET_REVIEWS_BY_MOVIES_ID,
                payload: {
                    rates
                }
            })
        } catch (error) {
            console.log(error);
            message.error(error.message, 5);
        }
    }
}

export const addReview = (newReview) => {
    return async (dispatch) => {
        try {
            const review = newReview;

            return dispatch({
                type: ADD_REVIEW,
                payload: {
                    review
                }
            })
        } catch (error) {
            console.log(error);
            message.error(error.message, 5);
        }
    }
}

export const editReview = (updatedReview) => {
    return async (dispatch) => {
        try {
            const review = updatedReview;

            return dispatch({
                type: EDIT_REVIEW,
                payload: {
                    review
                }
            })
        } catch (error) {
            console.log(error);
            message.error(error.message, 5);
        }
    }
}