import {combineReducers} from 'redux';

import INITIAL_STATE from 'js/INITIAL_STATE';
import {
    SET_FILTER_SEARCH,
} from './actions';

function searchText(state = INITIAL_STATE.components.filterControl.searchText, action = {}) {
    if (action.type === SET_FILTER_SEARCH) {
        return action.payload;
    }

    return state;
}

export default combineReducers({
    searchText,
});
