// import { $ } from 'jquery';
import { URLS } from "./constants";

export const signIn = (login, password) => {
    return $.ajax({
        url: URLS.signIn,
        method: "POST",
        body: JSON.stringify({ login, password })
    });
};

export const signUp = (login, password1, password2) => {
    return $.ajax({
        url: URLS.signUp,
        method: "POST",
        body: JSON.stringify({ login, password1, password2 })
    });
};

export const logout = () => {
    return $.ajax({
        url: URLS.logout,
        method: "POST",
    });
};