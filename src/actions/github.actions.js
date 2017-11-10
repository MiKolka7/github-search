import { AsyncStorage } from 'react-native';

import { config } from '../constants/general';
import * as types from '../constants/actionTypes';

const searchRepositoriesFetching = (searchParams) => {
    return {
        type:    types.FIND_REPOSITORIES_FETCHING,
        payload: searchParams
    };
};

const searchRepositoriesSuccess = (data, update) => {
    let type = types.FIND_REPOSITORIES_SUCCESS;

    if (update) {
        type = types.UPDATE_FIND_REPOSITORIES_SUCCESS;
    }

    return {
        type,
        payload: {
            list:       data.items,
            totalCount: data.total_count
        }
    };
};

const searchRepositoriesError = (error) => {
    return {
        type:    types.FIND_REPOSITORIES_ERROR,
        payload: { error }
    };
};

const getCacheSearchData = (data) => {
    return {
        type:    types.GET_CACHE_REPOSITORIES,
        payload: {
            list: data.list || [],
            totalCount: data.totalCount
        }
    };
};

export const onSearchRepositories = (query, page = 1, sort) => (dispatch, state) => {
    const searchParams = { query, page, sort };
    const s = state();
    const { token } = s.user.authData;
    const { list } = s.github.searchResult;

    dispatch(searchRepositoriesFetching(searchParams));

    return fetch(`${config.GITHUB_API_URL}search/repositories?q=${query}&sort=${sort}&page=${page}&per_page=15&access_token=${token}`)
        .then((res) => res.json())
        .then((data) => {
            dispatch(searchRepositoriesSuccess(data, page > 1));
            AsyncStorage.setItem('repositories', JSON.stringify({
                list:       [...list, ...data.items],
                totalCount: data.total_count
            }));
        })
        .catch((error) => dispatch(searchRepositoriesError(error)));
};

export const onRecoveryRepositories = (data) => (dispatch) => {
    dispatch(getCacheSearchData(data));
};
