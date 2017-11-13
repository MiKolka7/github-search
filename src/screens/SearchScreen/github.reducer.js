import initialState from '../../reducers/initialState';
import * as types from '../../constants/actionTypes';

export default function (state = initialState.repositories, action) {
    switch (action.type) {

        case types.FIND_REPOSITORIES_FETCHING:
            return {
                ...state,
                isFetching: true,
                searchParams: action.payload
            };

        case types.FIND_REPOSITORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                searchResult: action.payload
            };

        case types.GET_CACHE_REPOSITORIES:
            return {
                ...state,
                searchResult: action.payload
            };

        case types.UPDATE_FIND_REPOSITORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                searchResult: {
                    list: [...state.searchResult.list, ...action.payload.list],
                    totalCount: action.payload.totalCount
                }
            };

        case types.FIND_REPOSITORIES_ERROR:
            return {
                ...state,
                isFetching: false
            };

        default:
            return state;

    }
}
