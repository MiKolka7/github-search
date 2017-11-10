import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function (state = initialState.app, action) {
    switch (action.type) {
        
        case types.CHANGE_CONNECTION_STATUS:
            return {
                ...state,
                network: {
                    online: action.payload.online
                }
            };
        
        default:
            return state;
        
    }
}
