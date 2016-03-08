import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import Base from 'js/components/base';
import configureStore from 'js/configureStore';
import {
    updateHash,
    setTags,
    setMovies,
} from 'js/common/actions';

global.store = configureStore({debug: process.env.NODE_ENV === ''});

global.store.dispatch(setMovies(window.movies));
global.store.dispatch(setTags(window.tags));

render(
    <Provider store={global.store}>
        <Base />
    </Provider>,
    document.body.querySelector('.components-holder')
);

window.addEventListener('hashchange', () => {
    global.store.dispatch(updateHash());
});

global.store.dispatch(updateHash());
