import { BehaviorSubject } from 'rxjs';
import {createNotification} from "../utils";
import {message} from "antd";
import {MAIN_PROXY_URL} from "../config/config";
import { handleResponse } from '../_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    setNewCustomerItem,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function setNewCustomerItem(customerItem) {
    const {currentUserValue} = authenticationService;

    localStorage.setItem('currentUser', JSON.stringify({
        ...currentUserValue,
        ...customerItem
    }));
    currentUserSubject.next({
        ...currentUserValue,
        ...customerItem
    });
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    message.loading("Logging in...", 0);
    return fetch(`${MAIN_PROXY_URL}/customers/sign-in`, requestOptions)
        .then(handleResponse)
        .then(data => {
            message.destroy();
            if (data.success) {
                const {customer} = data.data;
                const user = customer;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);

                createNotification("success", {
                    message: "Logged in",
                    description: `Welcome back, ${user.username}`
                });
    
                return user;
            } else {
                createNotification("error", {
                    message: "Login",
                    description: data.message
                });
                throw new Error();
            }
        });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    window.location.replace("/sign-in");
}