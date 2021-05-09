import axios from "axios";
import {
    MAIN_PROXY_URL
} from "../config/config";
import {
    message
} from "antd";
import { authenticationService } from '../_services';

const CUSTOMER_URL = `${MAIN_PROXY_URL}/customers`;

export const signUp = async ({username, email, password}) => {
    try {
        message.loading("Creating a new account...", 0);

        const res = await axios.post(`${CUSTOMER_URL}/sign-up`, {
            username, email, password
        });

        const {
            success,
        } = res.data;
        const resMessage = res.data.message;

        message.destroy();

        if (!success) {
            message.error(resMessage);
            return {
                success
            };
        }

        message.success(resMessage);

        const {
            customer
        } = res.data.data;

        return {
            customer,
            success
        };
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}

export const updateProfile = async ({username, password}) => {
    try {
        message.loading("Creating a new account...", 0);

        const res = await axios.put(`${CUSTOMER_URL}/update-profile/${authenticationService.currentUserValue._id}`, {
            username, password
        });

        const {
            success,
        } = res.data;
        const resMessage = res.data.message;

        message.destroy();

        if (!success) {
            message.error(resMessage);
            return {
                success
            };
        }

        message.success(resMessage);

        const {
            customer
        } = res.data.data;

        authenticationService.setNewCustomerItem({
            ...customer
        })

        return {
            customer,
            success
        };
    } catch (error) {
        console.log(error);
        message.error(error.message, 5);
    }
}