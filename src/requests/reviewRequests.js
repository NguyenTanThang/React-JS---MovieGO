import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";

const REVIEW_URL = `${MAIN_PROXY_URL}/rates`;

export const getReviewByCustomerIDAndMovieIDAxios = async (movieID, customerID) => {
    try {
        const res = await axios.get(`${REVIEW_URL}/movieID/${movieID}/customerID/${customerID}`);

        if (!res.data.data) {
            return res.data.data;
        }

        const {rate} = res.data.data;

        return rate;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}

export const getReviewByCustomerID = async (customerID) => {
    try {
        const res = await axios.get(`${REVIEW_URL}/customerID/${customerID}`);

        const {rates} = res.data.data;

        return rates;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}

export const getReviewByMovieIDAxios = async (movieID) => {
    try {
        const res = await axios.get(`${REVIEW_URL}/movieID/${movieID}`);

        const {rates} = res.data.data;

        return rates;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}

export const addRating = async ({customerID, movieID, grading}) => {
    try {
        message.loading("Sending your ratings...", 0);

        const res = await axios.post(`${REVIEW_URL}/add`, {
            customerID, movieID, rate: grading
        });

        message.destroy();
        message.success("Successfully rated", 5);

        const {rate} = res.data.data;

        return rate;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}

export const editRating = async (reviewID, {customerID, movieID, grading}) => {
    try {
        message.loading("Sending your ratings...", 0);

        const res = await axios.put(`${REVIEW_URL}/edit/${reviewID}`, {
            customerID, movieID, rate: grading
        });

        message.destroy();
        message.success("Successfully re-rated.", 5);

        const {rate} = res.data.data;

        console.log(rate);

        return rate;
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}