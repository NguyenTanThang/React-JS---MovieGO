import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const MOVIE_URL = `${MAIN_PROXY_URL}/movies`;

export const getAllMoviesAxios = async () => {
    try {
        const res = await axios.get(`${MOVIE_URL}`);

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

        return movies;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}


export const getMovieByIDAxios = async (movieID) => {
    try {
        const res = await axios.get(`${MOVIE_URL}/movieID/${movieID}`);

        const {
            movie,
            view
        } = res.data.data;

        return {
            ...movie,
            view
        };
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}
