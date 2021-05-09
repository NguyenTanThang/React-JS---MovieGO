import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_GENRES,
} from "./types";   

const GENRES_URL = `${MAIN_PROXY_URL}/genres`;

export const getAllGenres = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(GENRES_URL);
    
            let {
                genres,
                genreNumberOfMovies
            } = res.data.data;

            genres = genres.map((genreItem, index) => {
                return {
                    ...genreItem,
                    numberOfMovies: genreNumberOfMovies[index]
                }
            })

            return dispatch({
                type: GET_ALL_GENRES,
                payload: {
                    genres
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}