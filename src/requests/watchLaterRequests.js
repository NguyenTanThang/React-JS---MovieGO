import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const WATCH_LATER_URL = `${MAIN_PROXY_URL}/watch-laters`;

export const getWatchLaterByCustomerIDAndMovieID = async (customerID, movieID) => {
    try {
        const res = await axios.get(`${WATCH_LATER_URL}/customerID/${customerID}/movieID/${movieID}`);

        const {watchLater} = res.data.data;

        return watchLater;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const getWatchLaterByCustomerID = async (customerID) => {
    try {
        const res = await axios.get(`${WATCH_LATER_URL}/customerID/${customerID}`);

        let {
            movies,
            listOfNumberOfViews,
            watchLaters
        } = res.data.data;

        movies = movies.map((movieItem, index) => {
            return {
                ...movieItem,
                view: listOfNumberOfViews[index]
            }
        })

        return movies;
    } catch (error) {
        message.error(error.message, 5);
    }
}


export const addWatchLater = async (customerID, movieID) => {
    try {
        message.loading("Adding to your watch later list", 0);

        const res = await axios.post(`${WATCH_LATER_URL}/add`, {
            customerID, movieID
        });

        message.destroy();
        message.success("Successfully added", 5);

        const {watchLater} = res.data.data;

        return watchLater;
    } catch (error) {
        message.error(error.message, 5);
    }
}

export const deleteWatchLater = async (customerID, movieID) => {
    try {
        message.loading("Removing from your watch later list", 0);

        const watchLaterItem = await getWatchLaterByCustomerIDAndMovieID(customerID, movieID)
        const res = await axios.delete(`${WATCH_LATER_URL}/delete/${watchLaterItem._id}`);

        message.destroy();
        message.success("Successfully removed", 5);

        const {watchLater} = res.data.data;

        return watchLater;
    } catch (error) {
        message.error(error.message, 5);
    }
}