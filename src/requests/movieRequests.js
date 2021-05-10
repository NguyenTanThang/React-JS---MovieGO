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

export const getAllMoviesRecAxios = async () => {
    try {
        const res = await axios.get(`${MOVIE_URL}/rec`);

        let {
            recMoviesObject,
            listOfNumberOfViews
        } = res.data.data;
        let {
            trendingMovies,
            topRatingMovies,
            newReleaseMovies,
            randomMovies
        } = recMoviesObject;
        let recSections = [
            trendingMovies,
            topRatingMovies,
            newReleaseMovies,
            randomMovies
        ];

        for (let i = 0; i < recSections.length; i++) {
            const recSection = recSections[i];
            recSections[i] = recSection.map(recSectionItem => {
                return {
                    ...recSectionItem,
                    view: listOfNumberOfViews[recSectionItem._id].numberOfViews
                }
            })
        }

        return recSections;
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
