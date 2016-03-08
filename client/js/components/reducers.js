import {combineReducers} from 'redux';

import INITIAL_STATE from 'js/INITIAL_STATE';
import {SET_CURRENT} from './actions';
import {SET_HASH} from 'js/common/actions';
import filterControl from './filterControl/reducers';

function current(state = INITIAL_STATE.components.current, action) {
    if (action.type === SET_CURRENT) {
        return action.payload;
    }
    else if (action.type === SET_HASH) {
        const match = action.payload.match(/#\/movie\/(\w+)/);

        return match && match[1];
    }

    return state;
}

const reducer = combineReducers({
    filterControl,
    current,
});

export default reducer;
