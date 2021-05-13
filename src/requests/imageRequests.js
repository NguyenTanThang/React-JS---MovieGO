import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const IMAGE_URL = `${MAIN_PROXY_URL}/images`;

export const getAllImagesAxios = async () => {
    try {
        const res = await axios.get(`${IMAGE_URL}`);

        const {
            images
        } = res.data.data;

        return images;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}
