import axios from "axios";
import {MAIN_PROXY_URL} from "../config/config";
import {message} from "antd";
import {
    GET_ALL_IMAGES,
} from "./types";   

const IMAGES_URL = `${MAIN_PROXY_URL}/images`;

export const getAllImages = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(IMAGES_URL);
    
            let {
                images,
            } = res.data.data;

            return dispatch({
                type: GET_ALL_IMAGES,
                payload: {
                    images
                }
            })
        } catch (error) {
            message.error(error.message, 5);
        }
    }
}