import { AsyncStorage } from 'react-native';
import Base64 from 'base-64';
import * as types from '../constants/actionTypes';
import { config } from '../constants/general';

const setUserToken = (type, auth) => {
    return {type, payload: auth};
};

export const auth = (userLogin, pass) => (dispatch) => {
    const reqBody = {
        client_id: config.GITHUB_CLIENT_ID,
        client_secret: config.GITHUB_CLIENT_SECRET,
        fingerprint: Math.random().toString(),
        note: 'search',
        scopes: ['repo', 'user']
    };

    return fetch(`${config.GITHUB_API_URL}authorizations`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Base64.encode(`${userLogin}:${pass}`)
        },
        body: JSON.stringify(reqBody)
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message === 'Bad credentials') {
                return false;
            }
            else {
                AsyncStorage.setItem('auth', JSON.stringify(data));
                dispatch(setUserToken(types.USER_AUTH, data));
                return true;
            }
        });
};


export const logOut = (data) => (dispatch) => {
    AsyncStorage.multiRemove(['repositories', 'auth']);

    dispatch({
        type: types.USER_LOG_OUT
    });
};

export const checkAuth = (data) => (dispatch) => {
    dispatch(setUserToken(types.USER_GET_CACHE_AUTH, data));

    // return fetch(`${config.GITHUB_API_URL}applications/${client_id}/tokens/${token}`)
    //     .then((res) => res.json())
    //     .then((data) => data)
    //     .catch((err) => console.log(err));
};