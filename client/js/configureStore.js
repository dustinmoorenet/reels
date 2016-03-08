import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {persistState} from 'redux-devtools';

import rootReducer from './reducers';

export default function configureStore({debug = false} = {}) {
    let finalCreateStore;

    if (debug) {
        finalCreateStore = compose(
            applyMiddleware(thunk),
            applyMiddleware(createLogger()),
            persistState(getDebugSessionKey())
        )(createStore);
    }
    else {
        finalCreateStore = compose(
            applyMiddleware(thunk)
        )(createStore);
    }

    return finalCreateStore(rootReducer, {});
}


function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
}
