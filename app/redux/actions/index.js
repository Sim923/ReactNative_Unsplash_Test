import { toJson } from 'unsplash-js';

import * as types from '../constants/ActionTypes';
import { searchUsers } from '../../api/unsplash';

export const setSearchResult = (searchText, users) => ({
  type: types.SET_SEARCH_RESULT,
  searchText,
  users
});

export const setLoading = loading => ({
  type: types.SET_LOADING,
  loading
});

export const setSelectedUser = user => ({
  type: types.SET_SELECTED_USER,
  user
});

export const search = (searchText, page) => {
  return (dispatch, getState) => {
    dispatch(setLoading(true));
    const result = searchUsers(searchText, page);
    result.then(toJson).then(json => {
      const { users } = getState().search;
      const { results } = json;
      const data =
        page === 1 ? results : users ? users.concat(results) : results;

      dispatch(setSearchResult(searchText, data));
      dispatch(setLoading(false));
    });
  };
};
