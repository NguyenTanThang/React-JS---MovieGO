import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const GENRE_URL = `${MAIN_PROXY_URL}/genres`;

export const getAllGenresAxios = async () => {
    try {
        const res = await axios.get(`${GENRE_URL}`);

        const {
            genres
        } = res.data.data;

        return genres;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}
