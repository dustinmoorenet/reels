const BASE = 'common';
export const SET_MOVIES = `${BASE}/SET_MOVIES`;
export const SET_KEY_WORDS = `${BASE}/SET_KEY_WORDS`;
export const SET_TAGS = `${BASE}/SET_TAGS`;
export const SET_FILTERS = `${BASE}/SET_FILTERS`;
export const ADD_FILTER = `${BASE}/ADD_FILTER`;
export const REMOVE_FILTER = `${BASE}/REMOVE_FILTER`;
export const SET_HASH = `${BASE}/SET_HASH`;
export const SET_QUERY = `${BASE}/SET_QUERY`;

import {filtersSelector} from './filters/selectors';
import {
    queryStringSelector,
    paramsSelector,
} from './selectors';

export function setMovies(value) {
    return {
        type: SET_MOVIES,
        payload: value,
    };
}

export function setKeyWords(value) {
    return {
        type: SET_KEY_WORDS,
        payload: value,
    };
}

export function setTags(value) {
    return {
        type: SET_TAGS,
        payload: value,
    };
}


export function setFilters(value) {
    return (dispatch, getState) => {
        const state = getState();
        const params = paramsSelector(state);

        params.filters = value;

        dispatch(writeHash({params}));
    };
}

export function addFilter(filter) {
    return (dispatch, getState) => {
        const state = getState();
        const params = paramsSelector(state);

        params.filters = params.filters ? [...params.filters, filter.id] : [filter.id];

        dispatch(writeHash({params}));
    };
}

export function removeFilter(filter) {
    return (dispatch, getState) => {
        const state = getState();
        const params = paramsSelector(state);

        params.filters = params.filters ? params.filters.filter((f) => +f !== filter.id) : [];

        dispatch(writeHash({params}));
    };
}

export function toggleTag(tag) {
    return (dispatch, getState) => {
        const state = getState();
        const filters = filtersSelector(state);
        const existingFilter = filters.find((filter) => filter.id === tag.id);

        if (existingFilter) {
            dispatch(removeFilter(tag));
        }
        else {
            dispatch(addFilter(tag));
        }
    };
}

export function setHash(value) {
    return {
        type: SET_HASH,
        payload: value,
    };
}

export function setQuery(value) {
    return {
        type: SET_QUERY,
        payload: value,
    };
}

export function updateHash() {
    return (dispatch) => {
        const [hash, query] = location.hash.split('?');

        dispatch(setHash(hash));
        dispatch(setQuery(query || ''));
    };
}

export function writeHash({hash, params}) {
    return (dispatch, getState) => {
        const state = getState();
        const paramsString = params ? queryStringSelector(params) : state.common.query;
        const newHash = hash || state.common.hash || '#';

        if (paramsString) {
            location.hash = `${newHash}?${paramsString}`;
        }
        else {
            location.hash = newHash;
        }
    };
}
