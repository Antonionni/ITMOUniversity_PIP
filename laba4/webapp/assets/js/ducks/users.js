import { handleActions, createAction } from 'redux-actions';
import * as api from '../api';
import {SERVER_ERRORS} from "../constants";
// import _ from "underscore";


const USER_SIGN_IN = "USER_SIGN_IN";
const USER_SIGN_UP = "USER_SIGN_UP";
const USER_LOGOUT = "USER_LOGOUT";

// actions

export const userSignUp = createAction(USER_SIGN_UP);
export const userSignIn = createAction(USER_SIGN_IN);
export const userLogout = createAction(USER_LOGOUT);

const initialState = {
    error: SERVER_ERRORS.OK,
    currentUser: null
};

export const signIn = (user , password) => {
    return (dispatch) => {
        api.signIn(user, password).done((data) => {
            dispatch(userSignIn(data));
        }).fail((error) => {
            dispatch(userSignIn({
                error,
                currentUser: null
            }));
        });
    };
};

export const signUp = (user, password1, password2) => {
    return (dispatch) => {
        api.signIn(user, password1, password2).then((state) => {
            dispatch(userSignUp(state));
        });
    };
};


export const logout = () => {
    return (dispatch) => {
        api.logout().then((state) => {
            dispatch(userLogout(state));
        });
    };
};

export default handleActions({
    [USER_SIGN_IN]: (state, { payload }) => {
        return _.assign(state, {
            error: payload.error,
            currentUser: payload.user
        });
    },
    [USER_SIGN_UP]: (state, { payload }) => {
        return _.assign(state, {
            error: payload
        });
    },
    [USER_LOGOUT]: (state, { payload }) => {
        return _.assign(state, {
            error: payload
        });
    }
});

// selectors

export const getError = ({ error }) => {
    return error;
};

export const getCurrentUser = ({ currentUser }) => {
    return currentUser;
};