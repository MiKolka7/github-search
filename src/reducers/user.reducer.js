import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = initialState.user, action) {
    switch (action.type) {

        case types.USER_AUTH:
        case types.USER_GET_CACHE_AUTH:
            return {
                ...state,
                authData: action.payload
            };

        case types.USER_LOG_OUT:
            return {
                ...state,
                authData: {}
            };

        default:
            return state;

    }
}
