import {createSelector} from 'reselect';

export const listURLSelector = createSelector(
    (state) => state.common.query,
    (query) => query ? `#?${query}` : '#'
);
