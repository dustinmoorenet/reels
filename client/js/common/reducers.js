import {combineReducers} from 'redux';

import INITIAL_STATE from 'js/INITIAL_STATE';
import {
    SET_MOVIES,
    SET_KEY_WORDS,
    SET_TAGS,
    SET_FILTERS,
    ADD_FILTER,
    REMOVE_FILTER,
    SET_HASH,
    SET_QUERY,
} from './actions';

function movies(state = INITIAL_STATE.common.movies, action) {
    if (action.type === SET_MOVIES) {
        return action.payload;
    }

    return state;
}

function keyWords(state = INITIAL_STATE.common.keyWords, action) {
    if (action.type === SET_KEY_WORDS) {
        return action.payload;
    }

    return state;
}

function tags(state = INITIAL_STATE.common.tags, action) {
    if (action.type === SET_TAGS) {
        return action.payload;
    }

    return state;
}

function filters(state = INITIAL_STATE.common.filters, action) {
    if (action.type === ADD_FILTER) {
        return [
            ...state,
            {
                tag: action.payload.tag,
            },
        ];
    }
    else if (action.type === REMOVE_FILTER) {
        return state.filter((filter) => filter.tag.id !== action.payload.tag.id);
    }
    else if (action.type === SET_FILTERS) {
        return action.payload;
    }

    return state;
}

function hash(state = INITIAL_STATE.common.hash, action) {
    if (action.type === SET_HASH) {
        return action.payload;
    }

    return state;
}

function query(state = INITIAL_STATE.common.query, action) {
    if (action.type === SET_QUERY) {
        return action.payload;
    }

    return state;
}

const reducer = combineReducers({
    movies,
    keyWords,
    tags,
    filters,
    hash,
    query,
});

export default reducer;
