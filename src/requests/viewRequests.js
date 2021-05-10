import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const VIEW_URL = `${MAIN_PROXY_URL}/views`;

export const addView = async (customerID, movieID) => {
    try {
        //message.loading("Adding to your watch later list", 0);

        const res = await axios.post(`${VIEW_URL}/add`, {
            customerID, movieID
        });

        /*
        message.destroy();
        message.success("Successfully added", 5);
        */

        const {view} = res.data.data;

        return view;
    } catch (error) {
        message.error(error.message, 5);
    }
}
