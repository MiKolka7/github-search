import * as types from '../constants/actionTypes';

export const connectionState = (status) => {
    return {
        type:    types.CHANGE_CONNECTION_STATUS,
        payload: {
            online: status
        }
    };
};
