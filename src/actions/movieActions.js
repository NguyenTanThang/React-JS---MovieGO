import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_MOVIES,
} from "./types";   

const MOVIES_URL = `${MAIN_PROXY_URL}/movies`;

export const getAllMovies = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(MOVIES_URL);
    
            let {
                movies,
                listOfNumberOfViews
            } = res.data.data;

            movies = movies.map((movieItem, index) => {
                return {
                    ...movieItem,
                    view: listOfNumberOfViews[index]
                }
            })

            return dispatch({
                type: GET_ALL_MOVIES,
                payload: {
                    movies
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}